<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>开发者报名信息统计</title>
<link rel="shortcut icon" type="image/png" href="http://www.dianjoy.com/wp-content/themes/dian2013/img/logo.png">
<link href="css/bootstrap.css" rel="stylesheet">
<link href="css/usertable.css" rel="stylesheet">
</head>
<body>
	<div class="container" style="width:450px">
		<div class="panel panel-primary">
			<div class="panel-heading">开发者报名信息统计</div>

				<table class="table table-hover table-bordered">
				<tr class="primary">
				<td style="width:75px">姓名</td>
				<td>公司&职务</td>
				</tr>
				<?php
				$myfile = fopen("developer_information.csv", "r") or die("Unable to open file!");
				echo fread($myfile,filesize("developer_information.csv"));
				fclose($myfile);
				?>
				</table>
			</div>
		</div>
	</div>
</body>
</html>