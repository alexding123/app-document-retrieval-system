<?php
$q = isset($_GET["q"]) ? intval($_GET["q"]) : '';
 
$con = mysqli_connect('localhost','root','123456');
if (!$con)
{
    die('Could not connect: ' . mysqli_error($con));
}
// 选择数据库
mysqli_select_db($con,"test");
// 设置编码，防止中文乱码
mysqli_set_charset($con, "utf8");
 
$sql="SELECT * FROM Websites WHERE id = '".$q."'";
 
$result = mysqli_query($con,$sql);
 
echo "<table border='1'>
<tr>
<th>文件名</th>
<th>文件地址</th>
<th>文件内容</th>

</tr>";
 
while($row = mysqli_fetch_array($result))
{
    echo "<tr>";
    echo "<td>" . $row['filename'] . "</td>";
    echo "<td>" . $row['fileaddress'] . "</td>";
    echo "<td>" . $row['file'] . "</td>";
    echo "</tr>";
}
echo "</table>";
 
mysqli_close($con);
?>
if(!empty($_POST['path'])&&!empty($_POST['key'])){

	echo "在路径 ".$_POST['path']."/ 中查找 ".$_POST['key']." 的结果为：<hr/>";
	$file_num = $dir_num = 0;
	$r_file_num = $r_dir_num= 0;
	$findFile = $_POST['key'];

	function delDirAndFile( $dirName ){	
		if ( $handle = @opendir( "$dirName" ) ) {
			while ( false !== ( $item = readdir( $handle ) ) ) {  
				if ( $item != "." && $item != ".." ) {  
					if ( is_dir( "$dirName/$item" ) ) {  
						delDirAndFile( "$dirName/$item" );
					} else {  
						$GLOBALS['file_num']++;
						if(strstr($item,$GLOBALS['findFile'])){
							echo " <span><b> $dirName/$item </b></span><br />\n";
							$GLOBALS['r_file_num']++;
						}
					}
				}
			}

			closedir( $handle );  
			$GLOBALS['dir_num']++;

			if(strstr($dirName,$GLOBALS['findFile'])){
				$loop = explode($GLOBALS['findFile'],$dirName);
				$countArr = count($loop)-1;
				if(empty($loop[$countArr])){
					echo " <span style='color:#297C79;'><b> $dirName </b></span><br />\n";
					$GLOBALS['r_dir_num']++;
				}
			}

		}else{
			die("没有此路径！");
		}
	}

	delDirAndFile($_POST['path']);

	echo "<hr/>本次共搜索到".$file_num."个文件，文件夹".$dir_num."个<br/>";
	echo "<hr/>符合结果的共".$r_file_num."个文件，文件夹".$r_dir_num."个<br/>";

}

?>
