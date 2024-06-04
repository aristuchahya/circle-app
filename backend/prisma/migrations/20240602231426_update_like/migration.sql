-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "numberOfLikes" INTEGER;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_numberOfLikes_fkey" FOREIGN KEY ("numberOfLikes") REFERENCES "likes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
