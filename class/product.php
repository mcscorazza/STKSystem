<?php
    class Product{
        // Connection
        private $conn;
        // Table
        private $db_table = "dmProdutos";
        // Columns
        public $idProduto;
        public $txSKU;
        public $txDescricao;
        public $FKProdutoEmpresa;
        public $FKProdutoItem;
        public $FKProdutoTipo;
        public $FKProdutoUnidade;
        public $nmValorUnitario;

        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }
        // GET ALL
        public function getProducts(){
            $sqlQuery = "SELECT idProduto, txSKU, txDescricao, FKProdutoEmpresa, FKProdutoItem, FKProdutoTipo, FKProdutoUnidade, nmValorUnitario FROM " . $this->db_table . " WHERE 1";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        // GET SKU
        public function getSKU($s){
            $sqlQuery = "SELECT MAX(RIGHT(txSKU,3)) AS maximo FROM " . $this->db_table . " WHERE txSKU LIKE '%$s%';";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        // CREATE
        public function createProduct(){
            $sqlQuery = "INSERT INTO
                        ". $this->db_table ."
                    SET
                        txSKU = :txSKU, 
                        txDescricao = :txDescricao, 
                        FKProdutoEmpresa = :FKProdutoEmpresa, 
                        FKProdutoItem = :FKProdutoItem, 
                        FKProdutoTipo = :FKProdutoTipo, 
                        FKProdutoUnidade = :FKProdutoUnidade,
                        nmValorUnitario = :nmValorUnitario";

            $stmt = $this->conn->prepare($sqlQuery);
                    
            // sanitize
            $this->txSKU=htmlspecialchars(strip_tags($this->txSKU));
            $this->txDescricao=htmlspecialchars(strip_tags($this->txDescricao));
            $this->FKProdutoEmpresa=htmlspecialchars(strip_tags($this->FKProdutoEmpresa));
            $this->FKProdutoItem=htmlspecialchars(strip_tags($this->FKProdutoItem));
            $this->FKProdutoTipo=htmlspecialchars(strip_tags($this->FKProdutoTipo));
            $this->FKProdutoUnidade=htmlspecialchars(strip_tags($this->FKProdutoUnidade));
            $this->nmValorUnitario=htmlspecialchars(strip_tags($this->nmValorUnitario));
                    
            // bind data
            $stmt->bindParam(":txSKU", $this->txSKU);
            $stmt->bindParam(":txDescricao", $this->txDescricao);
            $stmt->bindParam(":FKProdutoEmpresa", $this->FKProdutoEmpresa);
            $stmt->bindParam(":FKProdutoItem", $this->FKProdutoItem);
            $stmt->bindParam(":FKProdutoTipo", $this->FKProdutoTipo);
            $stmt->bindParam(":FKProdutoUnidade", $this->FKProdutoUnidade);
            $stmt->bindParam(":nmValorUnitario", $this->nmValorUnitario);
                    
            if($stmt->execute()){
               return true;
            }
            return false;
        }
        
    }
?>