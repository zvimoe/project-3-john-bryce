<?php
session_start();
   require_once "admin-api.php";
   require_once "student-api.php";
   require_once "course-api.php";
   
   if(isset($_REQUEST['data'])){
    $adata =  $_REQUEST['data'];
   }
   else if(isset($_FILES["picture"])){
    $adata=$_REQUEST; 
    $adata['image']="../frontend/pictures/".$_FILES["picture"]["name"];
   }
   $action = $_REQUEST['action'];
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
       echo json_encode($permissionId);
       break;
       case "students":
       $s=new StudentApi;
      // echo $_SESSION['permission'];
       $students = $s->manager($meth,$_SESSION['permission'],$adata);
       $response=json_encode($students);
       str_replace($response,'null', '');
       break;
       case "courses":
       $c=new CourseApi;
       echo $c->manager($meth,$adata);
       break;
   }
   ?>