<?php
include("dbc.php");

	$name=$_POST['name'];
	$information=$_POST['information'];

	if ($name && $information){
	
		$sql="insert into user(name,information) values('$name','$information')"; 

		$res = mysql_query($sql);

			if($res){
					header('Location:success.html');
					}else{
					header("refresh:2;url=index.html");
					echo "		
						 <!DOCTYPE html>
						 <html>
						 <head>
						 <meta charset='utf-8'>
						 <title>邀请函</title>
						 </head>
						 <body>
						 <p>报名失败...2秒后自动返回</p>
						 </body>
						 </html>";

					}
							  }
							else 
								{
								echo "
								<!DOCTYPE html>
								<html>
								<head>
								<meta charset='utf-8'>
								<title>邀请函</title>
								</head>
								<script language='javascript'>alert('信息未填完整!');history.back();</script>
								<body>
								</body>
								</html>";
								}
?>


