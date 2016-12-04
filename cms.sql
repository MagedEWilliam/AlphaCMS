-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2016 at 10:36 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ID`, `Name`, `NameAr`, `NameCh`, `image`) VALUES
(1, 'Electrical Boxes & Brackets', 'صناديق كهربائية وبين قوسين', '电气盒和支架', 'http://www.homedepot.com/catalog/productImages/100/7b/7b044316-f5eb-4095-a512-ec1349004937_100.jpg'),
(2, 'Conduit', 'قناة', '导管', 'http://www.homedepot.com/catalog/productImages/400_compressed/d7/d733ed0f-09df-4a4d-abc5-1106d3241357_400_compressed.jpg'),
(3, 'Electrical Wire & Cable', 'الأسلاك الكهربائية والكابلات', '电线电缆', 'http://www.homedepot.com/catalog/productImages/400_compressed/0d/0d0bd00d-77e6-475c-aed0-eb0d1ea0c9e9_400_compressed.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `catproperty`
--

CREATE TABLE IF NOT EXISTS `catproperty` (
  `catID` int(11) NOT NULL,
  `categoryID` int(11) NOT NULL,
  `propertyID` int(11) NOT NULL,
  `valueID` int(11) NOT NULL,
  `showquick` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `catproperty`
--

INSERT INTO `catproperty` (`catID`, `categoryID`, `propertyID`, `valueID`, `showquick`) VALUES
(2, 1, 1, 2, 1),
(2, 2, 1, 4, 1),
(3, 3, 1, 1, 1),
(3, 4, 1, 3, 1),
(3, 4, 2, 5, 1),
(1, 5, 1, 1, 1),
(1, 5, 3, 6, 1),
(1, 5, 1, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE IF NOT EXISTS `content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `version` decimal(10,2) NOT NULL,
  `pageid` int(11) NOT NULL,
  `content` mediumtext CHARACTER SET utf8mb4 NOT NULL,
  `contentAr` mediumtext CHARACTER SET utf8 NOT NULL,
  `contentCh` mediumtext CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `version`, `pageid`, `content`, `contentAr`, `contentCh`) VALUES
