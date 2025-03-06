/*
  Warnings:

  - You are about to drop the `Follower` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `recipient` on the `Giveaway` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Giveaway" DROP COLUMN "recipient",
ADD COLUMN     "recipient" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Follower";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "walletId" TEXT NOT NULL DEFAULT '',
    "userShare" TEXT NOT NULL DEFAULT '',
    "authStatus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fid" TEXT NOT NULL DEFAULT '',
    "did" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");
