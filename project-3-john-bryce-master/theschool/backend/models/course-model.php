<?php
   namespace model;
  class course{
       private $id;
       private $name;
       private $description;
       private $image;
       private $students=[];
       
       public function getVar($var){
               
        return $this->$var;
        
       }
       public function setVar($var,$value){

         $this->$var=$value;
       }     
       public function getAll(){
          
        $params=[
          'id' =>$this->id,
          'name' =>$this->name,
          'description'=>$this->description,
          'image'=>$this->image
        ];
        return $params;
       } 
  }
  ?>