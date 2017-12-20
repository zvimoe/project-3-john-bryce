<?php  
print_r($_FILES);
$target_file = "../../frontend/pictures/". basename($_FILES["picture"]["name"]);
move_uploaded_file( $_FILES["picture"]["tmp_name"],$target_file );
?> 