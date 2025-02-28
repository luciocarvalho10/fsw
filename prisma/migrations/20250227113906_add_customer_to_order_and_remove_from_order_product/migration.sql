/*
  Warnings:

  - You are about to drop the column `customerCpf` on the `OrderProduct` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `OrderProduct` table. All the data in the column will be lost.
  - Added the required column `customerCpf` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerCpf" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderProduct" DROP COLUMN "customerCpf",
DROP COLUMN "customerName";
