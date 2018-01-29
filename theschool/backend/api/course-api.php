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
      function select(){
        $mc = new CtrlCourse;
        $allCourses=$mc->getAll();
        return $this->multiModelsToJson($allCourses);
        
      } 
      function update($params){
        $mc = new CtrlCourse;
        return $mc->update($params);
      }
      function delete($id){      
          $mc = new CtrlCourse;
          $mc->delete($id);
          return "course deleted";
      }
    
}

    ?>