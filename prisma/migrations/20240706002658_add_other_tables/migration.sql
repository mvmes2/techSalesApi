-- AlterTable
ALTER TABLE `session` MODIFY `token` VARCHAR(999) NOT NULL,
    ALTER COLUMN `created_at` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `customer_email` VARCHAR(191) NOT NULL,
    `customer_address` VARCHAR(191) NOT NULL,
    `customer_address_number` VARCHAR(191) NOT NULL,
    `customer_phone_number` VARCHAR(191) NOT NULL,
    `customer_cpf` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `company_id_index`(`company_id`),
    INDEX `customer_email_index`(`company_id`, `customer_email`),
    INDEX `customer_cpf_index`(`company_id`, `customer_cpf`),
    UNIQUE INDEX `Customer_company_id_customer_email_key`(`company_id`, `customer_email`),
    UNIQUE INDEX `Customer_company_id_customer_cpf_key`(`company_id`, `customer_cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Discount` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `discount_type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(150) NOT NULL,
    `value` DOUBLE NOT NULL DEFAULT 0.00,
    `percent` DOUBLE NOT NULL DEFAULT 0.00,
    `created_by` VARCHAR(191) NOT NULL,
    `start_at` DATETIME(3) NOT NULL,
    `end_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `company_id_index`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_type` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `type_name` VARCHAR(150) NOT NULL,

    INDEX `company_id_index`(`company_id`),
    UNIQUE INDEX `Product_type_company_id_type_name_key`(`company_id`, `type_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `search_number` BIGINT NULL,
    `serial_number` BIGINT NULL,
    `product_type_id` VARCHAR(191) NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `bought_value` DOUBLE NOT NULL,
    `sell_value` DOUBLE NOT NULL,
    `discount_id` VARCHAR(191) NOT NULL,
    `product_img` VARCHAR(255) NULL,
    `validity` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `company_id_index`(`company_id`),
    INDEX `company_product_type_id_index`(`company_id`, `product_type_id`),
    INDEX `company_discount_id_index`(`company_id`, `discount_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service_order_item` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `service_name` VARCHAR(150) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `value` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `company_id_index`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service_order_chart_item` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `service_order_chart_id` VARCHAR(191) NOT NULL,
    `service_order_item_id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,

    INDEX `company_id_index`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service_order_chart` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `service_name` VARCHAR(150) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `value` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `company_id_index`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_chart_item` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `product_chart_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,

    INDEX `company_id_index`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_chart` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `company_id_index`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sale` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `paid_value` DOUBLE NOT NULL DEFAULT 0.00,
    `full_paid` BOOLEAN NOT NULL DEFAULT false,
    `discount_id` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `product_chart_id` VARCHAR(191) NOT NULL,
    `service_order_chart_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Sale_product_chart_id_key`(`product_chart_id`),
    UNIQUE INDEX `Sale_service_order_chart_id_key`(`service_order_chart_id`),
    INDEX `company_id_index`(`company_id`),
    INDEX `customer_id_index`(`customer_id`),
    INDEX `user_id_index`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `card_brand` VARCHAR(25) NULL,
    `bank_name` VARCHAR(25) NULL,
    `description` VARCHAR(225) NULL,
    `value` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `sale_id` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NOT NULL,

    INDEX `company_id_index`(`company_id`),
    INDEX `sale_id_index`(`sale_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_type` ADD CONSTRAINT `Product_type_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_product_type_id_fkey` FOREIGN KEY (`product_type_id`) REFERENCES `Product_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_discount_id_fkey` FOREIGN KEY (`discount_id`) REFERENCES `Discount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service_order_item` ADD CONSTRAINT `Service_order_item_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service_order_chart_item` ADD CONSTRAINT `Service_order_chart_item_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service_order_chart_item` ADD CONSTRAINT `Service_order_chart_item_service_order_chart_id_fkey` FOREIGN KEY (`service_order_chart_id`) REFERENCES `Service_order_chart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service_order_chart_item` ADD CONSTRAINT `Service_order_chart_item_service_order_item_id_fkey` FOREIGN KEY (`service_order_item_id`) REFERENCES `Service_order_item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service_order_chart` ADD CONSTRAINT `Service_order_chart_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_chart_item` ADD CONSTRAINT `Product_chart_item_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_chart_item` ADD CONSTRAINT `Product_chart_item_product_chart_id_fkey` FOREIGN KEY (`product_chart_id`) REFERENCES `Product_chart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_chart_item` ADD CONSTRAINT `Product_chart_item_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_chart` ADD CONSTRAINT `Product_chart_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_discount_id_fkey` FOREIGN KEY (`discount_id`) REFERENCES `Discount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_product_chart_id_fkey` FOREIGN KEY (`product_chart_id`) REFERENCES `Product_chart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_service_order_chart_id_fkey` FOREIGN KEY (`service_order_chart_id`) REFERENCES `Service_order_chart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_sale_id_fkey` FOREIGN KEY (`sale_id`) REFERENCES `Sale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
