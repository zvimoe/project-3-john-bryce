'use strict';
var app={
    loadPage: function(url,container){
    $.ajax(url)
    .always(function(data){
        $(container).html(data);
      
    });
},
}
app.loadPage('tamplates/login/login.html','main')
