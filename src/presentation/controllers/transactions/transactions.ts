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
    const file = req.files!.file as UploadedFile;

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
