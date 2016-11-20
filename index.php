<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<title>CMS</title>
</head>
<body>
	<div id="nav">
		<a href="?method=setCategory">Add category</a> - 
		<a href="?method=setProperty">Add property</a> - 
		<a href="?method=setSubCategory">Add sub-category</a>
	</div>

	<form action="class_cms.php" method="post" enctype="multipart/form-data" name="view"  autocomplete="off">
		<div id="view">
		</div>
		<br> <input type="submit">
	</form>
	<input type="hidden" id="hidden" value="0">
	<script type="text/javascript" src="jquery_min.js"></script>
	<script type="text/javascript" src="components.js"></script>
	<script type="text/javascript" src="cms.js"       ></script>
</body>
</html>