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
            url: "../../../backend/api/file-upload.php",
            enctype: 'multipart/form-data',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            type: 'POST',
            success: function (role) {
                console.log(role)
            }
        });

    },
    insertNewData: function (table, formData) {
        return $.ajax({
            url: "../backend/api/API.php",
            type: 'POST',
            data: {
                action: table,
                data:formData
            },
        });
    }
}


app.getTemp('tamplates/login/login.html').done(function (data) {
    $('main').html(data);

});
