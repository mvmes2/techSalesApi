-- AlterTable
ALTER TABLE `product` ADD COLUMN `product_brand` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `session` ALTER COLUMN `created_at` DROP DEFAULT;
