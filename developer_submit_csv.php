<?php
	$name=$_POST['name'];
	$information=$_POST['information'];

	if ($name && $information){
		$myfile = fopen("developer_information.csv", "a") or die("Unable to open file!");
		$name = "<tr><td>" . $name . "</td>";
		fwrite($myfile, $name);
		$information = "<td>" . $information . "</td></tr>";
		fwrite($myfile, $information);
		fclose($myfile);
					header('Location:success_developer.html');
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


