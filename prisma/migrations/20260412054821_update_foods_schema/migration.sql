/*
  Warnings:

  - You are about to alter the column `name` on the `foods` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `category` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "foods" ADD COLUMN     "category" VARCHAR(100) NOT NULL,
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE INDEX "foods_name_idx" ON "foods"("name");

-- CreateIndex
CREATE INDEX "foods_category_idx" ON "foods"("category");
