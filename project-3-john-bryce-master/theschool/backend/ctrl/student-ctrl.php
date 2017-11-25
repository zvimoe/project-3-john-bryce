<?php
    require_once "../commen/bl.php";
    require_once "../commen/dal.php";
    require_once "../models/student-model.php";
   
   class StudentCtrl{

        public function get($student){
           
            $studentId = $student->getVar('id');
            $bl = new BLL;
            $quary = $bl->read($studentId,'id','students');
            $con = new DAL('theschool');
            $info = $con->read($quary);
            $stmt = $info->fetch();
            foreach($stmt as $key=>$value){
  
               $admin->setVar($key,$value);
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