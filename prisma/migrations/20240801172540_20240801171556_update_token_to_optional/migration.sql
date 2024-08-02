/*
  Warnings:

  - You are about to alter the column `tokens` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `tokens` VARCHAR(191) NULL;
