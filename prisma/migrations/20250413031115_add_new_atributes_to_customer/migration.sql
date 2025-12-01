/*
  Warnings:

  - You are about to drop the column `customer_address` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `customer_address_number` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `customer_address`,
    DROP COLUMN `customer_address_number`,
    ADD COLUMN `customer_address` VARCHAR(191) NULL,
    ADD COLUMN `customer_address_number` VARCHAR(191) NULL,
    ADD COLUMN `customer_city` VARCHAR(191) NULL,
    ADD COLUMN `customer_state` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `session` ALTER COLUMN `created_at` DROP DEFAULT;
