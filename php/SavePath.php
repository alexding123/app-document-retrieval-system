<?php
    session_start();

    
    include("conn.php");
    include("function.php");

    
    $code=0;
	$data=[];
	$msg=["记录失败","记录成功"];//提示信息
    $id=time();

    $folderPath=$_GET["folderPath"];
    $Path=$_GET["Path"];
    $id=$_GET["i"];
    
    for($i=0;$i<$Path.length;$i++){
        $sql="INSERT INTO `Path`(`ID`, `Content`, IID) VALUES (?,?,?)";
        $stmt=mysqli_prepare($conn,$sql);
        mysqli_stmt_bind_param($stmt,"isi",$id,$Path[i],$i);
        mysqli_stmt_execute($stmt);
        if(mysqli_stmt_affected_rows($stmt)>0){
            $code=1;
        }
    }
    $sql="INSERT INTO `folderPath`(`ID`, `Content`) VALUES (?,?)";
    $stmt=mysqli_prepare($conn,$sql);
    mysqli_stmt_bind_param($stmt,"isi",$id,$folderPath);
    mysqli_stmt_execute($stmt);
    if(mysqli_stmt_affected_rows($stmt)<=0){
        $code=0;
    }
    $_SESSION["id"]=$id;
    mysqli_close($conn);
    getApiResult($code, $msg[$code],$data);
?>
