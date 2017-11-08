<?php
session_start();
   require_once "admin-api.php";
   require_once "student-api.php";
//    require_once "courses-api.php";
   
   $adata =  ['id'=>'all'];// $_REQUEST['data'];
   $action = "students"; //$_REQUEST['action'];
   $meth= strtoupper($_SERVER['REQUEST_METHOD']);
            if ($meth == 'PUT')
                {
                    parse_str(file_get_contents("php://input"), $_PUT);

                    foreach ($_PUT as $key => $value)
                    {
                        unset($_PUT[$key]);

                        $_PUT[str_replace('amp;', '', $key)] = $value;
                    }
                    $_REQUEST = array_merge($_REQUEST, $_PUT);
                }
   
   switch($action){
       case "login":
       $a = new AdminApi;
       $a = $a->login($adata);
       $permissionId = $a->getVar('role_id');
       $_SESSION['permission'] = $permissionId;
       echo $permissionId;
       break;
       case "students":
       $s=new StudentApi;
       
       $array = $s->manager('GET','2',$adata);
       print_r($array);
       break; 
       case "courses":
       $c=new CoursesApi;
       echo $c->manager($adata,$role);
       break;
   }
   ?>