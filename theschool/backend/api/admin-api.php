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
          $m;
          $mc = new AdminCtrl;
          $mc->create($m);
          return "new director inserted";
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
          $m = new AdminModel($params['id'],$params['name']);
          $mc = new AdminCtrl;
          return $mc->upadte($m);
      }
      function delete($params){
          $m = new AdminModel($params['id']);
          $mc = new v;
          $mc->delete($m);
          return "director deleted";
      }
    }
    ?>