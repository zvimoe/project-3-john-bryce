<?php
    
print_r($_SERVER['REQUEST_METHOD']);
$target_file = "../../frontend/pictures/". basename($_FILES["picture"]["name"]);
move_uploaded_file( $_FILES["picture"]["tmp_name"],$target_file );
?> 