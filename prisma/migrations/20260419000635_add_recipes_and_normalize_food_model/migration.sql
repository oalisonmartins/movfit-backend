/*
  Warnings:

  - The values [DEFINE] on the enum `Goal` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `name` on the `diet_foods` table. All the data in the column will be lost.
  - You are about to drop the column `calories_in_kcal` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `carbs_in_grams` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `fats_in_grams` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `is_recipe` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `portion_amount` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `portion_unit` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `proteins_in_grams` on the `foods` table. All the data in the column will be lost.
  - Changed the type of `unit` on the `diet_foods` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `normalized_base` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `recipe_items` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `unit` on the `recipe_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updated_at` to the `water_consumptions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PortionUnit" AS ENUM ('G', 'KG', 'ML', 'L', 'UNIT');

-- AlterEnum
BEGIN;
CREATE TYPE "Goal_new" AS ENUM ('GAIN_MASS', 'LOSE_WEIGHT', 'MAINTAIN_WEIGHT');
ALTER TABLE "profiles" ALTER COLUMN "goal" TYPE "Goal_new" USING ("goal"::text::"Goal_new");
ALTER TABLE "diets" ALTER COLUMN "goal" TYPE "Goal_new" USING ("goal"::text::"Goal_new");
ALTER TYPE "Goal" RENAME TO "Goal_old";
ALTER TYPE "Goal_new" RENAME TO "Goal";
DROP TYPE "public"."Goal_old";
COMMIT;

-- DropIndex
DROP INDEX "foods_user_id_is_recipe_idx";

-- AlterTable
ALTER TABLE "diet_foods" DROP COLUMN "name",
DROP COLUMN "unit",
ADD COLUMN     "unit" "PortionUnit" NOT NULL;

-- AlterTable
ALTER TABLE "foods" DROP COLUMN "calories_in_kcal",
DROP COLUMN "carbs_in_grams",
DROP COLUMN "fats_in_grams",
DROP COLUMN "is_recipe",
DROP COLUMN "portion_amount",
DROP COLUMN "portion_unit",
DROP COLUMN "proteins_in_grams",
ADD COLUMN     "normalized_base" "NormalizedBase" NOT NULL;

-- AlterTable
ALTER TABLE "recipe_items" ADD COLUMN     "recipe_id" TEXT NOT NULL,
DROP COLUMN "unit",
ADD COLUMN     "unit" "PortionUnit" NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "water_consumptions" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL;

-- CreateTable
CREATE TABLE "recipes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_items" ADD CONSTRAINT "recipe_items_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
