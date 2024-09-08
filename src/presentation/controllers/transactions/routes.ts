import { Router } from "express";
import { TransactionsController } from "./transactions";
import { UploadFileService } from "../../service/upload-file.service";
import { AnalysisService } from "../../service/analisis.service";
import { TransactionService } from "../../service/transaction.service";
import { EmailService } from "../../service/email.service";
import { SendMail } from "../../utils/sendmail";

export class TransactionsRoutes {
  static get Routes(): Router {
    const router = Router();

    const uploadFileService = new UploadFileService();
    const transactionsService = new TransactionService();
    const analisysService = new AnalysisService();
    const emailService = new EmailService();
    const sendMail = new SendMail(emailService);
    const transactions = new TransactionsController(
      uploadFileService,
      transactionsService,
      analisysService,
      sendMail
    );

    router.post("/", transactions.createTransaction);

    return router;
  }
}
