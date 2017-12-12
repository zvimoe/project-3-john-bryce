'use strict';

app.getTemp('tamplates/login/login.html').done(function (data) {
    $('main').html(data);

    $('#login').click(function(){

            let username = $("#username").val()
            let password = $("#password").val()
            let data = {
                name: username,
                password: password
            }
            app.loginAjax('login', data).done(function (admin) {
               
                let values =Object.values(JSON.parse(admin));
                let a = new Admin(...values)
                api.load(a)
            
            });
        })
});

var api= {
    load:function(admin){
       api.objectDisployter(admin,'navBar')
        switch (admin.role_id) {
            case "1":
                loadAdmins()
                break;
            case "2":
                $('#admin-tab').css('display', 'none');
                loadSchool()
                break;
           
        }

    },
    objectDisployter:function(obj,destnation){
       var keys=Object.keys(obj);
        app.getTemp(obj.destInfo[destnation].tempUrl).done(function(temp){
                for(let i=0;i<keys.length;i++){
                  temp = temp.replace("{{"+keys[i]+"}}",obj[keys[i]]);

                 }
                var element=obj.destInfo[destnation].place;
                element.append(temp);
        })
    },
    loadStudent:function(id){

        app.getStatmentById('students',id).done(function(stmt){
            let values =Object.values(JSON.parse(stmt));
            let s = new Student(...values);
            s.getCourses(app)
            console.log(s)

        })
         

    }
}
    
