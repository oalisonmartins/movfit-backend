/*
  Warnings:

  - Added the required column `goal` to the `workout_configs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goal` to the `workout_plans` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkoutGoal" AS ENUM ('GAIN_MASS', 'DEFINITION');

-- AlterTable
ALTER TABLE "workout_configs" ADD COLUMN     "goal" "WorkoutGoal" NOT NULL;

-- AlterTable
ALTER TABLE "workout_plans" ADD COLUMN     "goal" "WorkoutGoal" NOT NULL;
