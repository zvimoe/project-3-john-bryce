<?php
require_once "dal.php";
require_once "../models/admin-model.php";
class AdminBl{
    private $table = 'admins';
    public function get(){
      $stmt =  connect('get * from '.$this->table);
      if($stmt->columnCount()>1){
        setModels($stmt);
      }
      elseif($stmt->columnCount()==1){
      }
      else{
          return 'err '.$stmt;
      }
    } 
    private function connect($quary){
       $con = new DAL('theschool');
       $stmt =$con->setquary($quary);
       return $stmt;
    }
    private function setModels($stmt){
        $admins =array();
        $adminArrray =  $stmt->fetchAll();
        for ($i=0; $i <$adminArrray.length; $i++) { 
            $a = new AdminModel;
            foreach($adminArrray[i] as $k =>$v){
                $a->setVar($k,$v);
            }
            array_push($admins,$m);
        }
        return $admins;
    }
    private function setModel($stmt){
        $admin = $stmt->fetch();
        $a =new AdminModel;
        foreach($admin as $k=>$v){
            $a->setVar($k,$v);
        }
        return $a;
    }

}