(1, '1.00', 2, '<div class="sixteen wide column" id="sideNav"><p>this is cool</p></div>', '<div class="sixteen wide column" id="sideNav"><p>this is cool</p></div>', '<div class="sixteen wide column" id="sideNav"><p>this is cool</p></div>'),
(2, '1.00', 3, '<div class="three wide column goodtimes" id="sideNav">\n								<p><i class="ui icon list layout"></i> Categories:</p>\n\n								<div id="mysidebarmenu" class="amazonmenu">\n									<ul id="sidebarmenu">\n										\n									</ul>\n									<img src="../assets/shadowdown.png" style="width:100%;">\n									<div class="shadowmore"></div>\n									<div class="showmore">Show more <i class="ui icon angle down"></i></div>\n								</div>\n								<div class="filterArea" style="width: 100%;">\n									\n								</div>\n							</div>\n							<div class="thirteen wide column " id="product">\n								<div class="ui grid">\n\n									<div class="ten wide column" id="subcatmob">\n										<div class="mobilefil">\n											<a href="#" class="ui tiny button submenumob floatleft">≡Filter</a>\n											<select class="floatright shideme topspace" id="mobilesubmenu">\n												<option id="defuloptsub">Categories</option>\n											</select>\n										</div>\n\n										<div class="ui breadcrumb">\n											<a class="section" id="Home-crumb">\n												<i class="ui home icon"></i>\n											</a>\n											<span class="divider">/</span>\n											<div class="section">Products</div>\n\n										</div>\n									</div>\n									<div class="six wide column rtl searchresultcount" id="srchres">\n										<p class="rtl">search result</p>\n									</div>\n								</div>\n								<div class="ui divider"></div>\n								<div id="products" class="ui cards">\n\n								</div>\n								<br>\n								<div class="ui divider"></div>\n								<div id="productfooter">\n								</div>\n							</div>', '<div class="three wide column goodtimes" id="sideNav">\n								<p><i class="ui icon list layout"></i> Categories:</p>\n\n								<div id="mysidebarmenu" class="amazonmenu">\n									<ul id="sidebarmenu">\n										\n									</ul>\n									<img src="../assets/shadowdown.png" style="width:100%;">\n									<div class="shadowmore"></div>\n									<div class="showmore">Show more <i class="ui icon angle down"></i></div>\n								</div>\n								<div class="filterArea" style="width: 100%;">\n									\n								</div>\n							</div>\n							<div class="thirteen wide column " id="product">\n								<div class="ui grid">\n\n									<div class="ten wide column" id="subcatmob">\n										<div class="mobilefil">\n											<a href="#" class="ui tiny button submenumob floatleft">≡Filter</a>\n											<select class="floatright shideme topspace" id="mobilesubmenu">\n												<option id="defuloptsub">Categories</option>\n											</select>\n										</div>\n\n										<div class="ui breadcrumb">\n											<a class="section" id="Home-crumb">\n												<i class="ui home icon"></i>\n											</a>\n											<span class="divider">/</span>\n											<div class="section">Products</div>\n\n										</div>\n									</div>\n									<div class="six wide column rtl searchresultcount" id="srchres">\n										<p class="rtl">search result</p>\n									</div>\n								</div>\n								<div class="ui divider"></div>\n								<div id="products" class="ui cards">\n\n								</div>\n								<br>\n								<div class="ui divider"></div>\n								<div id="productfooter">\n								</div>\n							</div>', '<div class="three wide column goodtimes" id="sideNav">\n								<p><i class="ui icon list layout"></i> Categories:</p>\n\n								<div id="mysidebarmenu" class="amazonmenu">\n									<ul id="sidebarmenu">\n										\n									</ul>\n									<img src="../assets/shadowdown.png" style="width:100%;">\n									<div class="shadowmore"></div>\n									<div class="showmore">Show more <i class="ui icon angle down"></i></div>\n								</div>\n								<div class="filterArea" style="width: 100%;">\n									\n								</div>\n							</div>\n							<div class="thirteen wide column " id="product">\n								<div class="ui grid">\n\n									<div class="ten wide column" id="subcatmob">\n										<div class="mobilefil">\n											<a href="#" class="ui tiny button submenumob floatleft">≡Filter</a>\n											<select class="floatright shideme topspace" id="mobilesubmenu">\n												<option id="defuloptsub">Categories</option>\n											</select>\n										</div>\n\n										<div class="ui breadcrumb">\n											<a class="section" id="Home-crumb">\n												<i class="ui home icon"></i>\n											</a>\n											<span class="divider">/</span>\n											<div class="section">Products</div>\n\n										</div>\n									</div>\n									<div class="six wide column rtl searchresultcount" id="srchres">\n										<p class="rtl">search result</p>\n									</div>\n								</div>\n								<div class="ui divider"></div>\n								<div id="products" class="ui cards">\n\n								</div>\n								<br>\n								<div class="ui divider"></div>\n								<div id="productfooter">\n								</div>\n							</div>'),
(3, '1.00', 4, '<p class="MsoNormal"><b>Contact Us <o:p></o:p></b></p><p class="MsoNormal">Alpha is your trusted\npartner for your <span lang="EN-PH">commercial and residential electrical\nneeds. We offer a wide range of electrical products and services for your\nconvenience and satisfaction. If you have questions, feel free to call us at\n______________ or email ____________. Expect our friendly and professional\nstaff to entertain you right away. </span><o:p></o:p></p><p>\n\n\n\n</p><p class="MsoNormal"><o:p>&nbsp;</o:p></p>', '<p class="MsoNormal"><b>Contact Us in ar<o:p></o:p></b></p><p class="MsoNormal">Alpha is your trusted\r\npartner for your <span lang="EN-PH">commercial and residential electrical\r\nneeds. We offer a wide range of electrical products and services for your\r\nconvenience and satisfaction. If you have questions, feel free to call us at\r\n______________ or email ____________. Expect our friendly and professional\r\nstaff to entertain you right away. </span><o:p></o:p></p><p>\r\n\r\n\r\n\r\n</p><p class="MsoNormal"><o:p>&nbsp;</o:p></p>', '<p class="MsoNormal"><b>Contact Us in ch<o:p></o:p></b></p><p class="MsoNormal">Alpha is your trusted\r\npartner for your <span lang="EN-PH">commercial and residential electrical\r\nneeds. We offer a wide range of electrical products and services for your\r\nconvenience and satisfaction. If you have questions, feel free to call us at\r\n______________ or email ____________. Expect our friendly and professional\r\nstaff to entertain you right away. </span><o:p></o:p></p><p>\r\n\r\n\r\n\r\n</p><p class="MsoNormal"><o:p>&nbsp;</o:p></p>');

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
('follow', 'Follow', 'تابع', '跟随', 0);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `OrderID` int(11) NOT NULL,
  `Available` tinyint(1) NOT NULL,
  `Name` varchar(250) CHARACTER SET utf8 NOT NULL,
  `NameAr` varchar(250) CHARACTER SET utf8 NOT NULL,
  `NameCh` varchar(250) CHARACTER SET utf8 NOT NULL,
  `url` varchar(150) NOT NULL,
  `hascontent` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`ID`, `OrderID`, `Available`, `Name`, `NameAr`, `NameCh`, `url`, `hascontent`) VALUES
