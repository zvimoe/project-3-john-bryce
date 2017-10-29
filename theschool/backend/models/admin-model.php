<?php
    
 class  AdminModel{
    private $name;
    private $role;
    private $phone;
    private $email;
    private $password;
    function __consruct($data){

      $this->name=$data['name'];
      $this->password=$data['password'];

    }
    function getVar($var){
        return $this->$var;
    }
 
     function setVar($var,$value){
         $this->$var=$value;
    }
     
       
    
}