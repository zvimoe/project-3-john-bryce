<?php
    require_once "../commen/bl.php";
    require_once "../commen/dal.php";
  class ScApi{
      private $table ='students_courses';
      public function manager($meth,$adata){
           switch($meth){
               case 'GET':
              return $this->getAll();
               break;
               case 'POST':
               $this->add($adata);
               break;
           };
        
      }
      public function getAll(){
        $bl = new BLL;
        $quary = $bl->readAll($this->table);
        $con = new DAL('theschool');
        $stmt = $con->readAlone($quary);
        $stmt= $stmt->fetchAll();
        return $stmt;
      }
      public function add($data){
        $bl = new BLL;
        $quary = $bl->create($data,$this->table);
        $con = new DAL('theschool');
        $stmt = $con->set($quary[0],$quary[1]);
        
  
      }

  }
  ?>



 