(2, 0, 1, 'About us', 'عنا', 'in ch', 'aboutus', '1.00'),
(3, 1, 1, 'Products', 'المنتجات', '產品', 'products', '1.00'),
(4, 2, 1, 'Contact us', 'اتصل بنا', '联系我们', 'contactus', '1.00');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE IF NOT EXISTS `property` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(250) CHARACTER SET utf8 NOT NULL,
  `NameAr` varchar(250) CHARACTER SET utf8 NOT NULL,
  `NameCh` varchar(250) CHARACTER SET utf8 NOT NULL,
  `image` text NOT NULL,
  `filterable` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`ID`, `Name`, `NameAr`, `NameCh`, `image`, `filterable`) VALUES
(1, 'Subcategory', 'فرعية', '子分类', 'http://www.homedepot.com/catalog/productImages/400_compressed/9e/9e030329-6a61-41c1-be96-be58828fe602_400_compressed.jpg', 1),
(2, 'Length', 'طوله', '长', 'http://www.homedepot.com/catalog/productImages/400_compressed/8e/8e54fe5c-28ad-4c86-a4ad-45fc9ec00b80_400_compressed.jpg', 0),
(3, 'Width', 'عرض', 'Widtho', 'http://nerdist.com/wp-content/themes/Legendary_Network/img/logo.png', 0);

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
  `image` text NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`ID`, `catID`, `code`, `Name`, `NameAr`, `NameCh`, `image`) VALUES
(1, 2, 'somecode', 'EMT', 'EMT', 'EMT', 'http://www.homedepot.com/catalog/productImages/400_compressed/98/980b4176-6b34-448d-9343-44e66448c05c_400_compressed.jpg'),
(2, 2, 'UA9AEB-CTN', 'Elbow', 'Elbow', 'Elbow', 'http://www.homedepot.com/catalog/productImages/400_compressed/28/285b9026-f2bf-410c-8f40-17a5d6bb1e76_400_compressed.jpg'),
(3, 3, 'B618RR', 'Hard Shell', 'Hard Shell', 'Hard Shell', 'http://www.homedepot.com/catalog/productImages/400_compressed/ee/ee4634fc-31d6-47cd-a76f-eca7e733693f_400_compressed.jpg'),
(4, 3, '2304-42-00', 'AFC', 'AFC', 'AFC', 'http://www.homedepot.com/catalog/productImages/400_compressed/51/510d365f-6dc5-4af7-aaf5-1520c7daf8e8_400_compressed.jpg'),
(5, 1, '521711234EW-25R', 'Square Box ', 'صندوق مربع', '方框', 'http://www.homedepot.com/catalog/productImages/400_compressed/0f/0f4e09df-9166-42f4-ac6a-af13624047fd_400_compressed.jpg');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `value`
--

INSERT INTO `value` (`ID`, `propertyID`, `value`, `valueAr`, `valueCh`) VALUES
(1, 1, 'Ceiling Box', 'صندوق السقف', '天花板盒'),
(2, 1, 'Metallic', 'معدني', '金属'),
(3, 1, 'Building Wire', 'بناء الأسلاك', '建筑电线'),
(4, 1, 'Nonmetallic', 'غير معدني', '非金属'),
(5, 2, '250', '250', '250'),
(6, 3, '100cm', '100cm', '100cm'),
(7, 2, '500', '500', '500'),
(8, 0, '1000', '1000', '1000'),
(9, 2, '1000', '1000', '1000');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
