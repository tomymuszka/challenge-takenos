import { EmailService } from "../service/email.service";

export class SendMail {
  constructor(private readonly emailService: EmailService) {}

  public successfulTransaction = async (analysisId: number) => {
    const emailOptions = {
      from: "tomymuszka@gmail.com",
      to: "applash.solutions@gmail.com",
      subject: "Transaction Successfully Analyzed",
      body: `The transaction was analyzed correctly. You can see the result with the ID ${analysisId}.`,
    };

    await this.emailService.sendEmail(emailOptions);
  };

  public failedTransaction = async () => {
    const emailOptions = {
      from: "tomymuszka@gmail.com",
      to: "applash.solutions@gmail.com",
      subject: "Error with the Transaction",
      body: "There was an error with the transaction. Please try again.",
    };

    await this.emailService.sendEmail(emailOptions);
  };
}
