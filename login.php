<?php 
header("Content-Type: text/html; charset=UTF-8");
if(!isset($_SESSION)) 
{ 
  session_start(); 
} 
$my_username = null;
if(isset($_SESSION['username']) ){
  header( "Location: index.php" );
}

function trytologin(){
  $msg = '';

  if (!empty($_POST['username']) && !empty($_POST['password'])) {

   if ($_POST['username'] == 'Admin' && $_POST['password'] == 'mnopQ123 ') {

    $_SESSION['valid'] = true;
    $_SESSION['timeout'] = time();
    $_SESSION['username'] = 'Admin';

    echo '<div class="ui success visible message">You have entered valid use name and password</div>';
    header('Location: index.php');
    }else {
      echo '<div class="ui error visible message">Wrong username or password</div>';
    }
 }
 
}
?>
<!DOCTYPE html>
<html>
<head>
  <!-- Standard Meta -->
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <link rel="icon" type="image/png" href="favicon.png" />

  <!-- Site Properities -->
  <title>::LOGIN::</title>

  <link rel="stylesheet" type="text/css" href="semantic/semantic.min.css">
  <script type="text/javascript" src="jquery_min.js"></script>
  <script type="text/javascript" src="semantic/semantic.min.js"></script>

  <script src="Login.js"></script>

  <style type="text/css">
    body {
      background-color: #f0f0f0;
    }
    body > .grid {
      height: 100%;
    }
    .image {
      margin-top: -100px;
    }
    .column {
      max-width: 450px;
    }

  </style>

</head>
<body>

  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui image header">
        <img src="favicon.png" class="image">
        <div class="content" >
          ALPHA's CMS:
        </div>
      </h2>
      <form class="ui large form"
      id="log"
      data-ajax="true"
      action="Login.php"
      method="post">

      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text"
            placeholder="Username"
            name="username"
            id="username"
            tabindex="1" autofocus>
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password"
            placeholder="Password" 
            name="password"
            id="password"
            autocomplete="off"
            tabindex="2">
          </div>
        </div>
        <div class="ui fluid large submit button"
        tabindex="3">Login</div>
      </div>


      <div class="ui negative message hidden" id="msg_error">
        <ul class="list">
          <li>Something is wrong, please try again.</li>
        </ul>
      </div>
      <?php
      if(isset($_POST)){
        trytologin();
      }
      ?>
    </form>
  </div>
</div>

</body>

</html>
