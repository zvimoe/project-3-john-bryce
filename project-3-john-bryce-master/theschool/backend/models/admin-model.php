<?php
    
 class  AdminModel{
    private $id;
    private $name;
    private $role_id ;
    private $phone;
    private $email;
    private $password;
    function __construct($name,$password){       
      $this->name=$name;
      $this->password=$password;
    }
    function getVar($var){
        return $this->$var;
         
    }
 
     function setVar($var,$value){
         $this->$var=$value;
    }
     
    
    
}
?>