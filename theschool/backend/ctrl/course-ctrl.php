<?php

    require_once "../commen/bl.php";
    require_once "../commen/dal.php";
    require_once "../models/course-model.php";
     
   class CtrlCourse{
       public function create($course){
               $data=$course->getAll();
               $bl=new BLL;
               $query=$bl->create($data,'course');
               $con=new DAL('theschool');
               $con->set($query[0],$query[1]);
       }

        public function get($course,$courseId ){
           
            $bl = new BLL;
            $quary = $bl->read($courseId,'id','course');
            $con = new DAL('theschool');
            $info = $con->read($quary[0],$quary[1]);
            foreach($info as $key=>$value){
  
               $course->setVar($key,$value);
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
                $st=new \model\course;
                foreach($row as $key=>$value){
                    $st->setvar($key,$value);
                }
                array_push($allcourses,$st);
          }
           return $allcourses ;
        }
        public function delete($courseId){
        $bl = new BLL;
        $query = $bl->delete($courseId,'id','course');
        $con = new DAL('theschool');
        $con->readAlone($query);

        }
   }