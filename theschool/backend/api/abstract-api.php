<?php
 abstract class Api{
  
        abstract function create($params);
        abstract function select();
        abstract function update($params);
        abstract function delete($id);

    public function manager($func,$params){
        switch($func){
            case 'POST':
            if ($_SESSION['permission'] == '1'||'2'){
            return $this->create($params);
            }
            else{
                return 'no permission';
            }
            case 'GET':
            if ($_SESSION['permission'] == '1'||'2'||'3'){
                return $this->select($params);
                }
            else{
                    return 'no permission';
                }
            case 'PUT':
            if ($_SESSION['permission'] == '1'||'2'){
                return $this->update($params);
                }
            else{
                    return 'no permission';
                }
            case 'DELETE': 
            if ($_SESSION['permission'] == '1'||'2'){
                return $this->delete($params);
                }
            else{
                    return 'no permission';
                }
    
        }
    }
    protected function multiModelsToJson($models){
        $arrayOfData=array();
        foreach($models as $model){
        $data = $model->getAllParams();
        array_push($arrayOfData,$data);
        }
        $res=json_encode($arrayOfData);
        str_replace($res,'null', '');
        return $res;
    }
       

}
?>