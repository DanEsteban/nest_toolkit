/*
  Warnings:

  - Added the required column `tokens` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `tokens` VARCHAR(250) NOT NULL;
