-- AlterTable
ALTER TABLE `product_chart_item` ADD COLUMN `service_order_chart_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Product_chart_item` ADD CONSTRAINT `Product_chart_item_service_order_chart_id_fkey` FOREIGN KEY (`service_order_chart_id`) REFERENCES `Service_order_chart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
