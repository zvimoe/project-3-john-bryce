<?php
 require_once "../commen/bl.php";
 require_once "../commen/dal.php";
 
  abstract class Ctrl{
       public function create($model){
               $data=$model->getAllParams();
               $bl=new BLL;
               print_r($data);
               $query=$bl->create($data,$this->table);
               $con=new DAL('theschool');
               $con->set($query[0],$query[1]);
       }

        public function getById($model,$id){
           
            $bl = new BLL;
            $quary = $bl->read($id,'id',$this->table);
            $con = new DAL('theschool');
            $info = $con->read($quary[0],$quary[1]);
            foreach($info as $key=>$value){
  
               $model->setVar($key,$value);
            }
            return $model;
        }
        public function getAll(){
            $bl = new BLL;
            $quary = $bl->readAll($this->table);
            $con = new DAL('theschool');
            $info = $con->readAlone($quary);
            $stmt = $info->fetchAll();
            $Models=$this->createMultipleModels($stmt);
            return $Models ;
        }

        public function delete($id){
            $bl = new BLL;
            $query = $bl->delete($id,'id',$this->table);
            $con = new DAL('theschool');
            $con->readAlone($query);

        }
        public function update($model){
            $data=$model->getAllParams();
            $bl=new BLL;
            $query=$bl->update($data,$this->table);
            $con=new DAL('theschool');
            $con->set($query[0],$query[1]);
    }
}
?>