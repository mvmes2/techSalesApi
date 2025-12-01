/*
  Warnings:

  - Added the required column `created_at` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sale` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;
