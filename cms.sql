-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 30, 2016 at 02:34 AM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ID`, `Name`, `NameAr`, `NameCh`, `image`) VALUES
(1, 'Electrical Boxes & Brackets', 'صناديق كهربائية وبين قوسين', '电气盒和支架', 'http://www.homedepot.com/catalog/productImages/100/7b/7b044316-f5eb-4095-a512-ec1349004937_100.jpg'),
(2, 'Conduit', 'قناة', '导管', 'http://www.homedepot.com/catalog/productImages/400_compressed/d7/d733ed0f-09df-4a4d-abc5-1106d3241357_400_compressed.jpg'),
(3, 'Electrical Wire & Cable', 'الأسلاك الكهربائية والكابلات', '电线电缆', 'http://www.homedepot.com/catalog/productImages/400_compressed/0d/0d0bd00d-77e6-475c-aed0-eb0d1ea0c9e9_400_compressed.jpg'),
(5, 'LED', 'ليد', 'LED', 'https://assetscdn.paytm.com/images/catalog/product/H/HO/HOMRB-HIGH-QUALOSR-4591746115BD9/2.jpg');

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
(1, 5, 1, 2, 0),
(5, 6, 1, 10, 0),
(5, 6, 4, 11, 0),
(5, 6, 5, 12, 0),
(5, 6, 6, 13, 0),
(5, 6, 6, 14, 0),
(5, 6, 6, 15, 0),
(5, 6, 7, 16, 0),
(5, 6, 7, 17, 0),
(5, 6, 8, 18, 0),
(5, 6, 9, 19, 0),
(5, 7, 1, 10, 0),
(5, 7, 4, 11, 0),
(5, 7, 5, 12, 0),
(5, 7, 6, 13, 0),
(5, 7, 6, 14, 0),
(5, 7, 6, 15, 0),
(5, 7, 7, 16, 0),
(5, 7, 7, 17, 0),
(5, 7, 8, 18, 0),
(5, 7, 9, 19, 0),
(5, 7, 9, 20, 0);

-- --------------------------------------------------------

--
-- Table structure for table `composepage`
--

CREATE TABLE IF NOT EXISTS `composepage` (
  `pageid` int(11) NOT NULL,
  `partid` int(11) NOT NULL,
  `orderid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `composepage`
--

