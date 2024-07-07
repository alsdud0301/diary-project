-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_authorId_fkey";

-- AlterTable
ALTER TABLE "Diary" ALTER COLUMN "authorId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
