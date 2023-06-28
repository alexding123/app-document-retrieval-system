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
