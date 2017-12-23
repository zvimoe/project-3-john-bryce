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
    objectDisployter: function (obj, tempUrl, callback) {

        var keys = Object.keys(obj);
        app.getTemp(tempUrl).done(function (temp) {
            for (let i = 0; i < keys.length; i++) {
                temp = temp.replace("{{" + keys[i] + "}}", obj[keys[i]]);
                if (typeof obj[keys[i]] === 'object') {
                    for (var index = 0; index < obj[keys[i]].length; index++) {
                        if (index == 1) break;
                        var a = obj[keys[[i][index]]]
                        var list = document.createElement('ul')
                        if(obj.__proto__.constructor.name=='Student'){
                            list.innerHTML = obj.name + ' is taking these fallowing courses'
                        }
                        else{
                            list.innerHTML = "the fallowing students are taking the "+obj.name+" course"
                        }
                       
                        for (let j = 0; j < a.length; j++) {
                            var li = document.createElement('li')
                            li.innerText = a[j].name
                            list.appendChild(li)
                        }
                        temp =temp.replace('{{list}}',list.outerHTML)
                    }

                }

            }
            callback(temp)
        })

    },
    MultiObjectDisployter(array, tempUrl, callback) {
        for (let i = 0; i < array.length; i++) {
            obj = array[i]
            var keys = Object.keys(obj);
            app.getTemp(tempUrl).done(function (temp) {
                for (let j = 0; j < keys.length; j++) {
                    temp = temp.replace("{{" + keys[j] + "}}", obj[keys[j]]);

                }
            })
            callback(temp)
        }
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



