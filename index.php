<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<title>CMS</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="typeahead.css">
	<script type="text/javascript" src="jquery_min.js"></script>
	<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="typeahead.bundle.js"></script>
</head>
<body style="overflow-y: scroll;">

	<div class="container">

		<nav class="navbar navbar-default navbar-fixed-top">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">ALPHA CMS</a>
				</div>
				<div id="navbar" class="navbar-collapse collapse " aria-expanded="false">
					<ul class="nav navbar-nav">
						<li><a href="?method=setCategory">Add category</a></li>
						<li><a href="?method=setProperty">Add properties</a></li>
						<li><a href="?method=setSubCategory">Add items</a></li>
						<li><a href="?method=setLocale">Add locale</a></li>
					</ul>

				</div><!--/.nav-collapse -->
			</div>
		</nav>

		<form action="class_cms.php" method="post" enctype="multipart/form-data" name="view"  autocomplete="off">
			<div class="row">
				<div id="view" class="col-sm-5">
				</div>
				<div id="rightview" class="col-sm-7">
				</div>
			</div>
			<div class="row">
				<div class="col-sm-5" id="foot">
					<input class="form-control" type="submit">
				</div>
			</div>
		</form>
		<br>
		<br>
	</div>
	<input type="hidden" id="hidden" value="0">
	<script type="text/javascript" src="components.js"></script>
	<script type="text/javascript" src="cms.js"       ></script>
</body>
</html>