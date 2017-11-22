'use strict'
$( "button" ).click(function( event ) {
    event.preventDefault();
    $( "<div>" )
    var form = $('form')[0];
    var formData = new FormData(form);
    formData.append('action','courses');
    
$.ajax({
    url: "../../../backend/api/api.php",
    //enctype: 'multipart/form-data',
    cache: false,
    contentType: false,
    processData: false,
    data: formData,
    type: 'POST',
    success: function(role){
        console.log(role)
    }
});
})