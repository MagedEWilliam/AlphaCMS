<?php
require('class_database.php');
if( isset($_GET['method']) ){
	$classname = new ClassName;

	switch ($_GET['method']) {
		case "getCategory"     : echo $classname->getCategory   ();             break;
		case "getSubCategory"  : echo $classname->getSubCategory();             break;
		case "getProperty"     : echo $classname->getProperty   ();             break;
		case "getPage"         : echo $classname->getPage       ();             break;
		case "getPart"         : echo $classname->getPart       ();             break;
		case "getPagePart"     : echo $classname->getPagePart   ();             break;
		case "getValue"        : echo $classname->getValueQ     ($_GET['ID']);  break;
		case "getLocale"       : echo $classname->getLocale     ($_GET['q']) ;  break;

		case "setCategory"     : echo $classname->setCategory   ();             break;
		case "setSubCategory"  : echo setSubCategory            ();             break;
		case "setProperty"     : echo $classname->setValue      ();             break;
		case "setLocale"       : echo $classname->setLocale     ();             break;
		case "setContent"      : echo $classname->setContent    ();             break;
		case "setPage"         : echo $classname->setPage       ();             break;
		case "setPart"         : echo $classname->setPart       ();             break;

		case "manageNavOrder"  : echo $classname->analyzePage    ('manageNavOrder'); break;
		case "manageProductsOrder" : echo $classname->analyzePage('manageProductsOrder');break;
		case "managePages"     : echo $classname->delPageComposition($_POST['page']); $classname->analyzePage   ('managePages');break;
		
		case "uptPart"         : echo $classname->uptPart       ();             break;
	}

}
// print_r($_POST)
function setSubCategory(){
	$classname = new ClassName;
	$sub = $classname->setSubCategory();

	$checkcheck = 0;
	if( isset( $_POST['quickdetails'] ) ){ $checkcheck = 1; }
	else{ $checkcheck = 0; }

	foreach ($_POST['property'] as $key => $value) {
		$classname->setCatPropertyValue($sub, $value, $_POST['value'][$key], $checkcheck);
	}
	header('Location: index.php?method=setSubCategory&status=success');
}

class ClassName {

	static public function setPart      () {
		if($_POST['page']!= ""){
			$db  = Database::getInstance();
			$mysqli = $db->getConnection();

			$sqlQuery = "INSERT INTO parts ";

			$sqlQuery .= "(" ;
			$sqlQuery .= " `page` " ;
			$sqlQuery .= ",`partid`  " ;
			$sqlQuery .= ", `content`  " ;
			$sqlQuery .= ", `contentAr`  " ;
			$sqlQuery .= ", `contentCh`  " ;
			$sqlQuery .= ")" ;
			
			$sqlQuery .= " VALUES ";

			$sqlQuery .= "(" ;
			$sqlQuery .= " ".  $_POST['page']      .",  ";
			$sqlQuery .= " '".  $_POST['partID']   ."',  ";

			if($_POST['takefrom'] == "editor"){
				$sqlQuery .= " '<div style=\"all: unset;width: 100%;\">".  $mysqli->real_escape_string($_POST['content'])   ."</div>', ";
			}elseif($_POST['takefrom'] == "code"){
				$sqlQuery .= " '".  $mysqli->real_escape_string($_POST['HTMLCODE'])   ."', ";
			}

			if($_POST['takefromAr'] == "editorAr"){
				$sqlQuery .= " '<div style=\"all: unset;width: 100%;direction: rtl;\">".  $mysqli->real_escape_string($_POST['contentAr'])   ."</div>', ";
			}elseif($_POST['takefromAr'] == "codeAr"){
				$sqlQuery .= " '".  $mysqli->real_escape_string($_POST['HTMLCODEAr'])   ."', ";
			}

			if($_POST['takefromCh'] == "editorCh"){
				$sqlQuery .= " '<div style=\"all: unset;width: 100%;\">".  $mysqli->real_escape_string($_POST['contentCh'])   ."</div>' ";
			}elseif($_POST['takefromCh'] == "codeCh"){
				$sqlQuery .= " '".  $mysqli->real_escape_string($_POST['HTMLCODECh'])   ."' ";
			}


			$sqlQuery .= ")" ;

			$result = $mysqli->query($sqlQuery);
			echo mysqli_error($mysqli);
		}
		header('Location: index.php?method=setPart&status=success');
	}

