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
         $data = $data['data'];
         $bl = new BLL;
         $toSwitch = array("{", "}", "[","]",":");
         $switchTo   = array("(", ")","","",",");
         $prep=str_replace($toSwitch,$switchTo ,$data);
         $quary="INSERT INTO `students_courses` (`s_id`, `c_id`) VALUES $prep";
         echo $quary;
         $con = new DAL('theschool');
         $stmt = $con->setWithoutExc($quary);
         return $stmt;
      }

  }
  ?>



 