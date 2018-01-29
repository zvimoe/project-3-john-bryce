<?php
session_start();
   require_once "admin-api.php";
   require_once "student-api.php";
   require_once "course-api.php";
   require_once "student-courses-api.php";
   require_once "roles-api.php"; 
   $debugMode = true;
   if ($debugMode == true){
    $_SESSION['permission'] = '1';
    $meth ='PUT';
    $action = 'admins';
    $adata =  array('id'=>'31','name'=>'fdgsfdg','role_id'=>'1','image'=>'jghgchxg','phone'=>'gdhhdhgs','email'=>'hsghgshd','password'=>'56523',);
   }
   else{
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
        $_POST['image'] = "../frontend/pictures/".$_FILES["picture"]["name"];
      };
      if(isset($_POST['action'])){
        $adata= $_POST;
        $action=$adata['action'];
      }
     
  }
   
 switch($action){
       case "login":
       $a = new AdminApi;
       $model = $a->login($adata);
       if($model){ 
          $data = $model->getAllParams();
          $permissionId = $data['id'];
          $_SESSION['permission'] = $permissionId;
          echo json_encode($data);
        }
        else {
          echo ' no user found';
        };
       break;
       case "students":
       $s=new StudentApi;
      // echo $_SESSION['permission'];
       $students = $s->manager($meth,$adata);
       echo $students;
       break;
       case "admins":
       $s=new AdminApi;
      // echo $_SESSION['permission']; //todo
       $admins = $s->manager($meth,$adata);
       echo $admins;
       break;
       case "courses":
       $c=new CourseApi;
       $courses= $c->manager($meth,$adata);
       echo $courses;
       break;
       case 'students_courses':
       $sc =new ScApi;
       $res = $sc->manager($meth,$adata);
       echo json_encode($res);
       break;
       case 'roles':
       $r=new RolesApi;
       $res = $r->getRoles($action);
       echo $res;
       break;
       

   }
   ?>