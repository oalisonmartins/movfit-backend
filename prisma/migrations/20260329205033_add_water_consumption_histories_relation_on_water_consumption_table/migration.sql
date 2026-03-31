/*
  Warnings:

  - Added the required column `water_consumption_id` to the `water_consumption_histories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "water_consumption_histories" ADD COLUMN     "water_consumption_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "water_consumption_histories" ADD CONSTRAINT "water_consumption_histories_water_consumption_id_fkey" FOREIGN KEY ("water_consumption_id") REFERENCES "water_consumptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