	static public function setContent    () {
		if($_POST['page']!= ""){
			$db  = Database::getInstance();
			$mysqli = $db->getConnection();

			$sqlQuery = "INSERT INTO content ";

			$sqlQuery .= "(" ;
			$sqlQuery .= " `version` " ;
			$sqlQuery .= ",`pageid`  " ;
			$sqlQuery .= ", content  " ;
			$sqlQuery .= ", contentAr" ;
			$sqlQuery .= ", contentCh" ;
			$sqlQuery .= ")" ;
			
			$sqlQuery .= " VALUES ";

			$sqlQuery .= "(" ;
			$sqlQuery .= "  1.00,  ";
			$sqlQuery .= "  ".  $_POST['page']      .",  ";
			$sqlQuery .= " '".  $mysqli->real_escape_string($_POST['content'])   ."', ";
			$sqlQuery .= " '".  $mysqli->real_escape_string($_POST['contentAr']) ."', ";
			$sqlQuery .= " '".  $mysqli->real_escape_string($_POST['contentCh']) ."'  ";
			$sqlQuery .= ")" ;

			$result = $mysqli->query($sqlQuery);
			echo mysqli_error($mysqli);

			self::hadcontent('1.00', $_POST['page']);
		}
		header('Location: index.php?method=setContent&status=success');
	}

	static public function hadcontent    ($version, $ID) {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();

		$sqlQuery = "UPDATE pages SET ";
		$sqlQuery .= " hascontent = " . $version;
		$sqlQuery .= " WHERE ID = " . $ID;
		
		$result = $mysqli->query($sqlQuery);
		echo mysqli_error($mysqli);
	}

	static public function setLocale     () {
		if($_POST['key']!= ""){
			$db  = Database::getInstance();
			$mysqli = $db->getConnection();

			$sqlQuery = "INSERT INTO locale ";

			$sqlQuery .= "(" ;
			$sqlQuery .= " `key` " ;
			$sqlQuery .= ", `value` " ;
			$sqlQuery .= ", valueAr " ;
			$sqlQuery .= ", valueCh " ;
			$sqlQuery .= ", deleted " ;
			$sqlQuery .= ")" ;
			
			$sqlQuery .= " VALUES ";

			$sqlQuery .= "(" ;
			$sqlQuery .= " '".  $_POST['key']     ."', ";
			$sqlQuery .= " '".  $_POST['value']   ."', ";
			$sqlQuery .= " '".  $_POST['valueAr'] ."', ";
			$sqlQuery .= " '".  $_POST['valueCh'] ."', ";
			$sqlQuery .= " 0";
			$sqlQuery .= ")" ;

			$result = $mysqli->query($sqlQuery);
			echo mysqli_error($mysqli);
		}
		header('Location: index.php?method=setLocale&status=success');
	}
	
