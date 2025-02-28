/*
  Warnings:

  - Added the required column `customerCpf` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "customerCpf" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL;
