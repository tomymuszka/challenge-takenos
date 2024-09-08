import { createReadStream } from "fs";
import csvParser from "csv-parser";
import { prisma } from "../../data/postgresql";
import { deleteFile } from "../utils/deletefile";
import { TransactionData } from "../interfaces/transactions.interface";
import { uuid } from "../../config/uuid";

export class TransactionService {
  async processCSV(filePath: string): Promise<string> {
    try {
      const batch_id = uuid();
      const csvStream = createReadStream(filePath).pipe(csvParser());

      for await (const data of csvStream) {
        await this.createTransaction({
          transaction_id: data.transaction_id,
          date: new Date(data.date),
          user_id: data.user_id,
          merchant: data.merchant,
          amount: parseFloat(data.amount),
          batch_id,
        });
      }

      await deleteFile(filePath);
      return batch_id;
    } catch (error) {
      console.error("Error processing CSV file:", error);
      throw error;
    }
  }

  createTransaction = async (transactionData: TransactionData) => {
    try {
      await prisma.transactions.create({
        data: transactionData,
      });
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  };

  private calculateTransactionVolumes = async (date: Date) => {
    return await prisma.transactions.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        date: {
          gte: date,
          lte: new Date(),
        },
      },
    });
  };

  calculateVolumesForDayWeekMonthFromNow = async () => {
    const today = new Date();
    const [day, week, month] = await Promise.all([
      this.calculateTransactionVolumes(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
      ),
      this.calculateTransactionVolumes(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
      ),
      this.calculateTransactionVolumes(
        new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
      ),
    ]);

    return {
      day: day._sum.amount || 0,
      week: week._sum.amount || 0,
      month: month._sum.amount || 0,
    };
  };
}
