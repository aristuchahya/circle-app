-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "updatedBy" INTEGER;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
