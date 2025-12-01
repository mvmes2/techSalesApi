/*
  Warnings:

  - A unique constraint covering the columns `[company_id,product_id]` on the table `Code_bar` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Product_code_bar_id_fkey` ON `product`;

-- CreateIndex
CREATE INDEX `code_bar_number_index` ON `Code_bar`(`code_bar_number`);

-- CreateIndex
CREATE UNIQUE INDEX `Code_bar_company_id_product_id_key` ON `Code_bar`(`company_id`, `product_id`);
