<?php
   session_start();
   unset($_SESSION['CMS']["username"]);
   unset($_SESSION['CMS']["password"]);
   
   echo 'You have cleaned session';
   header('Location: login.php');
?>