<?php

  require_once "abstract-api.php";
  require_once "../ctrl/admin-ctrl.php";
  require_once "../models/admin-model.php";
         
         
  class AdminApi extends Api{


      public function login($params){
           $a=new AdminModel($params['name'],$params['password']);
           $c=new AdminCtrl;
           $a = $c->login($a);
           return $a;
       }

      function create($params){
        if ($_SESSION['permission'] == '1'||'2'){
          $m = new AdminModel($params['name'],$params['password']);
          foreach($params as $key=>$value){
            $m->setVar($key,$value);
        }
          $mc = new AdminCtrl;
          $mc->create($m);
          return "new director inserted";
        }
        else{
            return "you dont have permission";
        }
      }
      function select($params){
          
          $m = new AdminModel($params['id'],"");
          $mc = new AdminCtrl;
          if($params['id']=='all'){ 
            $allStudents=$mc->getAll();
           return  $this->multiModelsToJson($allStudents);
          }
        else{
            $student=$mc->getById($m,$params['id']);
            $s=$student->getAllParams();
            return json_encode($s);
        }
    }
      
      
      function update($params){
        if ($_SESSION['permission'] == '1'||'2'){
          $m = new AdminModel($params['id'],$params['name']);
          $mc = new AdminCtrl;
          return $mc->upadte($m);
        }
        else{
            return "you dont have permission";
        }
      }
      function delete($id){
      if ($_SESSION['permission'] == '1'||'2') {
            $mc = new AdminCtrl;
            $mc->delete($id);
            return "director deleted";
        }
        else{
            return "you dont have permission";
        }
      }
    }
    ?>