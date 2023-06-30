<?php

    $Path="getFilePath.py";
    $command = "python {$Path}";
    $data = shell_exec($command);
    
    echo $data;

?>