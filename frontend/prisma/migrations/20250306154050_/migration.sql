-- CreateTable
CREATE TABLE "Giveaway" (
    "id" SERIAL NOT NULL,
    "recipient" TEXT NOT NULL,

    CONSTRAINT "Giveaway_pkey" PRIMARY KEY ("id")
);