	static public function setPage    () {

		if($_POST['url']!= ""){
			$db  = Database::getInstance();
			$mysqli = $db->getConnection();

			$sqlQuery = "INSERT INTO pages ";

			$sqlQuery .= "(" ;
			$sqlQuery .= "  Name   ";
			$sqlQuery .= ", NameAr ";
			$sqlQuery .= ", NameCh ";
			$sqlQuery .= ", url ";
			$sqlQuery .= ", OrderID ";
			$sqlQuery .= ", Available ";
			$sqlQuery .= ", hascontent ";
			$sqlQuery .= ", parent ";
			$sqlQuery .= ")" ;

			$sqlQuery .= " VALUES ";

			$sqlQuery .= "(" ;
			$sqlQuery .= "  '".  $_POST['name']   ."'";
			$sqlQuery .= ", '".  $_POST['nameAr'] ."'";
			$sqlQuery .= ", '".  $_POST['nameCh'] ."'";
			$sqlQuery .= ", '".  $_POST['url'] ."'";
			$sqlQuery .= ", 0";
			$sqlQuery .= ", 1";
			$sqlQuery .= ", 1.00";
			$sqlQuery .= ", 0";
			$sqlQuery .= ")" ;

			$result = $mysqli->query($sqlQuery);
			echo mysqli_error($mysqli);
		}
		header('Location: index.php?method=setPage&status=success');
	}
	
	static public function setCategory    () {
		if($_POST['name']!= ""){
			$db  = Database::getInstance();
			$mysqli = $db->getConnection();

			$sqlQuery = "INSERT INTO category ";

			$sqlQuery .= "(" ;
			$sqlQuery .= "  Name   ";
			$sqlQuery .= ", NameAr ";
			$sqlQuery .= ", NameCh ";
			$sqlQuery .= ", image  ";
			$sqlQuery .= ")" ;

			$sqlQuery .= " VALUES ";

			$sqlQuery .= "(" ;
			$sqlQuery .= "  '".  $_POST['name']  ."'";
			$sqlQuery .= ", '".  $_POST['nameAr']."'";
			$sqlQuery .= ", '".  $_POST['nameCh']."'";
			$sqlQuery .= ", '".  $_POST['url']   ."'";
			$sqlQuery .= ")" ;

			$result = $mysqli->query($sqlQuery);
			echo mysqli_error($mysqli);
		}
		header('Location: index.php?method=setCategory&status=success');
	}

	static public function setSubCategory () {
		if(($_POST['category']!= 0) || ($_POST['name']!= "")){
			$db  = Database::getInstance();
			$mysqli = $db->getConnection();

			$sqlQuery  = "INSERT INTO subcategory ";

			$sqlQuery .= "(" ;
			$sqlQuery .= "  catID  " ;
			$sqlQuery .= ", code   ";
			$sqlQuery .= ", Name   ";
			$sqlQuery .= ", NameAr ";
			$sqlQuery .= ", NameCh ";
			$sqlQuery .= ", image ";
			$sqlQuery .= ", price ";
			$sqlQuery .= ", qun ";
			$sqlQuery .= ", onsale ";
			$sqlQuery .= ", discount ";
			$sqlQuery .= ")" ;

			$sqlQuery .= " VALUES ";

			$sqlQuery .= "(" ;
			$sqlQuery .= "  "   . $_POST['category']     ;
			$sqlQuery .= ", '"  . $_POST['code']   . "'" ;
			$sqlQuery .= ", '"  . $_POST['name']   . "'" ;
			$sqlQuery .= ", '"  . $_POST['nameAr'] . "'" ;
			$sqlQuery .= ", '"  . $_POST['nameCh'] . "'" ;
			$sqlQuery .= ", '"  . $_POST['url'] . "'" ;
			$sqlQuery .= ", '"  . $_POST['price'] . "'" ;
			$sqlQuery .= ", '"  . $_POST['qun'] . "'" ;

			if( isset($_POST['onsale']) ){
				$sqlQuery .= ", 1" ;
			}else{
				$sqlQuery .= ", 0" ;
			}

			$sqlQuery .= ", '"  . $_POST['discount'] . "'" ;
			$sqlQuery .= ")" ;

			$result = $mysqli->query($sqlQuery);
			echo mysqli_error($mysqli);
		}
		return $mysqli->insert_id;
	}

