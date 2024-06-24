-- CreateEnum
CREATE TYPE "VerificationType" AS ENUM ('EMAIL', 'FORGOT_PASSWORD');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "verifications" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "type" "VerificationType" NOT NULL DEFAULT 'EMAIL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verifications_pkey" PRIMARY KEY ("id")
);
