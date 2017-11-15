'use strict'
function login(){
let username= $("#username").val()
let password= $("#password").val()
$.ajax({
    url: "../backend/api/API.php",
    type: 'GET',
    data:{action:'login',
          data:{name:username,
                password:password}
        },
    success: function(role){

         switch(role){
            case "1" :
            $('body').css('background-color','red');
            break;
            case "2":
            $('#admin-tab').css('display','none')
            $.ajax({
                url: "../backend/api/API.php",
                type: 'GET',
                data:{action:'students',
                      data:{id:'all'}
                    },
                success: function(data){
                    data=JSON.parse(data);
                    console.log(data.length)
                    $.ajax('tamplates/home-page/homepage.html')
                    .always(function(tamp) {
                        var c = tamp;
                        c = c.replace("{{list-title}}", 'students');
                        $('main').empty();
                        $('main').append(c);
                        for (let i=0; i < data.length; i++) {
                         console.log(data[i].name)
                        $("div.list").append('<div onclick ="function getstudent(' + data[i].name + ')" class="list-group-item">'+ data[i].name+'</div>')
            
                        }
                      
            
                    });
                }
            })
               break;
        
           
        }
       
    }
})
}