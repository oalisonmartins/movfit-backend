/*
  Warnings:

  - The values [RECOMPOSITION] on the enum `DietGoal` will be removed. If these variants are still used in the database, this will fail.
  - The values [GAIN_MASS,DEFINITION] on the enum `WorkoutGoal` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `schedule_time_in_seconds` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `height_in_centimeters` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `is_onboarding_completed` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `workout_configs` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[workout_plan_id,week_day]` on the table `workout_days` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scheduled_time_in_seconds` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fitness_level` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height_in_cm` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `workout_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmphasizedMuscle" AS ENUM ('CHEST', 'BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'FOREARMS', 'CORE', 'GLUTES', 'QUADRICEPS', 'HAMSTRINGS', 'CALVES', 'LOWER_BACK');

-- CreateEnum
CREATE TYPE "FitnessLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "DietGenerationType" AS ENUM ('MANUAL', 'AUTO');

-- DropForeignKey
ALTER TABLE "workout_configs" DROP CONSTRAINT "workout_configs_user_id_fkey";

-- DropIndex
DROP INDEX "foods_user_id_name_key";

-- AlterTable
ALTER TABLE "meals" DROP COLUMN "schedule_time_in_seconds",
ADD COLUMN     "scheduled_time_in_seconds" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "goal",
DROP COLUMN "height_in_centimeters",
ADD COLUMN     "fitness_level" "FitnessLevel" NOT NULL,
ADD COLUMN     "height_in_cm" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_onboarding_completed",
ADD COLUMN     "has_completed_onboarding" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "workout_days" ALTER COLUMN "estimated_duration_in_seconds" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "workout_exercises" ALTER COLUMN "rest_time_in_seconds" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "workout_sessions" ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "workout_configs";

-- DropEnum
DROP TYPE "FocusMuscle";

-- DropEnum
DROP TYPE "Goal";

-- CreateTable
CREATE TABLE "diet_preferences" (
    "id" TEXT NOT NULL,
    "goal" "DietGoal" NOT NULL,
    "generation_type" "DietGenerationType" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "diet_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_preferences" (
    "id" TEXT NOT NULL,
    "goal" "WorkoutGoal" NOT NULL,
    "available_days_per_week" INTEGER NOT NULL,
    "available_time_per_day_in_seconds" INTEGER NOT NULL,
    "emphasized_muscles" "EmphasizedMuscle"[],
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "workout_preferences_pkey" PRIMARY KEY ("id")
);


-- AlterEnum
BEGIN;
CREATE TYPE "DietGoal_new" AS ENUM ('BULKING', 'CUTTING', 'WEIGHT_LOSS', 'MAINTENANCE');
ALTER TABLE "diet_preferences" ALTER COLUMN "goal" TYPE "DietGoal_new" USING ("goal"::text::"DietGoal_new");
ALTER TABLE "diets" ALTER COLUMN "goal" TYPE "DietGoal_new" USING ("goal"::text::"DietGoal_new");
ALTER TYPE "DietGoal" RENAME TO "DietGoal_old";
ALTER TYPE "DietGoal_new" RENAME TO "DietGoal";
DROP TYPE "public"."DietGoal_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WorkoutGoal_new" AS ENUM ('HYPERTROPHY', 'CUTTING', 'FAT_LOSS');
ALTER TABLE "workout_preferences" ALTER COLUMN "goal" TYPE "WorkoutGoal_new" USING ("goal"::text::"WorkoutGoal_new");
ALTER TABLE "workout_plans" ALTER COLUMN "goal" TYPE "WorkoutGoal_new" USING ("goal"::text::"WorkoutGoal_new");
ALTER TYPE "WorkoutGoal" RENAME TO "WorkoutGoal_old";
ALTER TYPE "WorkoutGoal_new" RENAME TO "WorkoutGoal";
DROP TYPE "public"."WorkoutGoal_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "diet_preferences_user_id_key" ON "diet_preferences"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "workout_preferences_user_id_key" ON "workout_preferences"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "workout_days_workout_plan_id_week_day_key" ON "workout_days"("workout_plan_id", "week_day");

-- CreateIndex
CREATE INDEX "workout_plans_user_id_is_active_idx" ON "workout_plans"("user_id", "is_active");

-- AddForeignKey
ALTER TABLE "diet_preferences" ADD CONSTRAINT "diet_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_preferences" ADD CONSTRAINT "workout_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