INSERT INTO `composepage` (`pageid`, `partid`, `orderid`) VALUES
(5, 4, 0),
(5, 7, 1),
(5, 8, 2),
(5, 9, 3),
(5, 10, 4),
(5, 11, 5);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `version`, `pageid`, `content`, `contentAr`, `contentCh`) VALUES
(1, '1.00', 2, '<div class="sixteen wide column" id="sideNav"><p>this is cool</p></div>', '<div class="sixteen wide column" id="sideNav"><p>this is cool</p></div>', '<div class="sixteen wide column" id="sideNav"><p>this is cool</p></div>'),
(2, '1.00', 3, '							<div class="three wide column goodtimes" id="sideNav">\n								<p locale="categories"><i class="ui icon list layout"></i> @:</p>\n\n								<div id="mysidebarmenu" class="amazonmenu">\n									<ul id="sidebarmenu">\n										\n									</ul>\n									<img src="../assets/shadowdown.png" style="width:100%;">\n									<div class="shadowmore"></div>\n									<div class="showmore" locale="showMore">@ <i class="ui icon angle down"></i></div>\n								</div>\n								<div class="filterArea" style="width: 100%;">\n									\n								</div>\n							</div>\n							<div class="thirteen wide column " id="product">\n\n								<div class="ui grid">\n\n									<div class="ten wide column" id="subcatmob">\n										<div class="mobilefil">\n											<a href="#" class="ui tiny button submenumob floatleft" locale="filters">≡@</a>\n											<select class="floatright shideme topspace" id="mobilesubmenu">\n												<option id="defuloptsub" locale="categories">@</option>\n											</select>\n										</div>\n\n										<div class="ui breadcrumb">\n											<a class="section" id="Home-crumb">\n												<i class="ui home icon"></i>\n											</a>\n											<span class="divider">/</span>\n											<div class="section" locale="products">@</div>\n\n										</div>\n									</div>\n									<div class="six wide column rtl searchresultcount" id="srchres">\n										<p class="rtl">search result</p>\n									</div>\n								</div>\n								<br>\n								<div id="products" class="ui cards">\n\n								</div>\n							<br>\n								<div class="ui divider"></div>\n								<div id="productfooter">\n								</div>\n	<div id="product_details" class="ui modal">						</div>\n</div>', '							<div class="three wide column goodtimes" id="sideNav">\n								<p locale="categories"><i class="ui icon list layout"></i> @:</p>\n\n								<div id="mysidebarmenu" class="amazonmenu">\n									<ul id="sidebarmenu">\n										\n									</ul>\n									<img src="../assets/shadowdown.png" style="width:100%;">\n									<div class="shadowmore"></div>\n									<div class="showmore" locale="showMore">@ <i class="ui icon angle down"></i></div>\n								</div>\n								<div class="filterArea" style="width: 100%;">\n									\n								</div>\n							</div>\n							<div class="thirteen wide column " id="product">\n\n								<div class="ui grid">\n\n									<div class="ten wide column" id="subcatmob">\n										<div class="mobilefil">\n											<a href="#" class="ui tiny button submenumob floatleft" locale="filters">≡@</a>\n											<select class="floatright shideme topspace" id="mobilesubmenu">\n												<option id="defuloptsub" locale="categories">@</option>\n											</select>\n										</div>\n\n										<div class="ui breadcrumb">\n											<a class="section" id="Home-crumb">\n												<i class="ui home icon"></i>\n											</a>\n											<span class="divider">/</span>\n											<div class="section" locale="products">@</div>\n\n										</div>\n									</div>\n									<div class="six wide column rtl searchresultcount" id="srchres">\n										<p class="rtl">search result</p>\n									</div>\n								</div>\n								<br>\n								<div id="products" class="ui cards">\n\n								</div>\n							<br>\n								<div class="ui divider"></div>\n								<div id="productfooter">\n								</div>\n	<div id="product_details" class="ui modal">\n						</div>\n</div>', '							<div class="three wide column goodtimes" id="sideNav">\n								<p locale="categories"><i class="ui icon list layout"></i> @:</p>\n\n								<div id="mysidebarmenu" class="amazonmenu">\n									<ul id="sidebarmenu">\n										\n									</ul>\n									<img src="../assets/shadowdown.png" style="width:100%;">\n									<div class="shadowmore"></div>\n									<div class="showmore" locale="showMore">@ <i class="ui icon angle down"></i></div>\n								</div>\n								<div class="filterArea" style="width: 100%;">\n									\n								</div>\n							</div>\n							<div class="thirteen wide column " id="product">\n\n								<div class="ui grid">\n\n									<div class="ten wide column" id="subcatmob">\n										<div class="mobilefil">\n											<a href="#" class="ui tiny button submenumob floatleft" locale="filters">≡@</a>\n											<select class="floatright shideme topspace" id="mobilesubmenu">\n												<option id="defuloptsub" locale="categories">@</option>\n											</select>\n										</div>\n\n										<div class="ui breadcrumb">\n											<a class="section" id="Home-crumb">\n												<i class="ui home icon"></i>\n											</a>\n											<span class="divider">/</span>\n											<div class="section" locale="products">@</div>\n\n										</div>\n									</div>\n									<div class="six wide column rtl searchresultcount" id="srchres">\n										<p class="rtl">search result</p>\n									</div>\n								</div>\n								<br>\n								<div id="products" class="ui cards">\n\n								</div>\n							<br>\n								<div class="ui divider"></div>\n								<div id="productfooter">\n								</div>\n	<div id="product_details" class="ui modal">						</div>\n</div>'),
(3, '1.00', 4, '<p class="MsoNormal"><b>Contact Us <o:p></o:p></b></p><p class="MsoNormal">Alpha is your trusted\npartner for your <span lang="EN-PH">commercial and residential electrical\nneeds. We offer a wide range of electrical products and services for your\nconvenience and satisfaction. If you have questions, feel free to call us at\n______________ or email ____________. Expect our friendly and professional\nstaff to entertain you right away. </span><o:p></o:p></p><p>\n\n\n\n</p><p class="MsoNormal"><o:p>&nbsp;</o:p></p>', '<p class="MsoNormal"><b>Contact Us in ar<o:p></o:p></b></p><p class="MsoNormal">Alpha is your trusted\r\npartner for your <span lang="EN-PH">commercial and residential electrical\r\nneeds. We offer a wide range of electrical products and services for your\r\nconvenience and satisfaction. If you have questions, feel free to call us at\r\n______________ or email ____________. Expect our friendly and professional\r\nstaff to entertain you right away. </span><o:p></o:p></p><p>\r\n\r\n\r\n\r\n</p><p class="MsoNormal"><o:p>&nbsp;</o:p></p>', '<p class="MsoNormal"><b>Contact Us in ch<o:p></o:p></b></p><p class="MsoNormal">Alpha is your trusted\r\npartner for your <span lang="EN-PH">commercial and residential electrical\r\nneeds. We offer a wide range of electrical products and services for your\r\nconvenience and satisfaction. If you have questions, feel free to call us at\r\n______________ or email ____________. Expect our friendly and professional\r\nstaff to entertain you right away. </span><o:p></o:p></p><p>\r\n\r\n\r\n\r\n</p><p class="MsoNormal"><o:p>&nbsp;</o:p></p>'),
(4, '1.00', 5, '<div class="sixteen wide column " style="width: 100%;">\n<div class="row">\n<div class="my-homeSlider">\n<ul>\n<li><img src="../assets/Replicate_your_LOGO_on_wood_with_steel_blade_small_2.jpg" />\n<div class="thead">\n<h1>LED Technology</h1>\n<div class="popin">\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque ipsum. Nullam imperdiet ipsum id dapibus egestas. Nullam leo odio, tempus eu tortor ac, rhoncus feugiat ex. Curabitur varius diam a volutpat commodo. Vestibulum nec massa non neque aliquet facilisis. Mauris ac purus neque.</p>\n</div>\n</div>\n</li>\n<li><img src="../assets/Replicate_your_LOGO_on_wood_with_steel_blade_small_2.jpg" />\n<div class="thead">\n<h1>LED Technology</h1>\n<div class="popin">\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque ipsum. Nullam imperdiet ipsum id dapibus egestas. Nullam leo odio, tempus eu tortor ac, rhoncus feugiat ex. Curabitur varius diam a volutpat commodo. Vestibulum nec massa non neque aliquet facilisis. Mauris ac purus neque.</p>\n</div>\n</div>\n</li>\n<li><img src="../assets/Replicate_your_LOGO_on_wood_with_steel_blade_small_2.jpg" />\n<div class="thead">\n<h1>LED Technology</h1>\n<div class="popin">\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque ipsum. Nullam imperdiet ipsum id dapibus egestas. Nullam leo odio, tempus eu tortor ac, rhoncus feugiat ex. Curabitur varius diam a volutpat commodo. Vestibulum nec massa non neque aliquet facilisis. Mauris ac purus neque.</p>\n</div>\n</div>\n</li>\n</ul>\n</div>\n</div>\n<div class="sixteen wide column" style="background-color: white !important;"><center style="margin-left: auto; margin-right: auto;"><br />\n<h3 class="goodtimes" style="margin-top: 1px;">OUR PRODUCTS</h3>\n<p style="width: 50%;">Take a look at our online product catalogue and find all the information you need</p>\n<div class="ui  stackable grid four column row miniproducts" style="margin: 14px;">&nbsp;</div>\n<br /> <br /> <br /> <a class="ui primary basic button" href="products?lang=&lt;?php echo $_GET[''lang''];?&gt;">BROWSE ALL PRODUCTS</a></center></div>\n<br /> <br />\n<div class="sixteen wide column">\n<div class="ui stackable grid">\n<div class="one wide column theOneWideColumn" style="width: 15px !important; padding: 0;">&nbsp;</div>\n<div class="seven wide column advthumb">\n<h3 class="goodtimes adv">Upgrading Home Network</h3>\n<div class="tailer">\n<div>&nbsp;</div>\nSorry, your browser does not support inline SVG.\n<div>&nbsp;</div>\n</div>\n</div>\n<div class="eight wide column">\n<p>Home networking was never as easy as connecting one device to another. This particular guide would walk over the verbiage of setting up a home network. When it comes to upgrading your home network, you have a lot of things to learn about.</p>\n<h4>What Do You Require from Your Network?</h4>\n<p>Prior to whipping out your credit card or getting dollars in your pocket to buy a gear, you have to find out what you are trying to achieve with your home network. Are you looking to connect to two or more laptops or perhaps a Wi-Fi equipped mobile phone to the web for internet access? You may be capable of getting by with just one access point. Are you working every day at home and you need internet access to the corporate network via VPN technology? You would need to use a good router which can manage the passing through of virtual private network.</p>\n</div>\n</div>\n</div>\n<br /> <br />\n<div class="sixteen wide column" style="background-color: white !important;"><center style="margin-left: auto; margin-right: auto;"><br />\n<h3 class="goodtimes" style="margin-top: 1px;">OUR Categories</h3>\n<p style="width: 50%;">Discover our modern technology of over 15 category of established and emerging technology from Bulbs, Boxes, Miscellaneous, LED and more.</p>\n<div class="ui stackable grid  minicategory" style="float: left;">&nbsp;</div>\n<a class="ui primary basic button" style="margin-top: 14px;" href="products?lang=&lt;?php echo $_GET[''lang''];?&gt;">BROWSE ALL PRODUCTS</a></center></div>\n<br /> <br />\n<div class="sixteen wide column">\n<div class="ui stackable grid">\n<div class="eleven wide column tom">Sorry, your browser does not support inline SVG.</div>\n<div class="five wide column" style="background-color: #ccc;">\n<h3 class="goodtimes adv">Any ideas?</h3>\n</div>\n</div>\n</div>\n<br /> <br /> </div>\n<script>\n	langdrop();\n</script>\n', '<div class="sixteen wide column " style="width: 100%;">\n<div class="row">\n<div class="my-homeSlider">\n<ul>\n<li><img src="../assets/Replicate_your_LOGO_on_wood_with_steel_blade_small_2.jpg" />\n<div class="thead">\n<h1>LED Technology</h1>\n<div class="popin">\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque ipsum. Nullam imperdiet ipsum id dapibus egestas. Nullam leo odio, tempus eu tortor ac, rhoncus feugiat ex. Curabitur varius diam a volutpat commodo. Vestibulum nec massa non neque aliquet facilisis. Mauris ac purus neque.</p>\n</div>\n</div>\n</li>\n<li><img src="../assets/Replicate_your_LOGO_on_wood_with_steel_blade_small_2.jpg" />\n<div class="thead">\n<h1>LED Technology</h1>\n<div class="popin">\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque ipsum. Nullam imperdiet ipsum id dapibus egestas. Nullam leo odio, tempus eu tortor ac, rhoncus feugiat ex. Curabitur varius diam a volutpat commodo. Vestibulum nec massa non neque aliquet facilisis. Mauris ac purus neque.</p>\n</div>\n</div>\n</li>\n<li><img src="../assets/Replicate_your_LOGO_on_wood_with_steel_blade_small_2.jpg" />\n<div class="thead">\n<h1>LED Technology</h1>\n<div class="popin">\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque ipsum. Nullam imperdiet ipsum id dapibus egestas. Nullam leo odio, tempus eu tortor ac, rhoncus feugiat ex. Curabitur varius diam a volutpat commodo. Vestibulum nec massa non neque aliquet facilisis. Mauris ac purus neque.</p>\n</div>\n</div>\n</li>\n</ul>\n</div>\n</div>\n<div class="sixteen wide column" style="background-color: white !important;"><center style="margin-left: auto; margin-right: auto;"><br />\n<h3 class="goodtimes" style="margin-top: 1px;">OUR PRODUCTS</h3>\n<p style="width: 50%;">Take a look at our online product catalogue and find all the information you need</p>\n<div class="ui  stackable grid four column row miniproducts" style="margin: 14px;">&nbsp;</div>\n<br /> <br /> <br /> <a class="ui primary basic button" href="products?lang=&lt;?php echo $_GET[''lang''];?&gt;">BROWSE ALL PRODUCTS</a></center></div>\n<br /> <br />\n<div class="sixteen wide column">\n<div class="ui stackable grid">\n<div class="one wide column theOneWideColumn" style="width: 15px !important; padding: 0;">&nbsp;</div>\n<div class="seven wide column advthumb">\n<h3 class="goodtimes adv">Upgrading Home Network</h3>\n<div class="tailer">\n<div>&nbsp;</div>\nSorry, your browser does not support inline SVG.\n<div>&nbsp;</div>\n</div>\n</div>\n<div class="eight wide column">\n<p>Home networking was never as easy as connecting one device to another. This particular guide would walk over the verbiage of setting up a home network. When it comes to upgrading your home network, you have a lot of things to learn about.</p>\n<h4>What Do You Require from Your Network?</h4>\n<p>Prior to whipping out your credit card or getting dollars in your pocket to buy a gear, you have to find out what you are trying to achieve with your home network. Are you looking to connect to two or more laptops or perhaps a Wi-Fi equipped mobile phone to the web for internet access? You may be capable of getting by with just one access point. Are you working every day at home and you need internet access to the corporate network via VPN technology? You would need to use a good router which can manage the passing through of virtual private network.</p>\n</div>\n</div>\n</div>\n<br /> <br />\n<div class="sixteen wide column" style="background-color: white !important;"><center style="margin-left: auto; margin-right: auto;"><br />\n<h3 class="goodtimes" style="margin-top: 1px;">OUR Categories</h3>\n<p style="width: 50%;">Discover our modern technology of over 15 category of established and emerging technology from Bulbs, Boxes, Miscellaneous, LED and more.</p>\n<div class="ui stackable grid  minicategory" style="float: left;">&nbsp;</div>\n<a class="ui primary basic button" style="margin-top: 14px;" href="products?lang=&lt;?php echo $_GET[''lang''];?&gt;">BROWSE ALL PRODUCTS</a></center></div>\n<br /> <br />\n<div class="sixteen wide column">\n<div class="ui stackable grid">\n<div class="eleven wide column tom">Sorry, your browser does not support inline SVG.</div>\n<div class="five wide column" style="background-color: #ccc;">\n<h3 class="goodtimes adv">Any ideas?</h3>\n</div>\n</div>\n</div>\n<br /> <br /> </div>\n<script>\n	langdrop();\n</script>\n', '<div class="sixteen wide column " style="width: 100%;">\n<div class="row">\n<div class="my-homeSlider">\n<ul>\n<li><img src="../assets/Replicate_your_LOGO_on_wood_with_steel_blade_small_2.jpg" />\n<div class="thead">\n<h1>LED Technology</h1>\n<div class="popin">\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque ipsum. Nullam imperdiet ipsum id dapibus egestas. Nullam leo odio, tempus eu tortor ac, rhoncus feugiat ex. Curabitur varius diam a volutpat commodo. Vestibulum nec massa non neque aliquet facilisis. Mauris ac purus neque.</p>\n</div>\n</div>\n</li>\n<li><img src="../assets/Replicate_your_LOGO_on_wood_with_steel_blade_small_2.jpg" />\n<div class="thead">\n<h1>LED Technology</h1>\n<div class="popin">\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque ipsum. Nullam imperdiet ipsum id dapibus egestas. Nullam leo odio, tempus eu tortor ac, rhoncus feugiat ex. Curabitur varius diam a volutpat commodo. Vestibulum nec massa non neque aliquet facilisis. Mauris ac purus neque.</p>\n</div>\n</div>\n</li>\n<li><img src="../assets/Replicate_your_LOGO_on_wood_with_steel_blade_small_2.jpg" />\n<div class="thead">\n<h1>LED Technology</h1>\n<div class="popin">\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque ipsum. Nullam imperdiet ipsum id dapibus egestas. Nullam leo odio, tempus eu tortor ac, rhoncus feugiat ex. Curabitur varius diam a volutpat commodo. Vestibulum nec massa non neque aliquet facilisis. Mauris ac purus neque.</p>\n</div>\n</div>\n</li>\n</ul>\n</div>\n</div>\n<div class="sixteen wide column" style="background-color: white !important;"><center style="margin-left: auto; margin-right: auto;"><br />\n<h3 class="goodtimes" style="margin-top: 1px;">OUR PRODUCTS</h3>\n<p style="width: 50%;">Take a look at our online product catalogue and find all the information you need</p>\n<div class="ui  stackable grid four column row miniproducts" style="margin: 14px;">&nbsp;</div>\n<br /> <br /> <br /> <a class="ui primary basic button" href="products?lang=&lt;?php echo $_GET[''lang''];?&gt;">BROWSE ALL PRODUCTS</a></center></div>\n<br /> <br />\n<div class="sixteen wide column">\n<div class="ui stackable grid">\n<div class="one wide column theOneWideColumn" style="width: 15px !important; padding: 0;">&nbsp;</div>\n<div class="seven wide column advthumb">\n<h3 class="goodtimes adv">Upgrading Home Network</h3>\n<div class="tailer">\n<div>&nbsp;</div>\nSorry, your browser does not support inline SVG.\n<div>&nbsp;</div>\n</div>\n</div>\n<div class="eight wide column">\n<p>Home networking was never as easy as connecting one device to another. This particular guide would walk over the verbiage of setting up a home network. When it comes to upgrading your home network, you have a lot of things to learn about.</p>\n<h4>What Do You Require from Your Network?</h4>\n<p>Prior to whipping out your credit card or getting dollars in your pocket to buy a gear, you have to find out what you are trying to achieve with your home network. Are you looking to connect to two or more laptops or perhaps a Wi-Fi equipped mobile phone to the web for internet access? You may be capable of getting by with just one access point. Are you working every day at home and you need internet access to the corporate network via VPN technology? You would need to use a good router which can manage the passing through of virtual private network.</p>\n</div>\n</div>\n</div>\n<br /> <br />\n<div class="sixteen wide column" style="background-color: white !important;"><center style="margin-left: auto; margin-right: auto;"><br />\n<h3 class="goodtimes" style="margin-top: 1px;">OUR Categories</h3>\n<p style="width: 50%;">Discover our modern technology of over 15 category of established and emerging technology from Bulbs, Boxes, Miscellaneous, LED and more.</p>\n<div class="ui stackable grid  minicategory" style="float: left;">&nbsp;</div>\n<a class="ui primary basic button" style="margin-top: 14px;" href="products?lang=&lt;?php echo $_GET[''lang''];?&gt;">BROWSE ALL PRODUCTS</a></center></div>\n<br /> <br />\n<div class="sixteen wide column">\n<div class="ui stackable grid">\n<div class="eleven wide column tom">Sorry, your browser does not support inline SVG.</div>\n<div class="five wide column" style="background-color: #ccc;">\n<h3 class="goodtimes adv">Any ideas?</h3>\n</div>\n</div>\n</div>\n<br /> <br /> </div>\n<script>\n	langdrop();\n</script>\n');

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
('added', 'Added', 'أضيفت', '添加', 0),
('all', 'All', 'كل', '凡', 0),
('alpha', 'Alpha', 'ألفا', 'Alpha', 0),
('cart', 'Cart', 'سلة', '大车', 0),
('categories', 'Categories', 'أقسام', '分类', 0),
('checkoutwithpaypal', 'Checkout with Paypal', 'Paypal ادفع باستخدام', '使用PayPal付款', 0),
('details', 'Details', 'تفاصيل', '细节', 0),
('filterBy', 'Filter by', 'مصنف ب', '过滤', 0),
('filters', 'Filters', 'فلتر', '筛选', 0),
('follow', 'Follow', 'تابع', '跟随', 0),
('guest', 'Guest', 'ضيف', '客人', 0),
('itemsDetails', 'Items details', 'تفاصيل الاصناف', '项目详细信息', 0),
('lang', 'en', 'ar', 'ch', 0),
('lightUpYourLife', 'Light up your life', 'نور حياتك', '照亮你的生活', 0),
('or', 'or', 'او', '或', 0),
('products', 'Products', 'المنتجات', '产品', 0),
('results', 'Results', 'نتائج', '结果', 0),
('showing', 'Showing', 'تظهر', '显示', 0),
('showMore', 'Show more', 'المزيد', '显示更多', 0),
('toCart', 'To Cart', 'أضافة للعربة', '购物车', 0),
('total', 'Total', 'إجمالي', '总', 0);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`ID`, `OrderID`, `Available`, `Name`, `NameAr`, `NameCh`, `url`, `hascontent`) VALUES
(2, 4, 1, 'About us', 'عنا', 'in ch', 'aboutus', '1.00'),
(3, 2, 1, 'Products', 'المنتجات', '產品', 'products', '1.00'),
(4, 3, 1, 'Contact us', 'اتصل بنا', '联系我们', 'contactus', '1.00'),
(5, 0, 1, 'Home', 'الرئيسية', '家', 'Home', '1.00'),
(6, 1, 0, 'Article', 'article', 'article', 'article', '1.00');

