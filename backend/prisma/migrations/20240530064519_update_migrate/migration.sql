/*
  Warnings:

  - You are about to drop the column `follower_id` on the `following` table. All the data in the column will be lost.
  - You are about to drop the column `following_id` on the `following` table. All the data in the column will be lost.
  - You are about to drop the column `thread_id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `thread_id` on the `replies` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `replies` table. All the data in the column will be lost.
  - You are about to drop the column `number_of_replies` on the `threads` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `photo_profile` on the `users` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "following" DROP CONSTRAINT "following_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "following" DROP CONSTRAINT "following_following_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_thread_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "replies" DROP CONSTRAINT "replies_thread_id_fkey";

-- DropForeignKey
ALTER TABLE "replies" DROP CONSTRAINT "replies_user_id_fkey";

-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_number_of_replies_fkey";

-- AlterTable
ALTER TABLE "following" DROP COLUMN "follower_id",
DROP COLUMN "following_id",
ADD COLUMN     "followerId" INTEGER,
ADD COLUMN     "followingId" INTEGER;

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "thread_id",
DROP COLUMN "user_id",
ADD COLUMN     "threadId" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "replies" DROP COLUMN "thread_id",
DROP COLUMN "user_id",
ADD COLUMN     "threadId" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "threads" DROP COLUMN "number_of_replies",
ADD COLUMN     "numberOfReplies" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "full_name",
DROP COLUMN "photo_profile",
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "photoProfile" TEXT,
ADD COLUMN     "username" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_numberOfReplies_fkey" FOREIGN KEY ("numberOfReplies") REFERENCES "replies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "following" ADD CONSTRAINT "following_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "following" ADD CONSTRAINT "following_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
