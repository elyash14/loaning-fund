-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191),
    `avatarPicture` VARCHAR(191),
    `creditCard` VARCHAR(191),
    `color` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastLogin` DATETIME(3),
    `referalId` VARCHAR(191),
UNIQUE INDEX `User.username_unique`(`username`),
UNIQUE INDEX `User.phone_unique`(`phone`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD FOREIGN KEY (`referalId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
