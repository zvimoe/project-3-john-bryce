<?php
 abstract class Api{
  
    abstract function create($params);
    abstract function select($params);
    abstract function update($params);
    abstract function delete($params);

    public function manager($func,$params){
        switch($func){
            case 'POST':
            return $this->create($params);
            case 'GET':
            return $this->select($params);
            case 'PUT':
            return $this->update($params);
            case 'DELETE':
            return $this->delete($params);
        }
    }
       

}
?>