<?php
    // require_once "../commen/bl.php";
    // require_once "../commen/dal.php";
    require_once "../commen/password-handler.php";
    require_once "abstract-ctrl.php";
    
    
   class AdminCtrl extends Ctrl{
        protected $table='admins';

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
     
        
// function to create multin Models

        protected function createMultipleModels($stmt){
            $Models=array();
            foreach($stmt as $row){
                $st=new AdminModel("","");
                foreach($row as $key=>$value){
                    $st->setvar($key,$value);
                }
                array_push($Models,$st);
          }
          return $Models ;
        }

   }
   ?>