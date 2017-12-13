<?php
 abstract class Api{
     public function __construct($model,$controller){
         $this->model=$model;
         $this->controller=$controller;
     }
  

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
        $m = $model->getAllParams();
        array_push($arrayOfModels,$m);
        }
        $m=json_encode($arrayOfModels);
        str_replace($m,'null', '');
        return $m;
    }
    function create($params){
          foreach($params as $key=>$value){
              $model->setVar($key,$value);
          }
          $controller->create($model);
          return "new"+$this->modelName +"inserted";
      }
      function select($params){
        if($params['id']=='all'){
                $allCourses=$controller->getAll();
                return $this->multiModelsToJson($allCourses);
            }
        else{
            $model=$controller->getbyId($model,$params['id']);
            $m=$model->getAllParams();
            return json_encode($m);
        }
      } 
      function update($params){
          return $controller->upadte($model);
      }
      function delete($id){      
          $controller->delete($id);
          return $this->modelName +" deleted";
      }
    

       

}
?>