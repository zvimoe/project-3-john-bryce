<?php
require_once "abstract-api.php";
  require_once "../ctrl/student-ctrl.php";
  require_once "../models/student-model.php";
         
         
  class StudentApi extends Api{
      
      
      function create($params){
        $m = new \model\Student;
          foreach($params as $key=>$value){
              $m->setVar($key,$value);
          }
          $mc = new studentCtrl;
          $mc->create($m);
          return "new student inserted";
      }
      function select(){
        $mc = new studentCtrl;
        $allStudents=$mc->getAll();
        return  $this->multiModelsToJson($allStudents);
          
      }
      function update($params){
        $m = new \model\student;
        $mc = new studentCtrl;
          return $mc->upadte($m);
      }
      function delete($id){
        $mc = new studentCtrl;
          $mc->delete($id);
          return "director deleted";
      }
    
}
    ?>