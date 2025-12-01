/*
  Warnings:

  - A unique constraint covering the columns `[company_id,serial_number]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX `code_bar_id_index` ON `Product`(`company_id`, `code_bar_id`);

-- CreateIndex
CREATE INDEX `product_name_index` ON `Product`(`company_id`, `product_name`);

-- CreateIndex
CREATE INDEX `serial_number_index` ON `Product`(`company_id`, `serial_number`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_company_id_serial_number_key` ON `Product`(`company_id`, `serial_number`);
