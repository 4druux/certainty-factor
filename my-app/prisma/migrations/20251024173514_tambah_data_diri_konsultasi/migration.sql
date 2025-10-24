/*
  Warnings:

  - Added the required column `alamat` to the `Konsultasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `Konsultasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `umur` to the `Konsultasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Konsultasi` ADD COLUMN `alamat` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama` VARCHAR(191) NOT NULL,
    ADD COLUMN `umur` INTEGER NOT NULL;
