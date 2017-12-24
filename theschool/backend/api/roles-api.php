<?php
 require_once "../commen/bl.php";
 require_once "../commen/dal.php";
class RolesApi{
    public function getRoles($table){
      $con =  new DAL('theschool');
      $bl =new BLL;
      $quary =$bl->readAll($table);
      $stmt=$con->readAlone($quary);
      $stmt =$stmt->fetchAll();
      return $stmt;
    }
}
?>