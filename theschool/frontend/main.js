'use strict';
$.ajax({
    url: 'tamplates/login/login.html',
    dataType: 'html',
    success: function(data){
            $('main').append(data)
        }
    });