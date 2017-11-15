<?php

    require_once "../commen/bl.php";
    require_once "../commen/dal.php";
    require_once "../models/course-model.php";
     
   class CtrlCourse{
       public function create($course){
               $data=$course->getAll();
               $bl=new BLL;
               $query=$bl->create($data,'course');
               $dl=new DAL('theschool');
               $dl->set($query[0],$query[1]);
       }

        public function get($course){
           
            $courseId = $course->getVar('id');
            $bl = new BLL;
            $quary = $bl->read($courseId,'id','course');
            $con = new DAL('theschool');
            $info = $con->read($quary);
            $stmt = $info->fetch();
            foreach($stmt as $key=>$value){
  
               $admin->setVar($key,$value);
            }
            return $course;
        }
        public function getAll(){
            $bl = new BLL;
            $quary = $bl->readAll('course');
            $con = new DAL('theschool');
            $info = $con->readAlone($quary);
            $stmt = $info->fetchAll();
            $allcourses=array();
            foreach($stmt as $row){
                $st=new \model\student;
                foreach($row as $key=>$value){
                    $st->setvar($key,$value);
                }
                array_push($allcourses,$st);
          }
           return $allcourses ;
        }
        public function upadate($course){
        $courseId = $course->getVar('id');
        $bl = new BLL;
        $quary = $bl->delete($courseId,'id','course');
        $con = new DAL('theschool');
        }
   }