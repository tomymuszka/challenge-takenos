import { prisma } from "../../data/postgres/index";
import { AnalysisData } from "../interfaces/analysis.interface";

export class AnalysisService {
  public topMerchantsByVolume = async () => {
    try {
      const cantOfMerchants = 10;
      const topTenMerchants = await prisma.transactions.groupBy({
        by: ["merchant"],
        _sum: {
          amount: true,
        },
        orderBy: {
          _sum: {
            amount: "desc",
          },
        },
        take: cantOfMerchants,
      });

      const merchantNames = topTenMerchants.map(
        (merchant) => merchant.merchant
      );
      return merchantNames;
    } catch (error) {
      console.error("Error retrieving top merchants:", error);
      throw new Error("Failed to retrieve top merchants.");
    }
  };

  public detectFraudulentTransactions = async (batch_id: string) => {
    const timeBetweenTwoTransactionsOfTheSameUser = 15;
    const allTransactions = await prisma.transactions.findMany({
      where: { batch_id },
      orderBy: [{ user_id: "asc" }, { date: "asc" }],
    });

    const suspiciousTransactions = new Set<string>();

    allTransactions.forEach((transaction, index) => {
      if (
        index > 0 &&
        allTransactions[index - 1].user_id === transaction.user_id
      ) {
        const previousTransaction = allTransactions[index - 1];
        const timeDifference =
          (transaction.date.getTime() - previousTransaction.date.getTime()) /
          60000;
        if (timeDifference < timeBetweenTwoTransactionsOfTheSameUser) {
          suspiciousTransactions.add(transaction.transaction_id);
        }
      }
    });

    const highValueTransactions = new Set<string>();
    const amounOfSuspiciousTransaction = 2000;
    const highValue = await prisma.transactions.findMany({
      where: {
        amount: {
          gt: amounOfSuspiciousTransaction,
        },
      },
      select: { transaction_id: true },
    });

    highValue.forEach((transaction) => {
      highValueTransactions.add(transaction.transaction_id);
    });

    const allFraudulentTransactions = new Set([
      ...Array.from(suspiciousTransactions),
      ...Array.from(highValueTransactions),
    ]);

    return Array.from(allFraudulentTransactions);
  };

  public createAnalysis = async (analysisData: AnalysisData) => {
    try {
      const createdAnalysis = await prisma.analysis.create({
        data: analysisData,
        select: { id: true },
      });
      return createdAnalysis;
    } catch (error) {
      console.error("Error creating analysis:", error);
      throw new Error("Failed to create analysis.");
    }
  };

  public getAnalysis = async (id: number) => {
    try {
      return await prisma.analysis.findFirst({ where: { id } });
    } catch (error) {
      console.error("Error retrieving analysis:", error);
      throw new Error("Failed to retrieve analysis.");
    }
  };
}
