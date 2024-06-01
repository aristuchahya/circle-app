-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_createdBy_fkey";

-- AlterTable
ALTER TABLE "threads" ALTER COLUMN "createdBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
