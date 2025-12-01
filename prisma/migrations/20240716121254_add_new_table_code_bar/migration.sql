/*
  Warnings:

  - You are about to drop the column `bar_code_number` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `bar_code_number`,
    ADD COLUMN `code_bar_id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Code_bar` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,

    INDEX `company_id_index`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Code_bar` ADD CONSTRAINT `Code_bar_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_code_bar_id_fkey` FOREIGN KEY (`code_bar_id`) REFERENCES `Code_bar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
