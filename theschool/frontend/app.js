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
            url: "../backend/api/file-upload.php",
            enctype: 'multipart/form-data',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            type: 'POST'
        });

    },
    objectDisployter: function (obj, tempUrl, contID) {
       
            var keys = Object.keys(obj);
            app.getTemp(tempUrl).done(function (temp) {
                for (let i = 0; i < keys.length; i++) {
                    temp = temp.replace("{{" + keys[i] + "}}", obj[keys[i]]);

                }
                let elem = $("#" + contID);
                elem.empty()
                elem.append(temp);
                $('#deleteCourse').click(function () {
                    deleteCourse(obj.id)
                })
                $('#editCourse').click(function () {
                    showEditForm(obj);
                })
            })
        
    },
    insertNewData: function (table, formData) {
        formData.append('action', table)
        return $.ajax({
            url: "../backend/api/API.php",
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            data: formData

        });
    }

}



