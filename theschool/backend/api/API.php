<?php
session_start();
   require_once "admin-api.php";
   require_once "student-api.php";
   require_once "course-api.php";
   require_once "student-courses-api.php";
   require_once "../ctrl/admin-ctrl.php";
   require_once "../ctrl/student-ctrl.php";
   require_once "../ctrl/course-ctrl.php";
   require_once "../models/admin-model.php";
   require_once "../models/student-model.php";
   require_once "../models/course-model.php";
  

    $meth= strtoupper($_SERVER['REQUEST_METHOD']);

   if($meth==  'PUT' || $meth == 'DELETE') {
    parse_str(file_get_contents("php://input"),$post_vars);
    $action = $post_vars['action'];
    $adata = $post_vars['data']; 
   }

   if(isset($_REQUEST['data'])){
    $adata =  $_REQUEST['data'];
    $action = $_REQUEST['action'];
   }
   if(isset($_FILES["picture"])){
     $adata= $_POST;
    $adata['image'] = "../frontend/pictures/".$_FILES["picture"]["name"];
    $action=$adata['action'];
   };
   
  
 
   
 switch($action){
       case "login":
       $a = new AdminApi(new \model\Admin,new AdminCtrl);
       $a = $a->login($adata);
       $permissionId = $a->getVar('role_id');
       $_SESSION['permission'] = $permissionId;
       echo json_encode($permissionId);
       break;
       case "admins":
       $a = new AdminApi(new \model\Admin,new AdminCtrl);
       $admins = $a->manager($meth,$adata);
       echo $admins;
       break;
       case "students":
       $s=new StudentApi(new \model\student,new studentCtrl);
      // echo $_SESSION['permission'];
       $students = $s->manager($meth,$adata);
       echo $students;
       break;
       case "courses":
       $c=new CourseApi(new \model\Course, new CtrlCourse);
       $courses= $c->manager($meth,$adata);
       echo $courses;
       break;
       case "students_courses":
       $cs =new CsApi($meth,$adata);
       break;
   }
   ?>