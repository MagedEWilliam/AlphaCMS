-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2016 at 10:42 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cms`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(250) CHARACTER SET utf8 NOT NULL,
  `NameAr` varchar(250) CHARACTER SET utf8 NOT NULL,
  `NameCh` varchar(250) CHARACTER SET utf8 NOT NULL,
  `image` text NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ID`, `Name`, `NameAr`, `NameCh`, `image`) VALUES
(1, 'Electrical Boxes & Brackets', 'صناديق كهربائية وأقواس', '电气盒和支架', 'http://www.mrelectricdecatur.com/pictures/el_icon_4.jpg'),
(2, 'Conduit', 'أنبوب', '导管', 'http://www.ionnic.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/c/action_conduit.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `catproperty`
--

CREATE TABLE IF NOT EXISTS `catproperty` (
  `categoryID` int(11) NOT NULL,
  `propertyID` int(11) NOT NULL,
  `valueID` int(11) NOT NULL,
  `filterbyme` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `catproperty`
--

INSERT INTO `catproperty` (`categoryID`, `propertyID`, `valueID`, `filterbyme`) VALUES
(1, 2, 2, 0),
(1, 1, 1, 0),
(1, 3, 3, 0),
(0, 3, 0, 0),
(0, 2, 2, 0),
(0, 1, 1, 0),
(3, 3, 3, 0),
(3, 2, 2, 0),
(3, 1, 1, 0),
(4, 3, 3, 0),
(4, 2, 2, 0),
(0, 4, 1, 0),
(0, 5, 1, 0),
(0, 4, 1, 0),
(0, 5, 1, 0),
(0, 4, 1, 0),
(0, 5, 1, 0),
(0, 4, 1, 0),
(0, 5, 1, 0),
(5, 4, 1, 0),
(5, 5, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `locale`
--

CREATE TABLE IF NOT EXISTS `locale` (
  `key` varchar(250) NOT NULL,
  `value` text CHARACTER SET utf8 NOT NULL,
  `valueAr` text CHARACTER SET utf8 NOT NULL,
  `valueCh` text CHARACTER SET utf8 NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `Key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `locale`
--

INSERT INTO `locale` (`key`, `value`, `valueAr`, `valueCh`, `deleted`) VALUES
('login', 'Login', 'دخول', '注册', 0);

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE IF NOT EXISTS `property` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(250) CHARACTER SET utf8 NOT NULL,
  `NameAr` varchar(250) CHARACTER SET utf8 NOT NULL,
  `NameCh` varchar(250) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`ID`, `Name`, `NameAr`, `NameCh`) VALUES
(1, 'Width', 'عرض', '宽度'),
(2, 'Height', 'ارتفاع', '高度'),
(3, 'Electrical Boxes & Brackets', 'صناديق كهربائية وأقواس', '电气盒和支架'),
(4, 'Diameter', 'قطر', '直径'),
(5, 'Sub-Category', 'قائمة فرعية', '子分类');

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

CREATE TABLE IF NOT EXISTS `subcategory` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `catID` int(11) NOT NULL,
  `code` varchar(250) NOT NULL,
  `Name` varchar(250) CHARACTER SET utf8 NOT NULL,
  `NameAr` varchar(250) CHARACTER SET utf8 NOT NULL,
  `NameCh` varchar(250) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`ID`, `catID`, `code`, `Name`, `NameAr`, `NameCh`) VALUES
(1, 1, 'heyimaCode321', 'Hard Shell Ceiling Box with Adjustable Bar Hanger', ' صندوق بقوقعة صلبة للسقف قابلة للتعديل شريط شماعات', '硬壳天花板盒带可调式酒吧衣架'),
(3, 1, 'heyimaCode123', 'Fan Fixture Box', 'مروحة تركيبات صندوق', '范夹具盒'),
(4, 1, '1233', '32', '32', '23'),
(5, 2, 'uniqueCode', 'EMT', 'EMT', 'EMT');

-- --------------------------------------------------------

--
-- Table structure for table `value`
--

CREATE TABLE IF NOT EXISTS `value` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `propertyID` int(11) NOT NULL,
  `value` varchar(250) CHARACTER SET utf8 NOT NULL,
  `valueAr` varchar(250) CHARACTER SET utf8 NOT NULL,
  `valueCh` varchar(250) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `value`
--

INSERT INTO `value` (`ID`, `propertyID`, `value`, `valueAr`, `valueCh`) VALUES
(1, 1, '2.5 cm', '2.5 cm', '2.5 cm'),
(2, 2, '2.5 cm', '2.5 cm', '2.5 cm'),
(3, 3, 'Ceiling Box', 'صندوق السقف', '天花板盒'),
(4, 4, '1in', '1in', '1in'),
(5, 5, 'Metallic', 'معدني', '金属的');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
