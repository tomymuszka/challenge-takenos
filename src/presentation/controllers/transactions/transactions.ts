import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { UploadFileService } from "../../service/upload-file.service";
import { TransactionService } from "../../service/transaction.service";
import { volumeTransactions } from "../../interfaces/transactions.interface";
import { AnalysisService } from "../../service/analisis.service";
import { SendMail } from "../../utils/sendmail";

export class TransactionsController {
  constructor(
    private readonly uploadFileService: UploadFileService,
    private readonly transactionService: TransactionService,
    private readonly analysisService: AnalysisService,
    private readonly sendMail: SendMail
  ) {}

  public createTransaction = async (req: Request, res: Response) => {
    if (!req.files || !req.files.file || Array.isArray(req.files.file)) {
      return res.status(400).json({
        error:
          "No file uploaded or multiple files under the same field name are not supported.",
      });
    }

    const file = req.files.file as UploadedFile;
    const fileExtension = file.mimetype.split("/").at(1) || "";

    if (fileExtension !== "csv") {
      return res.status(400).json({
        error: `The extension ${fileExtension} is not valid. Please upload a file in csv.`,
      });
    }

    try {
      const uploadedFileInfo = await this.uploadFileService.uploadSingleFile(
        file
      );

      const transaction_batch_id = await this.transactionService.processCSV(
        uploadedFileInfo.finalPath
      );
      const volumes: volumeTransactions =
        await this.transactionService.calculateVolumesForDayWeekMonthFromNow();
      const topTenMerchants = await this.analysisService.topMerchantsByVolume();
      const fraudulentTransactions =
        await this.analysisService.detectFraudulentTransactions(
          transaction_batch_id
        );

      const createdAnalysis = await this.analysisService.createAnalysis({
        volumeTransactionsDay: volumes.day,
        volumeTransactionsWeek: volumes.week,
        volumeTransactionsMonth: volumes.month,
        topTenMerchants,
        detectedFraudulentIds: fraudulentTransactions,
        batch_id: transaction_batch_id,
      });

      await this.sendMail.successfulTransaction(createdAnalysis!.id);
      res.status(200).json({
        message: `The transaction was uploaded successfully. See the analysis with the ID: ${createdAnalysis?.id}`,
      });
    } catch (error) {
      console.error("Error:", error);
      await this.sendMail.failedTransaction();
      res.status(500).json({ error: error.message });
    }
  };
}
