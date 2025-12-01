-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_discount_id_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_product_type_id_fkey`;

-- AlterTable
ALTER TABLE `product` MODIFY `product_type_id` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(255) NULL,
    MODIFY `discount_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_product_type_id_fkey` FOREIGN KEY (`product_type_id`) REFERENCES `Product_type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_discount_id_fkey` FOREIGN KEY (`discount_id`) REFERENCES `Discount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
