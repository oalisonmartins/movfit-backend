/*
  Warnings:

  - You are about to drop the `daily_water_consumptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `water_consumptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "daily_water_consumptions" DROP CONSTRAINT "daily_water_consumptions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "water_consumptions" DROP CONSTRAINT "water_consumptions_daily_water_consumption_id_fkey";

-- DropForeignKey
ALTER TABLE "water_consumptions" DROP CONSTRAINT "water_consumptions_user_id_fkey";

-- AlterTable
ALTER TABLE "nutrition_entries" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ;

-- DropTable
DROP TABLE "daily_water_consumptions";

-- DropTable
DROP TABLE "water_consumptions";

-- CreateTable
CREATE TABLE "hydration_logs" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "daily_goal_in_ml" INTEGER NOT NULL,
    "total_consumed_in_ml" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "hydration_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hydration_entries" (
    "id" TEXT NOT NULL,
    "amount_in_ml" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "user_id" TEXT NOT NULL,
    "hydration_log_id" TEXT NOT NULL,

    CONSTRAINT "hydration_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hydration_logs_user_id_date_key" ON "hydration_logs"("user_id", "date");

-- CreateIndex
CREATE INDEX "hydration_entries_hydration_log_id_idx" ON "hydration_entries"("hydration_log_id");

-- AddForeignKey
ALTER TABLE "hydration_logs" ADD CONSTRAINT "hydration_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hydration_entries" ADD CONSTRAINT "hydration_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hydration_entries" ADD CONSTRAINT "hydration_entries_hydration_log_id_fkey" FOREIGN KEY ("hydration_log_id") REFERENCES "hydration_logs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
