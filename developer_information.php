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
	<div class="container" style="width:470px">
		<div class="panel panel-success">
			<div class="panel-heading">开发者报名信息统计</div>

				<table class="table table-hover table-bordered">
				<tr class="success">
				<td style="width:90px">姓名</td>
				<td>公司&职务</td>
				</tr>
				<?php
					if (!file_exists("developer_information.csv")){
						echo "<tr><td>无</td><td>无</td></tr>";
					} else {
						$myfile = fopen("developer_information.csv", "r");
						echo fread($myfile,filesize("developer_information.csv"));
						fclose($myfile);

						$myfile = fopen("developer_information.csv", "r");
						$info = fread($myfile,filesize("developer_information.csv"));
						fclose($myfile);

						$table = fopen("developer_table.csv","w");
						$str1 = str_ireplace("</td></tr><tr><td>", "\r\n", $info);
						$str2 = str_ireplace("</td><td>",",",$str1);
						$str3 = str_ireplace("<tr><td>", "", $str2);
						$str4 = str_ireplace("</td></tr>", "", $str3);
						$str4 = iconv("utf-8", "gb2312", $str4);
						fwrite($table, $str4);
						fclose($table);
					}
				?>
				</table>
			</div>
		</div>
		<div style="text-align:center">
			<button type="button" class="btn  btn-success" onclick="location.href='http://www.dianjoy.com/2014cj/developer_table.csv'">下载统计表</button>
		</div>
	</div>
</body>
</html>