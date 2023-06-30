<?php
$folderPath = 'G:/ceshi'; // 指定文件夹路径

// 使用 scandir 函数获取文件列表
$files = scandir($folderPath);

// 过滤掉 . 和 .. 目录
$files = array_diff($files, array('.', '..'));

// 将文件列表转换为 JSON 字符串
$filesJson = json_encode($files);

// 输出 JSON 字符串
header('Content-Type: application/json');
echo $filesJson;
?>