-- --------------------------------------------------------

--
-- Table structure for table `parts`
--

CREATE TABLE IF NOT EXISTS `parts` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `page` int(11) NOT NULL,
  `partid` varchar(250) CHARACTER SET utf8 NOT NULL,
  `content` text CHARACTER SET utf8 NOT NULL,
  `appendto` varchar(250) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `parts`
--

INSERT INTO `parts` (`ID`, `page`, `partid`, `content`, `appendto`) VALUES
(4, 5, 'Carsouel', '<div class="row">\r\n<div class="my-homeSlider">\r\n<ul>\r\n<li><img src="https://docs.google.com/uc?id=0B4r418jG6C2UU0lYd3g3VG9YSlk" />\r\n<div class="thead">\r\n<h1>LED Technologies</h1>\r\n<div class="popin">\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque ipsum. Nullam imperdiet ipsum id dapibus egestas. Nullam leo odio, tempus eu tortor ac, rhoncus feugiat ex. Curabitur varius diam a volutpat commodo. Vestibulum nec massa non neque aliquet facilisis. Mauris ac purus neque.</p>\r\n</div>\r\n</div>\r\n</li>\r\n<li><img src="https://docs.google.com/uc?id=0B4r418jG6C2UU0lYd3g3VG9YSlk" />\r\n<div class="thead">\r\n<h1>LED Technology</h1>\r\n<div class="popin">\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque ipsum. Nullam imperdiet ipsum id dapibus egestas. Nullam leo odio, tempus eu tortor ac, rhoncus feugiat ex. Curabitur varius diam a volutpat commodo. Vestibulum nec massa non neque aliquet facilisis. Mauris ac purus neque.</p>\r\n</div>\r\n</div>\r\n</li>\r\n<li><img src="https://docs.google.com/uc?id=0B4r418jG6C2UU0lYd3g3VG9YSlk" />\r\n<div class="thead">\r\n<h1>LED Technology</h1>\r\n<div class="popin">\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque ipsum. Nullam imperdiet ipsum id dapibus egestas. Nullam leo odio, tempus eu tortor ac, rhoncus feugiat ex. Curabitur varius diam a volutpat commodo. Vestibulum nec massa non neque aliquet facilisis. Mauris ac purus neque.</p>\r\n</div>\r\n</div>\r\n</li>\r\n</ul>\r\n</div>\r\n</div>', ''),
(6, 5, 'Carousel02', '<div class="row">\r\n<div class="my-homeSlider">\r\n<ul>\r\n<li><img src="https://docs.google.com/uc?id=0B4r418jG6C2UU0lYd3g3VG9YSlk" />\r\n<div class="thead">\r\n<h1>LED Technology</h1>\r\n<div class="popin">\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque ipsum. Nullam imperdiet ipsum id dapibus egestas. Nullam leo odio, tempus eu tortor ac, rhoncus feugiat ex. Curabitur varius diam a volutpat commodo. Vestibulum nec massa non neque aliquet facilisis. Mauris ac purus neque.</p>\r\n</div>\r\n</div>\r\n</li>\r\n<li><img src="https://docs.google.com/uc?id=0B4r418jG6C2UU0lYd3g3VG9YSlk" />\r\n<div class="thead">\r\n<h1>LED Technology</h1>\r\n<div class="popin">\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque ipsum. Nullam imperdiet ipsum id dapibus egestas. Nullam leo odio, tempus eu tortor ac, rhoncus feugiat ex. Curabitur varius diam a volutpat commodo. Vestibulum nec massa non neque aliquet facilisis. Mauris ac purus neque.</p>\r\n</div>\r\n</div>\r\n</li>\r\n<li><img src="https://docs.google.com/uc?id=0B4r418jG6C2UU0lYd3g3VG9YSlk" />\r\n<div class="thead">\r\n<h1>LED Technology</h1>\r\n<div class="popin">\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor neque ipsum. Nullam imperdiet ipsum id dapibus egestas. Nullam leo odio, tempus eu tortor ac, rhoncus feugiat ex. Curabitur varius diam a volutpat commodo. Vestibulum nec massa non neque aliquet facilisis. Mauris ac purus neque.</p>\r\n</div>\r\n</div>\r\n</li>\r\n</ul>\r\n</div>\r\n</div>', ''),
(7, 5, 'OURPRODUCTS', '<br><div class="sixteen wide column" style="background-color: white !important">\n\n		<center style="margin-left: auto;margin-right: auto;">\n			<br>\n			<h3 class="goodtimes" style="margin-top: 1px;">OUR PRODUCTS</h3>	\n			<p style="width: 50%;">Take a look at our online product catalogue and find all the information you need</p>\n\n			<div class="ui  stackable grid four column row miniproducts" style="margin: 14px;">\n\n			</div>\n\n			<br>\n			<br>\n			<br>\n			<a class="ui primary basic button" inlineLocale="href:lang" href="products?lang=@">BROWSE ALL PRODUCTS</a>\n		</center>\n\n		<br>\n	</div><br>', ''),
(8, 5, 'advthumb', '<br>\n	<div class="sixteen wide column" style="background-color: #f4f4f4">\n		<div class="ui stackable grid">\n			<div class="one wide column theOneWideColumn" style="width:15px !important; padding:0"></div>\n			<div class="seven wide column advthumb" >\n				<h3 class="goodtimes adv">Upgrading Home Network</h3>\n				<div class="tailer" >\n					<div></div>\n					<svg style="display: block;" height="100" width="50">\n						<polygon points=''0,0 0,30 30,50 0,75 0,100 50,100 100,0'' style="fill:#f4f4f4;stroke-width:1" />\n						Sorry, your browser does not support inline SVG.\n					</svg>\n					<div></div>\n				</div>\n			</div>\n			<div class="eight wide column">\n				<p>\n					Home networking was never as easy as connecting one device to another. This particular guide would walk over the verbiage of setting up a home network. When it comes to upgrading your home network, you have a lot of things to learn about.\n				</p>\n				<h4>\n					What Do You Require from Your Network?\n				</h4>\n				<p>\n					Prior to whipping out your credit card or getting dollars in your pocket to buy a gear, you have to find out what you are trying to achieve with your home network. Are you looking to connect to two or more laptops or perhaps a Wi-Fi equipped mobile phone to the web for internet access? You may be capable of getting by with just one access point. Are you working every day at home and you need internet access to the corporate network via VPN technology? You would need to use a good router which can manage the passing through of virtual private network.\n				</p>\n			</div>\n		</div>\n	</div>\n	<br>', ''),
(9, 5, 'OUTPRODUCTS', '<p>&nbsp;</p>\r\n<div class="sixteen wide column" style="background-color: white !important;"><center style="margin-left: auto; margin-right: auto;"><br />\r\n<h3 class="goodtimes" style="margin-top: 1px;">OUR Categories</h3>\r\n<p style="width: 50%;">Discover our modern technology of over 15 category of established and emerging technology from Bulbs, Boxes, Miscellaneous, LED and more.</p>\r\n<div class="ui stackable grid  minicategory" style="float: left;">&nbsp;</div>\r\n<a class="ui primary basic button" style="margin-top: 14px;" href="products?lang=@">BROWSE ALL PRODUCTS</a></center></div>\r\n<p>&nbsp;</p>', ''),
(10, 5, 'adMAP', ' <br>\n <div class="sixteen wide column">\n  <div class="ui stackable grid">\n   <div class="eleven wide column tom">\n    <svg style="display: block;\n    position: absolute;\n    right: 0;\n    top: 0;\n    margin-top: auto;\n    margin-bottom: auto;\n    bottom: 0;" height="100" width="50">\n    <polygon points="10,50 50,30 50,0 50,75" style="fill:#ccc;stroke-width:1" />\n    Sorry, your browser does not support inline SVG.\n   </svg>\n  </div>\n  <div class="five wide column" style="background-color: #ccc;" >\n   <h3 class="goodtimes adv">Any ideas?</h3>\n  </div>\n </div>\n</div>\n<br>', ''),
(11, 5, 'script', '<script>langdrop();</script>', '');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`ID`, `Name`, `NameAr`, `NameCh`, `image`, `filterable`) VALUES
(1, 'Subcategory', 'فرعية', '子分类', 'http://www.homedepot.com/catalog/productImages/400_compressed/9e/9e030329-6a61-41c1-be96-be58828fe602_400_compressed.jpg', 0),
(2, 'Length', 'طوله', '长', 'http://www.homedepot.com/catalog/productImages/400_compressed/8e/8e54fe5c-28ad-4c86-a4ad-45fc9ec00b80_400_compressed.jpg', 1),
(3, 'Width', 'عرض', 'Widtho', 'http://nerdist.com/wp-content/themes/Legendary_Network/img/logo.png', 1),
(4, 'Wattage', 'القوة الكهربائية', '瓦数', 'lightning', 1),
(5, 'Lifespan', 'عمر أفتراضي', '寿命', 'wait', 1),
(6, 'Colors', 'الألوان', '颜色', 'wizard', 1),
(7, 'Luminous flux', 'تدفق الإضاءة', '光通量', 'certificate', 1),
(8, 'Beam angle', 'زاوية الشعاع', '光束角度', 'terminal', 1),
(9, 'Dimming', 'تحكم بشدة الضوء', '调光控制', 'adjust', 1);

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
  `price` float(10,4) NOT NULL,
  `qun` int(11) NOT NULL,
  `onsale` tinyint(1) NOT NULL,
  `discount` float(10,4) NOT NULL,
  `ordering` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`ID`, `catID`, `code`, `Name`, `NameAr`, `NameCh`, `image`, `price`, `qun`, `onsale`, `discount`, `ordering`) VALUES
