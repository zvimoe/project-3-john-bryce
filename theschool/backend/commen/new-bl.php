<?php
require_once "dal.php";
require_once "../models/admin-model.php";
require_once "../models/course-model.php";
require_once "../models/student-model.php";

class Bl{
    public function create($params,$table){
            $prep = array();
            foreach($params as $k => $v ) { 
                $prep[':'.$k] = $v;
            }
            $stmt =$this->connect($prep,"INSERT INTO $table ( " . implode(', ',array_keys($params)).") VALUES (" . implode(', ',array_keys($prep)) . ")");
            
            if($stmt){
                return $stmt;
            }
           
 }
    public function getTable($table){
        $stmt =  $this->connect(null,'SELECT * FROM '.$table);
        if($table=='students_courses'||$table=='roles'){
            return $stmt->fetchAll();
        }
        if($stmt->columnCount()>1){
           return $this->setModels($stmt,$table);
        }
        elseif($stmt->columnCount()==1){
        return $this->setModel($stmt);
        }
        else{
            return null;
        }
        } 
    public function login($name,$password,$table){
            
            $stmt = $this->connect(null, "SELECT * FROM $table WHERE name = '$name' AND password = '$password'");
            $data = $stmt->fetch();
            if($data){
                return $this->setModel($data);
            }
            else{
                echo 'err';
                return null;
                
            }
   }
   public function delete($indecator,$indColum,$table){
      echo $indecator;
      $this->connect(null,"DELETE FROM $table WHERE $indColum =$indecator");
    }

  
    public function connect($exct,$quary){
       $con = new DAL('theschool');
       $stmt =$con->prepareQuary($quary);
       if($exct){
          $stmt->execute($exct);
       }
       else{
           $stmt->execute();
       }
       return $stmt;
    }
    private function setModels($stmt,$table){
        $models =array();
        $dataArray =  $stmt;
        foreach ($dataArray as $data) {
       
                switch($table){
                        case 'admins':
                        $model = new \model\Admin;
                        break;
                        case 'courses':
                        $model = new \model\Course;
                        break;
                        case 'students':
                        $model= new \model\Student;
                        break;

                }
                foreach($data as $k =>$v){
                        $model->setVar($k,$v);
                }
                array_push($models,$model);
        }
        return $models;
    }
    private function setModel($data){
        $model=new \model\Admin;
        foreach($data as $k=>$v){
            $model->setVar($k,$v);
        }
        return $model;
    }

}

