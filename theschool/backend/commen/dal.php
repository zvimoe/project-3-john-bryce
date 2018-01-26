<?php
 // connection to data base //
 class DAL{
        private $host = '127.0.0.1';
        private $db;
        private $user = 'root';
        private $pass = '';
        private $charset = 'utf8';
        private $dsn;
        private $opt = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
       
        public function __construct($db) {
                    $this->db=$db;
                    $this->dsn = "mysql:host=$this->host;dbname=$this->db;charset=$this->charset";
            }
    
                // set a query and returns a un excuted pdo statament //
        public function prepareQuary($query) {
                    // echo $query;
                    $pdo = new PDO($this->dsn, $this->user, $this->pass, $this->opt); 
                    $stmt = $pdo->prepare($query);
                    return $stmt;  
    }
 
}
?>