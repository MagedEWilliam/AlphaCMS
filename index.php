<?php
if(!isset($_SESSION)) 
{ 
  session_start(); 
} 
if(!isset($_SESSION['CMS']['username']) ){
  header( "Location: login.php" );
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<link rel="icon" type="image/png" href="favicon.png" />
	<title>CMS</title>
	
	<link rel="stylesheet" type="text/css" href="style.css">
	<!-- <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css"> -->
	<link rel="stylesheet" type="text/css" href="semantic/semantic.min.css">
	<link rel="stylesheet" type="text/css" href="typeahead.css">
	<!-- 	<link rel="stylesheet" type="text/css" href="summernote-master/dist/summernote.css"> -->
	<script type="text/javascript" src="jquery_min.js"></script>
	<script type="text/javascript" src="sortabe/jquery-ui.min.js"></script>
	<!-- <script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script> -->
	<script type="text/javascript" src="semantic/semantic.min.js"></script>
	<script type="text/javascript" src="typeahead.bundle.js"></script>
	<script type="text/javascript" src="tinymce/tinymce.min.js"></script>

</head>
<body style="overflow-y: scroll;">

	<div class="ui container">

		<nav class="ui menu top fixed">

			<div class="ui container">
				<a class="item" href="/">ALPHA CMS</a>

				<div class="ui dropdown link item">
					<span class="text">Add</span>
					<i class="dropdown icon"></i>
					<div class="menu">
						<a class="item" href="?method=setCategory">	  category        </a>
						<a class="item" href="?method=setProperty">	  properties      </a>
						<a class="item" href="?method=setSubCategory"> items          </a>
						<div class="ui divider"></div>
						<a class="item" href="?method=setLocale">	  locale          </a>
						<div class="ui divider"></div>
						<a class="item" href="?method=setPage">		  Pages           </a>
						<a class="item" href="?method=setPart">		  Part            </a>
						<!-- <a class="item" href="?method=setContent">  Write content      </a> -->
					</div>
				</div>


				<div class="ui dropdown link item">

					<span class="text">Manage</span>
					<i class="dropdown icon"></i>
					<div class="menu">
						<a class="item" href="?method=manageNavOrder">Nav Order</a>
						<a class="item" href="?method=manageProductsOrder">Products Order</a>
						<div class="ui divider"></div>
						<a class="item" href="?method=managePages">Pages</a>
					</div>
				</div>


				<div class="ui dropdown link item">

					<span class="text">Edit</span>
					<i class="dropdown icon"></i>
					<div class="menu">
						<a class="item" href="?method=manageParts">Parts</a>
					</div>
				</div>

				<a class="ui link item ordernav" href="#"><span class="text">Order(0)</span></a>

				<a class="ui link right item" href="logout.php"><span class="text"><i class="ui icon lock"></i>Logout</span></a>

			</div>

		</nav>
		<br>
		<br>
		<br>
		<form action="class_cms.php" method="post" enctype="multipart/form-data" name="view" class="ui form grid" autocomplete="off">
			
			<div id="message" style="width: 100%" class="ui hidden message"></div>
			
			<div class="sixteen wide column ui grid">
				<div id="view" class="seven wide column">
				</div>
				<div id="rightview" class="eight wide column">
				</div>
			</div>
			<div class="sixteen wide column ui grid">
				<div class="eight wide column" id="foot">

				</div>
			</div>
		</form>
		<br>
		<br>

	</div>
	<input type="hidden" id="hidden" value="0">
	<script>
		$('.dropdown').dropdown();
	</script>
	<script src="order.js"             ></script>
	<script src="components.js"        ></script>
	<script src="components_manage.js" ></script>
	<script src="components_edit.js"   ></script>
	<script src="cardPreview.js"       ></script>
	<script src="setup.js"             ></script>
	<script src="cms.js"               ></script>
</body>
</html>