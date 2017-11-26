'use strict';
var app={
    getTemp: function(url){
        return $.ajax(url)
    },
    getStatmentById:function(table,id){
        return $.ajax({
            url: "../backend/api/API.php",
            type: 'GET',
            data: {
                action: table,
                data: { id: id }
            },
            data: {
                action:table,
                data: { id: 'all' }
            },
        });
    },
    loginAjax:function(table,data){
        return $.ajax({
                    url: "../backend/api/API.php",
                    type: 'GET',
                    data: {
                        action:table,
                        data:data
                    },
                });
    }
}

app.getTemp('tamplates/login/login.html').done(function(data){
    $('main').html(data);
  
});