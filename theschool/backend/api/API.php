<?php
   require_once "admin-api.php";
   require_once "students-api.php";
   require_once "courses-api.php";
   session_start();
   $adata =  $_REQUEST['data'];
   $action = $_REQUEST['action'];
   $meth= strtoupper($_SERVER['REQUEST_METHOD']);
            echo $meth;
            die;
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
   $a;
   switch($action){
       case "admin":
       $a = new AdminsApi;
       $a = $a->login($adata);
       echo $a->getVar('role'); 
       break;
       case "students":
       $s=new StudentsApi;
       echo $s->manager($adata,$role);
       break;
       case "courses":
       $c=new CoursesApi;
       echo $c->manager($adata,$role);
       break;
   }
   ?>
    