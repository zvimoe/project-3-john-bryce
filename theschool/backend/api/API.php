<?php
session_start();
   require_once "admin-api.php";
   require_once "student-api.php";
   require_once "course-api.php";

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
       $a = new AdminApi;
       $a = $a->login($adata);
       $permissionId = $a->getAllParams();
       $_SESSION['permission'] = $permissionId;
       echo json_encode($permissionId);
       break;
       case "students":
       $s=new StudentApi;
      // echo $_SESSION['permission'];
       $students = $s->manager($meth,$adata);
       echo $students;
       break;
       case "courses":
       $c=new CourseApi;
       $courses= $c->manager($meth,$adata);
       echo $courses;
       break;
   }
   ?>