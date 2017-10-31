'use strict'
function login(){
let username= $("#username").val()
let password= $("#password").val()
$.ajax({
    url: "../../../backend/api/API.php",
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
            $('body').css('background-color','blue');
            break;
            // $.ajax('../moduls/banners/ownerbanner.html').always(function(banner){
            //        //replacing mustaches
            //      $('#banner').replaceWith(banner);
            // })
            //      $.ajax('../moduls/homepages/owner.html').always(function(hp){
                  
            //      $("#loginbox").replaceWith(hp);
            // })
           
        }
       
    }
})
}

       
              
     
      
//               }
// })
// }
// function addAndUpdate(){
       




// }sss