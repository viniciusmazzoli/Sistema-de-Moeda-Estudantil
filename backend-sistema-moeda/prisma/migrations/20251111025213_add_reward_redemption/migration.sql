-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'RESGATE_VANTAGEM';

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "couponCode" TEXT;
