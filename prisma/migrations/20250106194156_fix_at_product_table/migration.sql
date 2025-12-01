-- AlterTable
ALTER TABLE `product` MODIFY `bought_value` DOUBLE NULL;

-- AlterTable
ALTER TABLE `session` ALTER COLUMN `created_at` DROP DEFAULT;
