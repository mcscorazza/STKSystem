<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/text; charset=UTF-8");
    
    include_once '../config/DB.php';
    include_once '../class/product.php';
    $database = new Database();
    $db = $database->getConnection();
    $items = new Product($db);
    $stmt = $items->getSKU('E01PE');
    $itemCount = $stmt->rowCount();
    if($itemCount > 0){
        $max = $stmt->fetch(PDO::FETCH_ASSOC);
        echo (int)$max['maximo'];
    } else {
        echo 0;
    }
?>