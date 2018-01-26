<?php
   require_once "../commen/dal.php";
    class ScApi{
      protected $table ='students_courses';
      public function manager($meth,$adata){
           switch($meth){
               case 'GET':
              return $this->getAll();
               break;
               case 'POST':
               $this->add($adata);
               break;
               case 'DELETE':
               $this->delete($adata);
               break;
           };
        
      }
      public function getAll(){
        $bl = new BL;
        $stmt =$bl->getTable($this->table);
        return $stmt;
       
      }
      public function add($data){
         $data = $data['data'];
         $toSwitch = array("{", "}", "[","]",":");
         $switchTo   = array("(", ")","","",",");
         $prep=str_replace($toSwitch,$switchTo ,$data);
         $quary="INSERT INTO `students_courses` (`s_id`, `c_id`) VALUES $prep";
         $bl = new BL;
         $stmt = $bl->connect(null,$quary);
         return $stmt;
      }
      public function delete($params){
        $id =  $params['id'];
        $colum =  $params['colum'];
        $bl = new BL;
        $bl->delete($id,$colum,$this->table);
        return 'deleted '.$colum.' with the value of'.$id;

      }

  }
  ?>