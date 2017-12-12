'use strict';
var app = {
    getTemp: function (url) {
        return $.ajax(url)
    },
    getStatmentById: function (table, id) {
        return $.ajax({
            url: "../backend/api/API.php",
            type: 'GET',
            data: {
                action: table,
                data: { id: id }
            },

        });
    },
    getStatmentBySelectedColumValue:function(table,value,colum){

        return $.ajax({
            url: "../backend/api/API.php",
            type: 'GET',
            data: {
                action: table,
                data: { value: value ,
                   colum:colum}
            },

        });
    },
    loginAjax: function (table, data) {
        return $.ajax({
            url: "../backend/api/API.php",
            type: 'GET',
            data: {
                action: table,
                data: data
            },
        });
    },
    deleteById: function (table, id) {
        console.log(table)
        return $.ajax({
            url: "../backend/api/API.php",
            type: "DELETE",
            data: {
                action: table,
                data: id
            },
        });

    },
    insertImage: function (table, formData) {
        return $.ajax({
            url: "../backend/api/file-upload.php",
            enctype: 'multipart/form-data',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            type: 'POST'
        });

    },
    insertNewData: function (table,formData) {
        formData.append('action',table)
        return $.ajax({
            url: "../backend/api/API.php",
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            data:formData
            
        });
    }
}


