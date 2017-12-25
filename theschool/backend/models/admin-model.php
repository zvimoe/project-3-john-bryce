<?php
    
 class  AdminModel{
    private $id;
    private $name;
    private $role_id ;
    private $phone;
    private $email;
    private $password;
    private $image;
    function __construct($name,$password){       
      $this->name=$name;
      $this->password=$password;
    }
    public function getVar($var){
        return $this->$var;
         
    }
 
    public function setVar($var,$value){
         $this->$var=$value;
    }
    public function getAllParams(){
        
         $allstudents =  array(
             'id'=>$this->id,
             'name'=>$this->name,
             'role_id'=>$this->role_id,
             'phone'=>$this->phone,
             'email'=>$this->email,
             'password'=>$this->password,
             'image'=>$this->image
            
         );
         return $allstudents;
 
        }
    
    
}
?>