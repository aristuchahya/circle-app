/*
  Warnings:

  - A unique constraint covering the columns `[userId,threadId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "likes_userId_threadId_key" ON "likes"("userId", "threadId");
