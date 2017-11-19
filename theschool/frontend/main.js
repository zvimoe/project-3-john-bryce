'use strict';
var app={
    loadPage: function(url,container){
    $.ajax(url)
    .always(function(data){
        $(container).append(data);
      
    });
},
}
app.loadPage('tamplates/login/login.html','main')
