/*
  Warnings:

  - You are about to drop the column `diet_meal_id` on the `diet_foods` table. All the data in the column will be lost.
  - Added the required column `meal_id` to the `diet_foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "diet_foods" DROP CONSTRAINT "diet_foods_diet_meal_id_fkey";

-- AlterTable
ALTER TABLE "diet_foods" DROP COLUMN "diet_meal_id",
ADD COLUMN     "meal_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "foods" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "diet_foods" ADD CONSTRAINT "diet_foods_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "diet_meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "foods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