	static public function setCatPropertyValue ($sub, $prop, $val, $checkcheck) {
		if($sub != "" || $prop != "" || $val != ""){
			$db  = Database::getInstance();
			$mysqli = $db->getConnection();

			$sqlQuery  = "INSERT INTO catproperty ";
			$sqlQuery .= "(" ;
			$sqlQuery .= "  catID " ;
			$sqlQuery .= ", categoryID " ;
			$sqlQuery .= ", propertyID " ;
			$sqlQuery .= ", valueID "    ;
			$sqlQuery .= ", showquick " ;
			$sqlQuery .= ")" ;

			$sqlQuery .= " VALUES ";

			$sqlQuery .= "(" ;
			$sqlQuery .= "  "    . $_POST['category'];
			$sqlQuery .= ", "    . $sub        ;
			$sqlQuery .= ", "    . $prop       ;
			$sqlQuery .= ", "    . $val ;
			$sqlQuery .= ", "    . $checkcheck ;
			$sqlQuery .= ")" ;

			$result = $mysqli->query($sqlQuery);
			echo mysqli_error($mysqli);
		}
	}

	static public function setProperty    () {
		if($_POST['name'] != ""){
			$db  = Database::getInstance();
			$mysqli = $db->getConnection();

			$sqlQuery = "INSERT INTO property ";
			if($_POST['name-key'] == 0){
				$sqlQuery .= "(" ;
				$sqlQuery .= "  Name " ;
				$sqlQuery .= ", NameAr ";
				$sqlQuery .= ", NameCh ";
				$sqlQuery .= ", image ";
				$sqlQuery .= ", filterable ";
				$sqlQuery .= ")" ;

				$sqlQuery .= " VALUES ";

				$sqlQuery .= "(" ;
				$sqlQuery .= "  '" . $_POST['name']   ."'";
				$sqlQuery .= ", '" . $_POST['nameAr'] ."'";
				$sqlQuery .= ", '" . $_POST['nameCh'] ."'";
				$sqlQuery .= ", '" . $_POST['url'] ."'";
				if( isset( $_POST['filterable'] ) ){
					$sqlQuery .= ", 1";
				}else{
					$sqlQuery .= ", 0";
				}
				$sqlQuery .= ")" ;

				$result = $mysqli->query($sqlQuery);
				echo mysqli_error($mysqli);
				return $mysqli->insert_id;
			} else {
				return $_POST['name-key'];
			}
		}
	}

	static public function setValue () {
		if($_POST['value'] != ""){
			$id = self::setProperty();
			$db  = Database::getInstance();
			$mysqli = $db->getConnection();

			$sqlQuery  = "INSERT INTO value ";
			
			$sqlQuery .= "(" ;
			$sqlQuery .= "  `value` ";
			$sqlQuery .= ", valueAr ";
			$sqlQuery .= ", valueCh ";
			$sqlQuery .= ", propertyID ";
			$sqlQuery .= ")" ;

			$sqlQuery .= " VALUES ";

			$sqlQuery .= "(" ;
			$sqlQuery .= "  '". $_POST['value']     . "'" ;
			$sqlQuery .= ", '". $_POST['valueAr'] . "'" ;
			$sqlQuery .= ", '". $_POST['valueCh'] . "'" ;
			$sqlQuery .= ", ". $id . "" ;
			$sqlQuery .= ")" ;

			$result = $mysqli->query($sqlQuery);
			echo mysqli_error($mysqli);
		}
		header('Location: index.php?method=setProperty&status=success');
	}

	static public function setCatProperty () {
		if($_POST['category'] != ""){
			$id = self::setProperty();
			$db  = Database::getInstance();
			$mysqli = $db->getConnection();

			$sqlQuery  = "INSERT INTO catproperty ";

			$sqlQuery .= "(" ;
			$sqlQuery .= "  catID  ";
			$sqlQuery .= ", categoryID  ";
			$sqlQuery .= ", propertyID  ";
			$sqlQuery .= ", valueID     ";
			$sqlQuery .= ", filterbyme  ";
			$sqlQuery .= ")" ;

			$sqlQuery .= " VALUES ";

			$sqlQuery .= "(" ;
			$sqlQuery .= "  ". $_POST['category'] ;
			$sqlQuery .= ", ". $_POST['category'] ;
			$sqlQuery .= ", ". $id ;
			$sqlQuery .= ", ". $id ;
			$sqlQuery .= ", ". $_POST['filterable'] ;
			$sqlQuery .= ")" ;

			$result = $mysqli->query($sqlQuery);
			echo mysqli_error($mysqli);
		}
		header('Location: index.php?method=setProperty&status=success');
	}

