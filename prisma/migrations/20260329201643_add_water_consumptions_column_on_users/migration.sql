/*
  Warnings:

  - A unique constraint covering the columns `[user_id,date]` on the table `water_consumptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `water_consumptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "water_consumptions_user_id_key";

-- AlterTable
ALTER TABLE "water_consumptions" ADD COLUMN     "date" DATE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "water_consumptions_user_id_date_key" ON "water_consumptions"("user_id", "date");
