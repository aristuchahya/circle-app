/*
  Warnings:

  - You are about to drop the column `updatedBy` on the `threads` table. All the data in the column will be lost.
  - Made the column `followerId` on table `following` required. This step will fail if there are existing NULL values in that column.
  - Made the column `followingId` on table `following` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdBy` on table `threads` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "following" DROP CONSTRAINT "following_followerId_fkey";

-- DropForeignKey
ALTER TABLE "following" DROP CONSTRAINT "following_followingId_fkey";

-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_updatedBy_fkey";

-- AlterTable
ALTER TABLE "following" ALTER COLUMN "followerId" SET NOT NULL,
ALTER COLUMN "followingId" SET NOT NULL;

-- AlterTable
ALTER TABLE "threads" DROP COLUMN "updatedBy",
ALTER COLUMN "createdBy" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "following" ADD CONSTRAINT "following_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "following" ADD CONSTRAINT "following_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
