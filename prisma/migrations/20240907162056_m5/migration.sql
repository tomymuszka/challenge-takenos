/*
  Warnings:

  - Added the required column `batch_id` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "batch_id" TEXT NOT NULL;
