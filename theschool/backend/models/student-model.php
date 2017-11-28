<?php
   namespace model;
  class student{
       private $id;
       private $name;
       private $phone;
       private $email;
       private $password;
       private $courses=[];
       
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
            'phone'=>$this->phone,
            'email'=>$this->email,
            'password'=>$this->password,
            'courses'=>$this->courses=[]
        );
        return $allstudents;



       }
  }
  ?>