<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include_once '../config/DB.php';
    include_once '../class/product.php';
    $database = new Database();
    $db = $database->getConnection();
    $item = new Product($db);
    $data = json_decode(file_get_contents("php://input"));

    $item->txSKU = $data->txSKU;
    $item->txDescricao = $data->txDescricao;
    $item->FKProdutoEmpresa = $data->FKProdutoEmpresa;
    $item->FKProdutoItem = $data->FKProdutoItem;
    $item->FKProdutoTipo = $data->FKProdutoTipo;
    $item->FKProdutoUnidade = $data->FKProdutoUnidade;
    $item->nmValorUnitario = $data->nmValorUnitario;
    
    if($item->createProduct()){
        json_encode('Product created successfully.');
    } else{
        json_encode('Product NOT created!');
    }
?>