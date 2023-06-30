-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: 2023-06-27 03:21:14
-- 服务器版本： 10.2.14-MariaDB
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `document`
--

-- --------------------------------------------------------

--
-- 表的结构 `folderpath`
--

DROP TABLE IF EXISTS `folderpath`;
CREATE TABLE IF NOT EXISTS `folderpath` (
  `ID` int(255) NOT NULL,
  `Content` varchar(255) COLLATE utf8_croatian_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

-- --------------------------------------------------------

--
-- 表的结构 `path`
--

DROP TABLE IF EXISTS `path`;
CREATE TABLE IF NOT EXISTS `path` (
  `ID` int(255) NOT NULL,
  `Content` varchar(255) COLLATE utf8_croatian_ci NOT NULL,
  `IID` int(255) NOT NULL,
  PRIMARY KEY (`ID`,`IID`),
  UNIQUE KEY `ID` (`ID`,`IID`),
  UNIQUE KEY `ID_2` (`ID`,`IID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
