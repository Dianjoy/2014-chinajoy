<?php  
$page=$_GET['page'];  
include("dbc.php");
?>
<!DOCTYPE html>
<html lang="zh-cn">
  <meta charset="utf-8">

  <head>

    <title>客户信息管理</title>
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/usertable.css" rel="stylesheet">
  </head>

  <body>

    <div class="container" style="width:500px">
		<div class="panel panel-primary">
			<div class="panel-heading">客户信息管理</div>

				<table class="table table-hover table-bordered">
				<tr class="primary">
				<td style="width:56px">序号</td>
				<td style="width:75px">姓名</td>
				<td>公司&职务</td>
				</tr>

				<?php

					$sql="select * from user;"; 
					$pagesize=12;  
					$result=mysql_query($sql); 
					$row=mysql_fetch_row($result); 
					$rows=mysql_num_rows($result); 
					
					if($rows%$pagesize==0)  
						$total=(int)($rows/$pagesize); 
					else   
						$total=(int)($rows/$pagesize)+1; 
					
					if(isset($_GET['page'])) 
						$page=(int)($_GET['page']); 
					else  
						$page=1;
					
					$start=($page-1)*$pagesize;  
					$sql="select * from user limit $start,$pagesize "; 
					$result=mysql_query($sql);  
					$row=mysql_fetch_row($result); 
					
					while($row){  
									echo 
										"
										<tr>
										<td>$row[0]</td>
										<td>$row[1]</td>
										<td>$row[2]</td>  
										</tr>
										"; 
									$row=mysql_fetch_row($result); 
								}  
				?>
				</table>
			</div>
			<div style="text-align:center">
				<ul class="pagination">
				<li>
			<?php
				echo "<a href=information.php?page=1>&laquo;</a>"; 
			?>
				</li>
			<?php
				if($page==1){
			?>
				<li>
			<?php
					echo "<a href='#'>$page</a>"; 
			?>
				</li>
			<?php
			}
				if($page>1){  
					$prev=$page-1; 
			?>
				<li>
			<?php
					echo "<a href=information.php?page=$prev>前一页</a>"; 
			?>
				</li>
				<li>
			<?php
					echo "<a href='#'>$page</a>"; 
			?>
				</li>
			<?php
  
							}  
				if($page<$total){ 
					$next=$page+1; 
			?>
				<li>
			<?php
					echo "<a href=information.php?page=$next>下一页</a>"; 
			?>
				</li>
				<li>
			<?php
					echo "<a href=information.php?page=$total>&raquo;</a>"; 
							}  

			?>
				</li>
				</ul>
			</div>
    </div>
  </body>
</html>
