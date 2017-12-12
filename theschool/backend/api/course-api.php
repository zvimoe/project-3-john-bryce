<?php
require_once "abstract-api.php";
  require_once "../ctrl/course-ctrl.php";
  require_once "../models/course-model.php";
         
         
  class CourseApi extends Api{
      
      
      function create($params){
        $m = new \model\Course;
          foreach($params as $key=>$value){
              $m->setVar($key,$value);
          }
          $mc = new CtrlCourse;
          $mc->create($m);
          return "new course inserted";
      }
      function select($params){
          if($params)
        $m = new \model\Course;
        $mc = new CtrlCourse;
        if($params['id']=='all'){
                $allCourses=$mc->getAll();
                return $this->multiModelsToJson($allCourses);
            }
        else{
            $course=$mc->getbyId($m,$params['id']);
            $c=$course->getAllParams();
            return json_encode($c);
        }
      } 
      function update($params){
        $m = new \model\Course;
        $mc = new CtrlCourse;
          return $mc->upadte($m);
      }
      function delete($id){      
          $mc = new CtrlCourse;
          $mc->delete($id);
          return "course deleted";
      }
    
}

    ?>