<?php
    require_once "../commen/bl.php";
    require_once "../commen/dal.php";
   
   
 class CsApi{
     public function __construct($meth,$table){

     }
   
    public function getByValueOfColum($value,$colum,$requestedColum){
      $bl=  new BLL;
     $quary = $bl->read($value,$colum,$this->table);
     $con = new DAL('theschool');
     $array = $con->read($quary[0],$quary[1]);
     echo $array;
    // return $array;



    }

 }




     ?>