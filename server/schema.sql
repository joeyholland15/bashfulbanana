
DROP DATABASE IF EXISTS bananas;
CREATE DATABASE bananas;

USE bananas;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS `Users`;
    
CREATE TABLE `Users` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `password` VARCHAR(40) NOT NULL,
  `houseId` INT NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'House'
-- 
-- ---

DROP TABLE IF EXISTS `House`;
    
CREATE TABLE `House` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Chores'
-- 
-- ---

DROP TABLE IF EXISTS `Chores`;
    
CREATE TABLE `Chores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT,
  `name` VARCHAR(20) NOT NULL,
  `category` VARCHAR(20) NOT NULL,
  `completed` TINYINT NOT NULL DEFAULT 0,
  `dueDate` DATE NULL,
  `houseId` INT NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Messages'
-- 
-- ---

DROP TABLE IF EXISTS `Messages`;
    
CREATE TABLE `Messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `text` MEDIUMTEXT NOT NULL,
  `houseId` INT NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Bill'
-- 
-- ---

DROP TABLE IF EXISTS `Bill`;
    
CREATE TABLE `Bill` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `total` INT NOT NULL,
  `name` VARCHAR(30) NULL,
  `dueDate` DATE NOT NULL,
  `datePaid` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Payment'
-- 
-- ---

DROP TABLE IF EXISTS `Payment`;
    
CREATE TABLE `Payment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `billId` INT NOT NULL,
  `userId` INT NOT NULL,
  `amount` INT NOT NULL,
  `paid` TINYINT NOT NULL,
  `datePaid` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Users` ADD FOREIGN KEY (houseId) REFERENCES `House` (`id`);
ALTER TABLE `Chores` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);
ALTER TABLE `Messages` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);
ALTER TABLE `Messages` ADD FOREIGN KEY (houseId) REFERENCES `House` (`id`);
ALTER TABLE `Bill` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);
ALTER TABLE `Payment` ADD FOREIGN KEY (billId) REFERENCES `Bill` (`id`);
ALTER TABLE `Payment` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `House` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Chores` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Bill` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Payment` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

INSERT INTO `House` (`id`,`name`) VALUES
(1,'fun house');

INSERT INTO `House` (`id`,`name`) VALUES
(2,'less fun house');

-- INSERT INTO `Users` (`id`,`name`,`password`,`houseId`) VALUES
-- ('','','','');
INSERT INTO `Users` (`id`,`name`,`password`,`houseId`) VALUES
(1, 'Joey','higuys', 1);

INSERT INTO `Users` (`id`,`name`,`password`,`houseId`) VALUES
(2, 'Nick','nice', 1);

INSERT INTO `Users` (`id`,`name`,`password`,`houseId`) VALUES
(3, 'Lyly','password', 2);
-- INSERT INTO `House` (`id`,`name`) VALUES
-- ('','');


-- INSERT INTO `Chores` (`id`,`userId`,`name`,`category`,`completed`,`dueDate`,`houseId`) VALUES
-- ('','','','','','','');

INSERT INTO `Chores` (`userId`,`name`,`category`,`completed`,`dueDate`,`houseId`) VALUES
(1,'feed dog','pets',0,'2016-01-29', 1);

-- INSERT INTO `Messages` (`id`,`userId`,`text`,`houseId`) VALUES
-- ('','','','');

INSERT INTO `Messages` (`id`,`userId`,`text`,`houseId`) VALUES
(1, 1,'helllo',1);

INSERT INTO `Messages` (`id`,`userId`,`text`,`houseId`) VALUES
(2, 3,'hey guys',2);


-- INSERT INTO `Bill` (`id`,`userId`,`total`,`name`,`dueDate`,`datePaid`) VALUES
-- ('','','','','','');
INSERT INTO `Bill` (`id`,`userId`,`total`,`name`,`dueDate`,`datePaid`) VALUES
(1,1,200,'water bill','2016-01-29', null);
-- INSERT INTO `Payment` (`id`,`billId`,`userId`,`amount`,`paid`,`datePaid`) VALUES
-- ('','','','','','');

INSERT INTO `Payment` (`id`,`billId`,`userId`,`amount`,`paid`,`datePaid`) VALUES
(1,1,2,200,0,null);

INSERT INTO `Payment` (`id`,`billId`,`userId`,`amount`,`paid`,`datePaid`) VALUES
(2,1,2,400,1,null);