	static public function analyzePage     ($fun) {
		$i = 0;
		foreach ($_POST['pagenum'] as $key => $value) {
			$ison = 0;
			if( isset( $_POST['visibility'][$key] ) ){
				$ison = 1;
			}else{
				$ison = 0;
			}
			self::{$fun}($i, $ison, $_POST['pagenum'][$key]);
			$i++;
		}
		header('Location: index.php?method='.$fun.'&status=success');
	}


	static public function manageNavOrder ($order, $avail, $id) {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();

		$sqlQuery = "UPDATE `pages` set OrderID = ". $order;
		$sqlQuery .= ", Available = ". $avail;
		$sqlQuery .= " WHERE ID = ". $id;
		$result = $mysqli->query($sqlQuery);	
	}

	static public function manageProductsOrder ($order, $avail, $id) {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();

		$sqlQuery = "UPDATE `subcategory` set ordering = ". $order;
		$sqlQuery .= " WHERE ID = ". $id;
		$result = $mysqli->query($sqlQuery);	
	}

	static public function managePages ($order, $avail, $id) {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();

		$sqlQuery = "Insert into `composepage` (pageid, orderid, partid) VALUES(".$_POST['page'].", ".$order.", ".$id.") ";
		$result = $mysqli->query($sqlQuery);	
		echo mysqli_error($mysqli);
	}

	static public function delPageComposition ($id) {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();

		$sqlQuery = "Delete FROM `composepage` WHERE pageid = ".$id." ";
		$result = $mysqli->query($sqlQuery);	
		echo mysqli_error($mysqli);
	}

	static public function getCategory    () {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		$res = [];
		$sqlQuery = "SELECT * FROM category ";
		if ($result = $mysqli->query($sqlQuery)) {
			while ($row = $result->fetch_assoc()) {
				array_push($res, $row);
			}
		}
		echo mysqli_error($mysqli);
		return json_encode($res);
	}

	static public function getSubCategory () {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		$res = [];
		$sqlQuery = "SELECT * FROM subcategory ORDER BY ordering";
		if ($result = $mysqli->query($sqlQuery)) {
			while ($row = $result->fetch_assoc()) {
				array_push($res, $row);
			}
		}
		echo mysqli_error($mysqli);
		return json_encode($res);
	}

	static public function getPropertyValue () {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		$res = [];
		$sqlQuery = "SELECT distinct property.Name, value.value, property.ID FROM property 
		left join value on property.ID = value.propertyID";
		if ($result = $mysqli->query($sqlQuery)) {
			while ($row = $result->fetch_assoc()) {
				array_push($res, $row);
			}
		}	
		echo mysqli_error($mysqli);
		return json_encode($res);
	}

	static public function getProperty    () {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		$res = [];
		$sqlQuery = "SELECT property.Name, property.ID FROM property ";
		if ($result = $mysqli->query($sqlQuery)) {
			while ($row = $result->fetch_assoc()) {
				array_push($res, $row);
			}
		}

		$len = self::getValue();

		for ($i=0; $i <= count($len) -1 ; $i++) {
			array_push($res, $len[$i]);
		}
		
		echo mysqli_error($mysqli);
		return json_encode($res);
	}

	static public function getValue        () {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		$res = [];
		$sqlQuery = "SELECT value.value, value.propertyID, value.ID FROM value ";
		if ($result = $mysqli->query($sqlQuery)) {
			while ($row = $result->fetch_assoc()) {
				array_push($res, $row);
			}
		}	
		return $res;
	}

