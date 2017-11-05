<?php
   namespace model;
  class student{
       private $id;
       private $name;
       private $phone;
       private $email;
       private $password;
       private $courses=[]
       public function __construct(){

       }
       public function getVar($var){
               
        return $this->$var;
        
       }
       public function setVar($var,$value){

         $this->$var=$value;
       }      
  }