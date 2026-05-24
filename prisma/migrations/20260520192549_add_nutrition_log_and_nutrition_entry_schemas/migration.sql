/*
  Warnings:

  - You are about to drop the column `total_calories_in_kcal` on the `diets` table. All the data in the column will be lost.
  - You are about to drop the column `total_carbs_in_grams` on the `diets` table. All the data in the column will be lost.
  - You are about to drop the column `total_fats_in_grams` on the `diets` table. All the data in the column will be lost.
  - You are about to drop the column `total_proteins_in_grams` on the `diets` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `is_custom` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `normalized_base` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `normalized_calories_in_kcal` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `normalized_carbs_in_grams` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `normalized_fats_in_grams` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `normalized_proteins_in_grams` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `target_weight_in_grams` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `weight_in_grams` on the `profiles` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `daily_nutritions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `diet_foods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `diet_meals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recipe_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recipes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `weight_histories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,name]` on the table `foods` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `total_calorie_in_kcal` to the `diets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_carb_in_grams` to the `diets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_fat_in_grams` to the `diets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_protein_in_grams` to the `diets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calorie_per_100g_in_kcal` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carb_per_100g_in_grams` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat_per_100g_in_grams` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein_per_100g_in_grams` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_weight_in_kg` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight_in_kg` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FoodSource" AS ENUM ('TACO', 'USDA', 'CUSTOM');

-- DropForeignKey
ALTER TABLE "daily_nutritions" DROP CONSTRAINT "daily_nutritions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "diet_foods" DROP CONSTRAINT "diet_foods_food_id_fkey";

-- DropForeignKey
ALTER TABLE "diet_foods" DROP CONSTRAINT "diet_foods_meal_id_fkey";

-- DropForeignKey
ALTER TABLE "diet_meals" DROP CONSTRAINT "diet_meals_diet_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_items" DROP CONSTRAINT "recipe_items_food_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_items" DROP CONSTRAINT "recipe_items_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "weight_histories" DROP CONSTRAINT "weight_histories_user_id_fkey";

-- DropIndex
DROP INDEX "foods_user_id_category_idx";

-- DropIndex
DROP INDEX "foods_user_id_is_custom_idx";

-- AlterTable
ALTER TABLE "diets" DROP COLUMN "total_calories_in_kcal",
DROP COLUMN "total_carbs_in_grams",
DROP COLUMN "total_fats_in_grams",
DROP COLUMN "total_proteins_in_grams",
ADD COLUMN     "total_calorie_in_kcal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_carb_in_grams" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_fat_in_grams" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_protein_in_grams" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "foods" DROP COLUMN "category",
DROP COLUMN "is_custom",
DROP COLUMN "normalized_base",
DROP COLUMN "normalized_calories_in_kcal",
DROP COLUMN "normalized_carbs_in_grams",
DROP COLUMN "normalized_fats_in_grams",
DROP COLUMN "normalized_proteins_in_grams",
ADD COLUMN     "calorie_per_100g_in_kcal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "carb_per_100g_in_grams" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cover_image_url" TEXT,
ADD COLUMN     "fat_per_100g_in_grams" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "is_recipe" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "protein_per_100g_in_grams" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "source" "FoodSource" NOT NULL DEFAULT 'CUSTOM',
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "target_weight_in_grams",
DROP COLUMN "weight_in_grams",
ADD COLUMN     "target_weight_in_kg" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "weight_in_kg" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "daily_nutritions";

-- DropTable
DROP TABLE "diet_foods";

-- DropTable
DROP TABLE "diet_meals";

-- DropTable
DROP TABLE "recipe_items";

-- DropTable
DROP TABLE "recipes";

-- DropTable
DROP TABLE "weight_histories";

-- DropEnum
DROP TYPE "NormalizedBase";

-- DropEnum
DROP TYPE "PortionUnit";

-- CreateTable
CREATE TABLE "nutrition_logs" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "calorie_in_kcal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "protein_in_grams" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "carb_in_grams" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fat_in_grams" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "nutrition_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_entries" (
    "id" TEXT NOT NULL,
    "amount_in_grams" DOUBLE PRECISION NOT NULL,
    "date" DATE NOT NULL,
    "user_id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,
    "diet_id" TEXT NOT NULL,
    "meal_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nutrition_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "schedule_time_in_seconds" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" TEXT NOT NULL,
    "diet_id" TEXT NOT NULL,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meals_foods" (
    "id" TEXT NOT NULL,
    "amount_in_grams" DOUBLE PRECISION NOT NULL,
    "meal_id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,

    CONSTRAINT "meals_foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weight_logs" (
    "id" TEXT NOT NULL,
    "weight_in_kg" DOUBLE PRECISION NOT NULL,
    "date" DATE NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "weight_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "nutrition_logs_user_id_date_idx" ON "nutrition_logs"("user_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_logs_user_id_date_key" ON "nutrition_logs"("user_id", "date");

-- CreateIndex
CREATE INDEX "nutrition_entries_user_id_diet_id_idx" ON "nutrition_entries"("user_id", "diet_id");

-- CreateIndex
CREATE INDEX "nutrition_entries_meal_id_food_id_idx" ON "nutrition_entries"("meal_id", "food_id");

-- CreateIndex
CREATE INDEX "meals_user_id_diet_id_idx" ON "meals"("user_id", "diet_id");

-- CreateIndex
CREATE UNIQUE INDEX "meals_diet_id_name_key" ON "meals"("diet_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "meals_foods_meal_id_food_id_key" ON "meals_foods"("meal_id", "food_id");

-- CreateIndex
CREATE INDEX "weight_logs_user_id_date_idx" ON "weight_logs"("user_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "weight_logs_user_id_date_key" ON "weight_logs"("user_id", "date");

-- CreateIndex
CREATE INDEX "diets_user_id_is_active_idx" ON "diets"("user_id", "is_active");

-- CreateIndex
CREATE UNIQUE INDEX "foods_user_id_name_key" ON "foods"("user_id", "name");

-- AddForeignKey
ALTER TABLE "nutrition_logs" ADD CONSTRAINT "nutrition_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_entries" ADD CONSTRAINT "nutrition_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_entries" ADD CONSTRAINT "nutrition_entries_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_entries" ADD CONSTRAINT "nutrition_entries_diet_id_fkey" FOREIGN KEY ("diet_id") REFERENCES "diets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_entries" ADD CONSTRAINT "nutrition_entries_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_diet_id_fkey" FOREIGN KEY ("diet_id") REFERENCES "diets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals_foods" ADD CONSTRAINT "meals_foods_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals_foods" ADD CONSTRAINT "meals_foods_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weight_logs" ADD CONSTRAINT "weight_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
