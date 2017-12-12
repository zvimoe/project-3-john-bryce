<?php
 
    require_once "abstract-ctrl.php";
    require_once "../models/student-model.php";
   
 class StudentCtrl extends Ctrl{
   
        protected $table='students';
 
     // function to create multin Models
    protected function createMultipleModels($stmt){
        $Models=array();
        foreach($stmt as $row){
            $st=new \model\Student;
            foreach($row as $key=>$value){
                $st->setvar($key,$value);
            }
            array_push($Models,$st);
            }
        return $Models ;
    }
  
}
   ?>