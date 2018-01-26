<?php
 require_once "../commen/new-bl.php";
 
class RolesApi{
    public function getRoles($table){
      $bl =new BL;
      $stmt =$bl->getTable($table);
      return json_encode($stmt);
    }
}
?>