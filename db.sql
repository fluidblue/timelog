-- Adminer 4.8.1 MySQL 5.5.5-10.7.1-MariaDB-1:10.7.1+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Settings`;
CREATE TABLE `Settings` (
  `weekStartsOn` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `Settings` (`weekStartsOn`) VALUES
('monday');

DROP TABLE IF EXISTS `TimeLog`;
CREATE TABLE `TimeLog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `from` time NOT NULL,
  `to` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `WorkingTimes`;
CREATE TABLE `WorkingTimes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `workingTime` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `WorkingTimes` (`id`, `name`, `workingTime`) VALUES
(0,	'sunday',	0),
(1,	'monday',	480),
(2,	'tuesday',	480),
(3,	'wednesday',	480),
(4,	'thursday',	480),
(5,	'friday',	480),
(6,	'saturday',	0);

-- 2022-03-08 17:44:01
