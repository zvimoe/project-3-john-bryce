<?php
require_once "abstract-api.php";
  require_once "../ctrl/student-ctrl.php";
  require_once "../models/student-model.php";
         
         
  class StudentApi extends Api{
      
      
      function create($params){
          $m = new studentModel;
          foreach($params as $key=>$value){
              $m->setVar($key,$value);
          }
          $mc = new AdminCtrl;
          $mc->create($m);
          return "new student inserted";
      }
      function select($params){
          
        $m = new studentModel;
        $mc = new studentCtrl;
        $allStudents=$mc->getAll($m);
        return $allstudents;
      }
      function update($params){
          $m = new studentModel();
          $mc = new studentCtrl;
          return $mc->upadte($m);
      }
      function delete($params){
          $m = new studentModel($params['id']);
          $mc = new studentCtrl;
          $mc->delete($m);
          return "director deleted";
      }
    
}
    ?>