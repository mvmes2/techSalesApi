/*
  Warnings:

  - Added the required column `created_at` to the `Product_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `code_bar` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `discount` ADD COLUMN `updated_at` DATETIME(3) NULL,
    MODIFY `value` DOUBLE NULL DEFAULT 0.00,
    MODIFY `percent` DOUBLE NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `product` MODIFY `quantity` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `product_type` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;
