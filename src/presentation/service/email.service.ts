import nodemailer, { Transporter } from "nodemailer";
import { envs } from "../../config/envs";
import { emailOptions } from "../interfaces/email.interface";

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: envs.MAILER_SERVICE,
      auth: {
        user: envs.MAILER_USER,
        pass: envs.MAILER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  public sendEmail = async (options: emailOptions) => {
    const { from, to, subject, body } = options;
    try {
      const mailInfo = await this.transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: body,
      });
      console.log("Message sent: %s", mailInfo.messageId);
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  };
}
