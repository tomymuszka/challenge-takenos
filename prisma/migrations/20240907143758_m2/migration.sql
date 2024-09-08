/*
  Warnings:

  - Made the column `transaction_id` on table `Transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `merchant` on table `Transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "transaction_id" SET NOT NULL,
ALTER COLUMN "merchant" SET NOT NULL;

-- CreateTable
CREATE TABLE "Analysis" (
    "id" SERIAL NOT NULL,
    "volumeTransactionsDay" INTEGER NOT NULL,
    "volumeTransactionsWeek" INTEGER NOT NULL,
    "volumeTransactionsMonth" INTEGER NOT NULL,
    "topTenMerchants" TEXT[],
    "detectedFraudulentIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);
