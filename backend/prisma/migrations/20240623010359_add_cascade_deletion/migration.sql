-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_threadId_fkey";

-- DropForeignKey
ALTER TABLE "replies" DROP CONSTRAINT "replies_threadId_fkey";

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