(1, 2, 'somecode', 'EMT', 'EMT', 'EMT', 'http://www.homedepot.com/catalog/productImages/400_compressed/98/980b4176-6b34-448d-9343-44e66448c05c_400_compressed.jpg', 140.0000, 0, 0, 0.0000, 0),
(2, 2, 'UA9AEB-CTN', 'Elbow', 'Elbow', 'Elbow', 'http://www.homedepot.com/catalog/productImages/400_compressed/28/285b9026-f2bf-410c-8f40-17a5d6bb1e76_400_compressed.jpg', 65.5000, 0, 0, 0.0000, 0),
(3, 3, 'B618RR', 'Hard Shell', 'Hard Shell', 'Hard Shell', 'http://www.homedepot.com/catalog/productImages/400_compressed/ee/ee4634fc-31d6-47cd-a76f-eca7e733693f_400_compressed.jpg', 99.9000, 0, 0, 0.0000, 0),
(4, 3, '2304-42-00', 'AFC', 'AFC', 'AFC', 'http://www.homedepot.com/catalog/productImages/400_compressed/51/510d365f-6dc5-4af7-aaf5-1520c7daf8e8_400_compressed.jpg', 56.0000, 0, 0, 0.0000, 0),
(5, 1, '521711234EW-25R', 'Square Box ', 'صندوق مربع', '方框', 'http://www.homedepot.com/catalog/productImages/400_compressed/0f/0f4e09df-9166-42f4-ac6a-af13624047fd_400_compressed.jpg', 95.0000, 0, 0, 0.0000, 0),
(6, 5, 'T-L3B35A2T-5W', 'B35', 'ب35', 'B35', 'http://www.homedepot.com/catalog/productImages/400_compressed/d6/d64815ce-fa44-4d6e-b2e3-2ebeab87f055_400_compressed.jpg', 10.5000, 0, 0, 0.0000, 0),
(7, 5, 'TCB35', 'Tip Candle B35', 'شمعة حرف ب35', '提示蜡烛B35', 'http://www.homedepot.com/catalog/productImages/1000/32/32a2096f-8f3f-48c5-ab82-e7c805940ee2_1000.jpg', 35.5000, 0, 0, 0.0000, 0);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

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
(9, 2, '1000', '1000', '1000'),
(10, 1, 'Candles', 'شمعة ليد', '蜡烛'),
(11, 4, '5W', '5W', '5W'),
(12, 5, '25000Hrs', '25000Hrs', '25000Hrs'),
(13, 6, '3000', '3000', '3000'),
(14, 6, '4000', '4000', '4000'),
(15, 6, '5000', '5000', '5000'),
(16, 7, '400K', '400K', '400K'),
(17, 7, '425lm', '425lm', '425lm'),
(18, 8, '260', '260', '260'),
(19, 9, 'Standard', 'ثابت', '标准'),
(20, 9, 'Dimmable', 'متغير', '变量');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
