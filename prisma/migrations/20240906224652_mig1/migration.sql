-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "transaction_id" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "merchant" TEXT,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);
