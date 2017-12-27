<?php
session_start();
   require_once "admin-api.php";
   require_once "student-api.php";
   require_once "course-api.php";
   require_once "student-courses-api.php";
   require_once "roles-api.php";
   
   $debugMode = false;
   if ($debugMode == true){
    $meth ='POST';
    $action = 'admins';
    $adata = array('c_id'=>'21','s_id'=>'1');
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
        $adata= $_POST;
        $adata['image'] = "../frontend/pictures/".$_FILES["picture"]["name"];
        $action=$adata['action'];
      };
  }
   
 switch($action){
       case "login":
       $a = new AdminApi;
       $m = $a->login($adata);
       $permissionId = $m->getVar('id');
       $_SESSION['permission'] = $permissionId;
       $data = $m->getAllParams();
       echo json_encode($data);
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
       echo json_encode($res);
       break;
       

   }
   ?>