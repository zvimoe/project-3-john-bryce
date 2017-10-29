<?php
 class PasswordHandler{
     private $salt;
     public function __construct(){
      $this->salt = "tmoe";
    }
    public function getHash($password){
        return MD5($this->salt.$password);
    }
 }