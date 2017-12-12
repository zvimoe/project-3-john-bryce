<?php
       //buesness logic layer
  class BLL{

        public function login($name,$password,$table){
                

                return "SELECT * FROM $table WHERE name = '$name' AND password = '$password'";
          }
          

        public function create($params,$table){
                $indecator=array_shift($params);
               
                $prep = array();
                    foreach($params as $k => $v ) { 
                        $prep[':'.$k] = $v;
                    }
               return array("INSERT INTO $table ( " . implode(', ',array_keys($params)) .
                ") VALUES (" . implode(', ',array_keys($prep)) . ")",$prep);
                   

        }
        public function Read($indecator,$ind__c,$table){
                  
                return array("SELECT * FROM $table WHERE $ind__c=:ind",array("ind" => $indecator));
            
        }
         public function readAll($table){

                return "SELECT * FROM $table";
            
        }
        
        public function Uquerybuilder($params,$indColum,$table){
                    $indecator=array_shift($params);
                    $query = "UPDATE $table SET";
                    $prep = array();
                    
                    foreach($params as $k => $v ) { 
                    
                        $query .= ' '.$k.' = :'.$k.','; 
                        $prep[':'.$k] = $v; 
                    }
                    
                    $query = substr($query, 0, -1).' '; // remove last , and add a ;
                
                    return (array($query."WHERE $indColum=$indecator",$prep));
        }
        public function delete($indecator,$indColum,$table){
             
               return "DELETE FROM $table WHERE $indColum =$indecator";
        }
  
    //TO DO valildations

    //old version not dinamic



            // //       public function insert($name,$table,$director) {

            // //           switch($table){
            // //                case "movies":
            //                    $movie=$con->select( 'SELECT * FROM movies WHERE name=:name', ['name' =>$name]);
            //                     if($movie['name']!=name){
            //                         $con->insert("INSERT INTO movies(name,d_id)VALUES(:name, :drct)",["name" =>$name,"drct" => $director]);
            //                     }
            //                     else{
            //                         return "movie name already exsits";
            //                         //needs to be implemented
            //                         }
            //                     break;
            //                     case "directors":
            //                      $director=$con->select( 'SELECT * FROM directors WHERE name=:name', ['name' =>$name]);
            //                     if($director['name']!=name){
            //                         $con->ChnageDB("INSERT INTO directors(name)VALUES(:name)",["name" =>$name]);
            //                     }
            //                     else{
            //                         return "director name already exsits";
            //                         //needs to be implemented
            //                         }
            //               break;
            //             }   
            //       }
                

            //       public function select($id,$table){
                    
            //               $row=$con->select( 'SELECT * FROM :table WHERE id=:id', ['table'=>$table,'id' =>$id]);
            //         if($row['id']==$id){
                        
            //               return $row;
                        
            //          }
            //         else{
            //             return "no row found with that id";

            //       public function selectAll($table){
                        
            //               $all=$con->selectAll( 'SELECT * FROM :table',[table=>$table]);
            //               return $all
            //       }

            //       public function update($name,$id,$table,$director){

            //            switch($table){
            //                case "movies":
            //                    $movie=$con->select( 'SELECT * FROM :table WHERE name=:name', ['table'=>$table,'name' =>$name]);
            //                     if($movie['name']!=name){
            //                         $con->insert('UPDATE :table  SET name = :name, director = :drct  WHERE id =:id',["name" =>$name,"drct" => $director,"id"=>$id,'table'=>$table);
            //                     }
            //                     else{
            //                         return "movie name already exsits";
            //                         //needs to be implemented
            //                         }
            //                     break;
            //                     case "directors":
            //                      $director=$con->select( 'SELECT * FROM :table WHERE name=:name', ['table'=>$table,'name' =>$name]);
            //                     if($director['name']!=name){
            //                         $con->ChnageDB('UPDATE :table  SET name = :name WHERE id =:id',["name" =>$name,"id"=>$id,['table'=>$table]);
            //                     }
            //                     else{
            //                         return "director name already exsits";
            //                         //needs to be implemented
            //                         }
            //               break;
            //             }     

                            
            //       }
                
            //       public function delete($id,$table){
                
            //           $row=$con->select( 'SELECT * FROM :table WHERE id=:id', ['table'=>$table,'id' =>$id]);
            //         if($row['id']==$id){

            //              $con->insert( 'DELETE * FROM :table WHERE id=:id', ['table'=>$table,'id' =>$id]);
            //          }
            //         else{
            //             return "no row found with that id";


            //       }
                




 }
 ?>