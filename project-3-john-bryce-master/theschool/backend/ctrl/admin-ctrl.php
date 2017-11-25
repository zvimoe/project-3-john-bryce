<?php
    require_once "../commen/bl.php";
    require_once "../commen/dal.php";
    require_once "../commen/password-handler.php";
    
   class AdminCtrl{

        public function login($admin){
            $name = $admin->getVar('name');
            $ph=new PasswordHandler();
            $password = $ph->getHash($admin->getVar('password'));
            $bl = new BLL;
            $quary = $bl->login($name,$password,'admins');
            $con = new DAL('theschool');
            $info = $con->readAlone($quary);
            $stmt = $info->fetch();
            foreach($stmt as $key=>$value){
  
               $admin->setVar($key,$value);
            }
            return $admin;
        }
   }
   ?>