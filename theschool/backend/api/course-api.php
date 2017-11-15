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
          
        $m = new \model\Course;
        $mc = new CtrlCourse;
        $allStudents=$mc->getAll();
         return $allStudents;
      }
      function update($params){
        $m = new \model\Course;
        $mc = new CtrlCourse;
          return $mc->upadte($m);
      }
      function delete($params){
        $m = new \model\Course;
        $mc = new CtrlCourses;
          $mc->delete($m);
          return "course deleted";
      }
    
}
    ?>