	static public function getValueQ     ($q) {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		$res = [];
		$sqlQuery = "SELECT value.value, value.propertyID, value.ID FROM value WHERE value.propertyID=" . $q;
		if ($result = $mysqli->query($sqlQuery)) {
			while ($row = $result->fetch_assoc()) {
				array_push($res, $row);
			}
		}	
		return json_encode($res);
	}

	static public function getLocale     ($q) {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		$res = [];
		$sqlQuery = "SELECT * FROM locale";
		if($q != ""){
			$sqlQuery .= " WHERE `key`='" . $q . "'";
		}
		if ($result = $mysqli->query($sqlQuery)) {
			while ($row = $result->fetch_assoc()) {
				array_push($res, $row);
			}
		}	
		return json_encode($res);
	}

	static public function getPage         () {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		$res = [];
		$sqlQuery = "SELECT * FROM pages order by OrderID Asc";
		
		if ($result = $mysqli->query($sqlQuery)) {
			while ($row = $result->fetch_assoc()) {
				array_push($res, $row);
			}
		}	
		return json_encode($res);
	}

	static public function getPagePart     () {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		$res = [];
		
		$sqlQuery = "SELECT * FROM `composepage`";
		$sqlQuery .= " INNER JOIN `parts` on composepage.partid = parts.ID";
		$sqlQuery .= " Where `composepage`.`pageid` = " . $_GET['page'];
		
		if ($result = $mysqli->query($sqlQuery)) {
			while ($row = $result->fetch_assoc()) {
				array_push($res, $row);
			}
		}
		
		return json_encode($res);
	}
	static public function getPart         () {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		$res = [];
		if($_GET['page'] == 'all'){
			$sqlQuery = "SELECT * FROM parts";
		}elseif($_GET['page'] == 'null'){
			$sqlQuery = "SELECT * FROM parts Where page = 0";
		}else{
			$sqlQuery = "SELECT * FROM parts Where page = " . $_GET['page'];
		}
		
		if ($result = $mysqli->query($sqlQuery)) {
			while ($row = $result->fetch_assoc()) {
				$rowscape = array("ID"=>$row['ID'],
					"page"=>$row['page'],
					"partid"=>$row['partid'],
					"content"=>addslashes($row['content']),
					"contentAr"=>addslashes($row['contentAr']),
					"contentCh"=>addslashes($row['contentCh']) );
				array_push($res, $rowscape );
			}
		}	
		return json_encode($res);
	}

	static public function uptPart         () {

		$db  = Database::getInstance();
		$mysqli = $db->getConnection();

		$sqlQuery = "Update parts set ";

		if($_POST['takefrom'] == "editor"){
			$sqlQuery .= " content = '".  $mysqli->real_escape_string($_POST['content'])   ."' ";
		}elseif($_POST['takefrom'] == "code"){
			$sqlQuery .= " content = '".  addslashes($_POST['HTMLCODE'])   ."' ";
		}

		if($_POST['takefromAr'] == "editorAr"){
			$sqlQuery .= ", contentAr = '".  $mysqli->real_escape_string($_POST['contentAr'])   ."' ";
		}elseif($_POST['takefromAr'] == "codeAr"){
			$sqlQuery .= ", contentAr = '".  addslashes($_POST['HTMLCODEAr'])   ."' ";
		}

		if($_POST['takefromCh'] == "editorCh"){
			$sqlQuery .= ", contentCh = '".  $mysqli->real_escape_string($_POST['contentCh'])   ."' ";
		}elseif($_POST['takefromCh'] == "codeCh"){
			$sqlQuery .= ", contentCh = '".  addslashes($_POST['HTMLCODECh'])   ."' ";
		}


		$sqlQuery .= " Where ID = " . $_POST['part'];

		$result = $mysqli->query($sqlQuery);
		header('Location: index.php?method=manageParts&status=success');
	}

}
?>