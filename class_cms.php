<?php
require('class_database.php');
if( isset($_GET['method']) ){
	$classname = new ClassName;
	if ( $_GET['method'] == "getCategory"    ) { echo $classname->getCategory   (); }
	if ( $_GET['method'] == "getSubCategory" ) { echo $classname->getSubCategory(); }
	if ( $_GET['method'] == "getProperty"    ) { echo $classname->getProperty   (); }
	if ( $_GET['method'] == "getValue"       ) { echo $classname->getValueQ     ($_GET['ID']); }
	if ( $_GET['method'] == "getLocale"      ) { echo $classname->getLocale     ($_GET['q']);  }

	if ( $_GET['method'] == "setCategory"    ) { echo $classname->setCategory   (); }
	if ( $_GET['method'] == "setSubCategory" ) { 
		$sub = $classname->setSubCategory();
		foreach ($_POST['property'] as $key => $value) {
			if(isset($_POST['filterable'][$key])){
				$_POST['filterable'][$key] = 1;
			}else{
				$_POST['filterable'][$key] = 0;
			}
			$classname->setCatPropertyValue($sub, $value, $_POST['value'][$key], $_POST['filterable'][$key]);
		}
		header('Location: index.php?method=setSubCategory');
	}
	if ( $_GET['method'] == "setProperty"    ) { echo $classname->setValue      (); }
	if ( $_GET['method'] == "setLocale"      ) { echo $classname->setLocale     (); }
}

class ClassName {

	static public function setLocale     () {
		var_dump($_POST);
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

			var_dump($sqlQuery);

			$result = $mysqli->query($sqlQuery);
			echo mysqli_error($mysqli);
		}
		header('Location: index.php?method=setLocale');
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
		header('Location: index.php?method=setCategory');
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
			$sqlQuery .= ")" ;

			$sqlQuery .= " VALUES ";

			$sqlQuery .= "(" ;
			$sqlQuery .= "  "   . $_POST['category']     ;
			$sqlQuery .= ", '"  . $_POST['code']   . "'" ;
			$sqlQuery .= ", '"  . $_POST['name']   . "'" ;
			$sqlQuery .= ", '"  . $_POST['nameAr'] . "'" ;
			$sqlQuery .= ", '"  . $_POST['nameCh'] . "'" ;
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
			$sqlQuery .= "  categoryID " ;
			$sqlQuery .= ", propertyID " ;
			$sqlQuery .= ", valueID "    ;
			$sqlQuery .= ")" ;

			$sqlQuery .= " VALUES ";

			$sqlQuery .= "(" ;
			$sqlQuery .= "  "    . $sub        ;
			$sqlQuery .= ", "    . $prop       ;
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
				$sqlQuery .= ")" ;

				$sqlQuery .= " VALUES ";

				$sqlQuery .= "(" ;
				$sqlQuery .= "  '" . $_POST['name']   ."'";
				$sqlQuery .= ", '" . $_POST['nameAr'] ."'";
				$sqlQuery .= ", '" . $_POST['nameCh'] ."'";
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
		header('Location: index.php?method=setProperty');
	}

	static public function setCatProperty () {
		if($_POST['category'] != ""){
			$id = self::setProperty();
			$db  = Database::getInstance();
			$mysqli = $db->getConnection();

			$sqlQuery  = "INSERT INTO catproperty ";

			$sqlQuery .= "(" ;
			$sqlQuery .= "  categoryID  ";
			$sqlQuery .= ", propertyID  ";
			$sqlQuery .= ", valueID     ";
			$sqlQuery .= ", filterbyme  ";
			$sqlQuery .= ")" ;

			$sqlQuery .= " VALUES ";

			$sqlQuery .= "(" ;
			$sqlQuery .= "  ". $_POST['category'] ;
			$sqlQuery .= ", ". $id ;
			$sqlQuery .= ", ". $id ;
			$sqlQuery .= ", ". $_POST['filterable'] ;
			$sqlQuery .= ")" ;

			$result = $mysqli->query($sqlQuery);
			echo mysqli_error($mysqli);
		}
		header('Location: index.php?method=setProperty');
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
		$sqlQuery = "SELECT * FROM subcategory ";
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

}
?>