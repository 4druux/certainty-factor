-- CreateTable
CREATE TABLE `JenisKb` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kriteria` (
    `id` VARCHAR(191) NOT NULL,
    `pertanyaan` TEXT NOT NULL,
    `tipe` VARCHAR(191) NOT NULL,
    `pilihan` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AturanCf` (
    `id` VARCHAR(191) NOT NULL,
    `kriteriaId` VARCHAR(191) NOT NULL,
    `jawaban` VARCHAR(191) NOT NULL,
    `kbId` VARCHAR(191) NOT NULL,
    `cfPakar` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `AturanCf_kriteriaId_idx`(`kriteriaId`),
    INDEX `AturanCf_kbId_idx`(`kbId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
