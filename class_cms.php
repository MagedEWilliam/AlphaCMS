<?php
require('class_database.php');
if( isset($_GET['method']) ){
	$classname = new ClassName;
	if ( $_GET['method'] == "getCategory"    ) { echo $classname->getCategory   (); }
	if ( $_GET['method'] == "getSubCategory" ) { echo $classname->getSubCategory(); }
	if ( $_GET['method'] == "getProperty"    ) { echo $classname->getProperty   (); }

	if ( $_GET['method'] == "setCategory"    ) { echo $classname->setCategory   (); }
	if ( $_GET['method'] == "setSubCategory" ) { 

		$sub = $classname->setSubCategory();
		for ($i=0; $i <= count($_POST['property'])-1; $i++) { 
			$classname->setCatPropertyValue($sub, $_POST['property'][$i], $_POST['value'][$i]);
		}
		header('Location: index.php?method=setSubCategory');
	}
	if ( $_GET['method'] == "setProperty"    ) { echo $classname->setValue      (); }
}

class ClassName {
	
	static public function setCategory    () {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		
		$sqlQuery = "INSERT INTO category SET";
		$sqlQuery .= "  Name = '". $_POST['name']."'";
		$sqlQuery .= ", image = '". $_POST['image']."'";
		$result = $mysqli->query($sqlQuery);
		echo mysqli_error($mysqli);
		header('Location: index.php?method=setCategory');
	}

	static public function setSubCategory () {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		
		$sqlQuery  = "INSERT INTO subcategory SET";
		$sqlQuery .= "  catID = "   . $_POST['category']   ;
		$sqlQuery .= ", Name  = '"  . $_POST['name'] . "'" ;

		$result = $mysqli->query($sqlQuery);
		echo mysqli_error($mysqli);
		return $mysqli->insert_id;
	}

	static public function setCatPropertyValue ($sub, $prop, $val) {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		
		$sqlQuery  = "INSERT INTO catproperty SET";
		$sqlQuery .= "  categoryID = "    . $sub    ;
		$sqlQuery .= ", propertyID = "    . $prop   ;
		$sqlQuery .= ", valueID = "       . $val    ;

		$result = $mysqli->query($sqlQuery);
		echo mysqli_error($mysqli);
	}

	static public function setProperty    () {
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		
		$sqlQuery = "INSERT INTO property SET";
		if($_POST['property'] == 0){
			$sqlQuery .= "  Name = '" . $_POST['name'] ."'";
			$result = $mysqli->query($sqlQuery);
			echo mysqli_error($mysqli);
			return $mysqli->insert_id;
		}else{
			return $_POST['property'];
		}
		
	}

	static public function setValue () {
		$id = self::setProperty();
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		
		$sqlQuery  = "INSERT INTO value SET";
		$sqlQuery .= "  value = '". $_POST['value'] . "'" ;
		$sqlQuery .= ", propertyID = ". $id . "" ;

		$result = $mysqli->query($sqlQuery);
		echo mysqli_error($mysqli);
		header('Location: index.php?method=setProperty');
	}

	static public function setCatProperty () {
		$id = self::setProperty();
		$db  = Database::getInstance();
		$mysqli = $db->getConnection();
		
		$sqlQuery  = "INSERT INTO catproperty SET";
		$sqlQuery .= "  categoryID = ". $_POST['category'] ;
		$sqlQuery .= ", propertyID = ". $id ;
		$sqlQuery .= ", valueID = ". $id ;

		$result = $mysqli->query($sqlQuery);
		echo mysqli_error($mysqli);
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

}
?>