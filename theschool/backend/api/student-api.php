<?php
require_once "abstract-api.php";
  require_once "../ctrl/student-ctrl.php";
  require_once "../models/student-model.php";
         
         
  class StudentApi extends Api{
      
      
      function create($params){
        $m = new \model\student;
          foreach($params as $key=>$value){
              $m->setVar($key,$value);
          }
          $mc = new studentCtrl;
          $mc->create($m);
          return "new student inserted";
      }
      function select($params){
          
        $m = new \model\student;
        $mc = new studentCtrl;
       
        if($params['id']=='all'){ 
            $allStudents=$mc->getAll();
            $students=array();
            foreach($allStudents as $student){
            $s= $student->getAllParams();
            array_push($students,$s);
            }
            $s=json_encode($students);
            str_replace($s,'null', '');
            return $s;
          }
        else{
            $student=$mc->get($m,$params['id']);
            $s=$student->getAllParams();
            return json_encode($s);
        }
      }
      function update($params){
        $m = new \model\student;
        $mc = new studentCtrl;
          return $mc->upadte($m);
      }
      function delete($params){
        $m = new \model\student;
        $mc = new studentCtrl;
          $mc->delete($m);
          return "director deleted";
      }
    
}
    ?>