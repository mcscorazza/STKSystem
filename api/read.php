<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../config/DB.php';
    include_once '../class/product.php';
    $database = new Database();
    $db = $database->getConnection();
    $items = new Product($db);
    $stmt = $items->getProducts();
    $itemCount = $stmt->rowCount();

    if($itemCount > 0){
        $produtoArr= array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                "idProduto" => $idProduto,
                "txSKU" => $txSKU,
                "txDescricao" => $txDescricao,
                "FKProdutoEmpresa" => $FKProdutoEmpresa,
                "FKProdutoItem" => $FKProdutoItem,
                "FKProdutoTipo" => $FKProdutoTipo,
                "FKProdutoUnidade" => $FKProdutoUnidade,
                "nmValorUnitario" => $nmValorUnitario
            );
            array_push($produtoArr, $e);
        }
        echo json_encode($produtoArr);
    }
    else{
        http_response_code(404);
        echo json_encode(
            array("message" => "No record found.")
        );
    }
?>