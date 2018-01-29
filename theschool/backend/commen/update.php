<?php
    
function update($params,$Colum,$table){
        $id=array_shift($params);
        $query = "UPDATE $table SET";
        $prep = array();
        foreach($params as $k => $v ) { 
            $query .= ' '.$k.' = :'.$k.','; 
            $prep[':'.$k] = $v; 
        }
        $query = substr($query, 0, -1).' '; // remove last , and add a ;
        connect(array($query."WHERE $Colum=$id",$prep));
}
