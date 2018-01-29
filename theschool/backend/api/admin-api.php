<?php

  require_once "abstract-api.php";
  require_once "../ctrl/admin-ctrl.php";
         
    
  class AdminApi extends Api{


      public function login($params){
           $c=new AdminCtrl;
           $a = $c->login($params['name'],$params['password']);
           return $a;
       }

      function create($params){
        if ($_SESSION['permission'] == '1'){
          $m = new \model\Admin;
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
      function select(){
           $mc = new AdminCtrl;
           $allStudents=$mc->getAll();
           return  $this->multiModelsToJson($allStudents);
          }  

      function update($params){
        if ($_SESSION['permission'] == '1'){
          $mc = new AdminCtrl;
          return $mc->update($params);
        }
        else{
            return "you dont have permission";
        }
      }
      function delete($id){
      if ($_SESSION['permission'] == '1') {
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