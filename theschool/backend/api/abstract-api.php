<?php
 abstract class Api{
  
    abstract function create($params);
    abstract function select($paramd);
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
            if(gettype($params)!='array()'){
                return $this->delete($params);
            }
            else{
                return $this->deleteAll($params);
            }
    
        }
    }
    protected function multiModelsToJson($models){
        $arrayOfModels=array();
        foreach($models as $model){
        $m= $model->getAllParams();
        array_push($arrayOfModels,$m);
        }
        $m=json_encode($arrayOfModels);
        str_replace($m,'null', '');
        return $m;
    }
       

}
?>