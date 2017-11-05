<?php
 abstract class Api{
  
    abstract function create($params);
    abstract function select();
    abstract function update($params);
    abstract function delete($params);

    public function manager($func,$params){
        switch($func){
            case 'POST':
            return $this->create($params);
            case 'GET':
            return $this->select();
            case 'PUT':
            return $this->update($params);
            case 'DELETE':
            return $this->delete($params);
        }
    }
       

}
?>