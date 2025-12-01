-- AlterTable
ALTER TABLE `session` ALTER COLUMN `created_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `last_recover_pass_token` VARCHAR(999) NULL;
