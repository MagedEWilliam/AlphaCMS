<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
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
						<a class="item" href="?method=setSubCategory"> items           </a>
						<a class="item" href="?method=setLocale">	  locale          </a>
						<a class="item" href="?method=setPage">		  Pages           </a>
						<a class="item" href="?method=setContent">  Write content      </a>
					</div>
				</div>


				<div class="ui dropdown link item">

					<span class="text">Manage</span>
					<i class="dropdown icon"></i>
					<div class="menu">
						<a class="item" href="?method=managePage">Pages</a>
					</div>
				</div>


				<div class="ui dropdown link item">

					<span class="text">Edit</span>
					<i class="dropdown icon"></i>
					<div class="menu">
						<a class="item" href="?method=editSubCategory">Pages</a>
					</div>
				</div>


			</div>

		</nav>
<br>
<br>
<br>
		<form action="class_cms.php" method="post" enctype="multipart/form-data" name="view" class="ui form grid" autocomplete="off">
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
	<script id="scripto" type="text/javascript" src="<?php 
	if(isset($_GET['method'])){
		$urlpar = $_GET['method'];
		$isset = $urlpar[0] . $urlpar[1] . $urlpar[2];
		if($isset == 'set'){ echo 'components.js'; }
		elseif($isset == 'edit'){ echo 'components_edit.js'; }
		elseif($isset == 'man'){ echo 'components_manage.js'; }
	} ?>"></script>
	<script>
		$('.dropdown').dropdown();
	</script>
	<script type="text/javascript" src="cms.js"       ></script>
	<script type="text/javascript" src="setup.js"></script>
</body>
</html>