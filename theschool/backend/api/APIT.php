<?php
session_start();
   require_once "admin-api.php";
   require_once "student-api.php";
   require_once "course-api.php";
   
   $adata =  ['id'=>'6','name'=>'Writing PHP scripts','description'=>'Writing PHP scripts, learn about PHP code structure, how to write and execute a simple PHP script and to add comments within your code.','image'=>'http://ccs.infospace.com/ClickHandler.ashx?encp=ld%3d20171115%26app%3d1%26c%3dclearch2%26s%3dclearch2%26rc%3dclearch2%26dc%3d%26euip%3d31.44.142.234%26pvaid%3d06facc317d62473a817dca2ac2dec992%26dt%3dDesktop%26fct.uid%3d%253b%2b__utmt%253d1%253b%2bdontchecksslnetspark%26en%3dHBV1x9K0sDpwFlfte6MecX1cqOTcn7uXet6JMSnvyKfaIxqj2WqC%252bw%253d%253d%26coi%3d772%26npp%3d4%26p%3d0%26pp%3d0%26mid%3d9%26ep%3d4%26ru%3dhttp%253a%252f%252fwww.sagacademy.com%252fimages%252fphp-training.jpg%26du%3dhttp%253a%252f%252fwww.sagacademy.com%252fimages%252fphp-training.jpg%26pct%3dhttp%253a%252f%252fpartner.clickserver.com%252fClickHandler%253fparterCustomParamter%253dvalue1%2526secondParameter%253dvalue2%26hash%3dF8799336CDF96CAB20F49F40745E511C&ap=4&cop=main-title&om_userid=RVxZuwUf1rXWk6Mj59Tf&om_sessionid=Kem7zskRtXVg7ehMRPpE&om_pageid=bk00fswO2OvC4GhglweO'];// $_REQUEST['data'];
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
       //echo json_encode;
       print_r($array);
       break; 
       case "courses":
       $c=new CourseApi;
       $array = $c->manager('DELETE','2',$adata);
       //echo json_encode;
       print_r($array);
       break;
   }
   ?>