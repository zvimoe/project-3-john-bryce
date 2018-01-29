<?php
 require_once "../commen/new-bl.php";
 require_once "../commen/password-handler.php";
 
  abstract class Ctrl{
        public function create($model){
               $data=$model->getAllParams();
               if(isset($data['password'])){
                $ph=new PasswordHandler();
                $data['password'] = $ph->getHash($data['password']);
               }
               $bl=new BL;
               $stmt=$bl->create($data,$this->table);
               return $stmt;
        }
        public function getAll(){
            $bl = new BL;
            $Models = $bl->getTable($this->table);
            return $Models ;
        }

        public function delete($id){
            $bl = new BL;
            $stmt = $bl->delete($id,'id',$this->table);
            return $stmt;
        }
        public function update($params){
            $bl=new BL;
            $stmt=$bl->update($params,'id',$this->table);
            return $stmt;
    }
}
?>