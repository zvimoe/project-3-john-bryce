'use strict';
var app = {
    getTemp: function (url) {
        return $.ajax(url)
    },
    getStatment: function (table, id) {

        return app.ajaxcall('GET', table, id)

    },
    loginAjax: function (table, data) {

        return app.ajaxcall('GET', table,data)
    },
    deleteById: function (table, id) {
        console.log(table)
        return app.ajaxcall('DELETE', table, id)

    },
    ajaxcall: function (type, table, data) {
        return $.ajax({
            url: "../backend/api/API.php",
            type: type,
            data: {
                action: table,
                data: data
            },
            dataType: 'json' 
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
    objectDisplayer: function (obj, tempUrl, callback) {
        // takes a obj and replaces all matching key mustaches
        var keys = Object.keys(obj);
        app.getTemp(tempUrl).done(function (temp) {
            // takes a obj and replaces all matching key mustaches
            for (let i = 0; i < keys.length; i++) {
                temp = temp.replace("{{" + keys[i] + "}}", obj[keys[i]]);
                var index = 0
                if (typeof obj[keys[i]] === 'object') {
                    for (index = 0; index < obj[keys[i]].length; index++) {
                        if (index == 1) break;
                        var a = obj[keys[[i][index]]]
                        var list = document.createElement('ul')
                        if (obj.__proto__.constructor.name == 'Student') {
                            list.innerHTML = obj.name + ' is taking these fallowing courses'
                        }
                        else {
                            list.innerHTML = "the fallowing students are taking the " + obj.name + " course"
                        }

                        for (let j = 0; j < a.length; j++) {
                            var li = document.createElement('li')
                            li.innerText = a[j].name
                            list.appendChild(li)
                        }
                        temp = temp.replace('{{list}}', list.outerHTML)
                    }
                    if (index == 0) {
                        temp = temp.replace('{{list}}', "")
                    }

                }

            }
            callback(temp)
        })

    },
    insertNewData: function (table, formdata) {
        formdata.append('action', table)
        return $.ajax({
            url: "../backend/api/API.php",
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            data: formdata
        });
    }

}