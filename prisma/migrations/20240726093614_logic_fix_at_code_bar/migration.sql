/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `Code_bar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_id,code_bar_number]` on the table `Code_bar` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_code_bar_id_fkey`;

-- AlterTable
ALTER TABLE `code_bar` ADD COLUMN `product_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Code_bar_product_id_key` ON `Code_bar`(`product_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Code_bar_company_id_code_bar_number_key` ON `Code_bar`(`company_id`, `code_bar_number`);

-- AddForeignKey
ALTER TABLE `Code_bar` ADD CONSTRAINT `Code_bar_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
