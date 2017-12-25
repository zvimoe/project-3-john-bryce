 'use strict'
 $('button').click(loadImage)
function loadImage(event){
    event.preventDefault();
    console.log('jhdjs')
    var form = $('form')[0];
    var formData = new FormData(form);
    var table =event.data.table;
    console.log(table)
    formData.append('action',table);
    console.log(formData)
   app.insertImage(table,formData).done(()=>{app.insertNewData(table,formData);}).done((res)=>{
      table == 'courses'||'students'?loadSchool():loadAdmins()
   })
    
}
// $.ajax({
//     url: "../../../backend/api/file-upload.php",
//     enctype: 'multipart/form-data',
//     cache: false,
//     contentType: false,
//     processData: false,
//     data: formData,
//     type: 'POST',
//     success: function(role){
//         console.log(role)
//     }
//   });
//  }
