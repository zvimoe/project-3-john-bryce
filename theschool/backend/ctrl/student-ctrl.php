<?php
    require_once "../commen/bl.php";
    require_once "../commen/dal.php";
    require_once "../models/student-model.php";
   
   class StudentCtrl{

        public function get($student,$studentId){

            $bl = new BLL;
            $quary = $bl->read($studentId,'id','students');
            $con = new DAL('theschool');
            $info = $con->read($quary[0],$quary[1]);
            foreach($info as $key=>$value){
  
               $student->setVar($key,$value);
            }
            return $student;
        }
        public function getAll(){
            $bl = new BLL;
            $quary = $bl->readAll('students');
            $con = new DAL('theschool');
            $info = $con->readAlone($quary);
            $stmt = $info->fetchAll();
            $allstudents=array();
            foreach($stmt as $row){
                $st=new \model\student;
                foreach($row as $key=>$value){
                    $st->setvar($key,$value);
                }
                array_push($allstudents,$st);
          }
           return $allstudents ;
        }
   }
   ?>