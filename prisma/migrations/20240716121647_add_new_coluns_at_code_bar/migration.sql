/*
  Warnings:

  - Added the required column `code_bar_number` to the `Code_bar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `code_bar` ADD COLUMN `code_bar_number` BIGINT NOT NULL;
