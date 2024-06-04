/*
  Warnings:

  - Made the column `threadId` on table `likes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `likes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `threadId` on table `replies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `replies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdBy` on table `threads` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_threadId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "replies" DROP CONSTRAINT "replies_threadId_fkey";

-- DropForeignKey
ALTER TABLE "replies" DROP CONSTRAINT "replies_userId_fkey";

-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_createdBy_fkey";

-- AlterTable
ALTER TABLE "likes" ALTER COLUMN "threadId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "replies" ALTER COLUMN "threadId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "threads" ALTER COLUMN "createdBy" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
