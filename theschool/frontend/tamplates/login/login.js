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
                    changeTemp('main','tamplates/home-page/homepagetest.html')
                        for (let i=0; i < data.length; i++) {
                            $('#side ul').html('<li>'+data[i].name+'</li>')
          //  $("div.list").append('<div onclick ="function getstudent(' + data[i].name + ')" class="list-group-item">'+ data[i].name+'</div>')
        
                        }
                    }
                      
                    
                    });
                    break; 
                }
            }   
        })
    }
       

function changeTemp(container,url){
    $.ajax(url)
    .always(function(temp) {
        var c = temp;
        $(container).empty();
        $(container).append(c);
        });
    }