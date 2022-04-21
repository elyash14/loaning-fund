-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_ibfk_1`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_referalId_fkey` FOREIGN KEY (`referalId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `User` RENAME INDEX `User.phone_unique` TO `User_phone_key`;

-- RenameIndex
ALTER TABLE `User` RENAME INDEX `User.username_unique` TO `User_username_key`;
