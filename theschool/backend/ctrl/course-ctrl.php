<?php

   require_once "../models/course-model.php";
   require_once "abstract-ctrl.php";
   
     
class CtrlCourse extends Ctrl {
     protected $table='course';

    // function to create multin Models
    protected function createMultipleModels($stmt){
        $Models=array();
        foreach($stmt as $row){
            $st=new \model\course;
            foreach($row as $key=>$value){
                $st->setvar($key,$value);
            }
            array_push($Models,$st);
        }
        return $Models ;
        }
}
?>