/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Diary` table. All the data in the column will be lost.
  - Added the required column `diary_date` to the `Diary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diary" DROP COLUMN "createdAt",
ADD COLUMN     "diary_date" TEXT NOT NULL;
