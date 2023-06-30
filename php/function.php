<?php


function getApiResult($code,$msg,$data){
    $arrs=[];
    $arrs[0]["code"]=$code;
    $arrs[0]["msg"]=$msg;
    $arrs[0]["data"]=$data;
    echo json_encode($arrs,JSON_UNESCAPED_UNICODE);

}
?>