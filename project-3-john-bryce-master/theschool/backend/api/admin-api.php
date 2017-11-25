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
          
          $m = new DirectorModel($params['id'],"");
          $mc = new DirectorController;
          return $mc->select($m);
      }
      function update($params){
          $m = new DirectorModel($params['id'],$params['name']);
          $mc = new DirectorController;
          return $mc->upadte($m);
      }
      function delete($params){
          $m = new DirectorModel($params['id']);
          $mc = new DirectorController;
          $mc->delete($m);
          return "director deleted";
      }
    }
    ?>