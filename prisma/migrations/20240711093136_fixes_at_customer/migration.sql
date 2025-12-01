/*
  Warnings:

  - You are about to drop the column `user_name` on the `customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type_name]` on the table `Product_type` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_name` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `user_name`,
    ADD COLUMN `customer_name` VARCHAR(191) NOT NULL,
    MODIFY `customer_address` VARCHAR(191) NULL,
    MODIFY `customer_address_number` VARCHAR(191) NULL,
    MODIFY `customer_phone_number` VARCHAR(191) NULL,
    MODIFY `customer_cpf` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `search_number_index` ON `Product`(`company_id`, `search_number`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_type_type_name_key` ON `Product_type`(`type_name`);

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
