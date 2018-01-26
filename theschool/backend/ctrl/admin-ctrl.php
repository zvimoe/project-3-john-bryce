<?php
    // require_once "../commen/bl.php";
    // require_once "../commen/dal.php";
    require_once "../commen/password-handler.php";
    require_once "abstract-ctrl.php";
    
    
   class AdminCtrl extends Ctrl{
        protected $table='admins';

        public function login($name,$password){
            $ph=new PasswordHandler();
            $password = $ph->getHash($password);
            $bl = new BL;
            $admin = $bl->login($name,$password,'admins');
           if($admin){
            return $admin;
            
           }
        //    else return null;
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