<?php

  require_once "abstract-api.php";
  require_once "../ctrl/admin-ctrl.php";
  require_once "../models/admin-model.php";
         
         
  class AdminApi extends Api{
    private $tableName = 'admin';

       public function login($params){
           $a=new AdminModel($params['name'],$params['password']);
           $c=new AdminCtrl;
           $a = $c->login($a);
           return $a;
       }

     
     
    }
    ?>