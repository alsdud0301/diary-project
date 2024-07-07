/*
  Warnings:

  - You are about to drop the `diary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "diary" DROP CONSTRAINT "diary_authorId_fkey";

-- DropTable
DROP TABLE "diary";

-- CreateTable
CREATE TABLE "Diary" (
    "id" SERIAL NOT NULL,
    "diary_title" TEXT NOT NULL,
    "diary_content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
