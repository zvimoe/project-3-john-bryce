'use strict'
function login() {
    let username = $("#username").val()
    let password = $("#password").val()
    let data = {   name: username,
                  password: password
                }
    loginAjax('login',data).done(function(role,admin){
            switch (role) {
                case "1":
                   loadAdmins()
                    break;
                case "2":
                    $('#admin-tab').css('display', 'none');
                    loadSchool()
                    break;
            }
          
        });
    }

function showStudentById(id){
     getStatmentById('students',id).done(function(student){
         let data={id:id,returnColum:'c_id'}
         getStatmentById('students_courses',data).done(function(studentCourses){
            app.getTemp('tamplates/view/studentInfo.html').done(function(temp){
                $("#main").append(temp,function(){
                    $("#main").replace("{{name}}", student.name);
                    $("#main").replace("{{id}}", student.id);
                    $("#main").replace("{{email}}", student.email);
                    $("#main").replace("{{phone}}", student.phone);
                    $("#main").replace("{{image}}", student.image);

                })
            
           })
       })

    })
}
    function showAdminById(id){

    }     // TODO
    function showCourseById(id){
        getStatmentById('courses',id).done(function(student){
            let data={id:id,returnColum:'s_id'}
            getStatmentById('students_courses',data).done(function(studentCourses){
                app.getTemp('courseInfo.html').done(function(temp){
                   $("#main").append(temp,function(){
                       $("#main").replace("{{name}}", student.name);
                       $("#main").replace("{{id}}", student.id);
                       $("#main").replace("{{description}}", student.email);
                       $("#main").replace("{{image}}", student.image);
   
                   })
               
              })
          })
   
       })
    }    

 // ajax functions

function getStatmentById(table,id){
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
}
function loginAjax(table,data){
    return $.ajax({
                url: "../backend/api/API.php",
                type: 'GET',
                data: {
                    action:table,
                    data:data
                },
            });
}
function loadSchool(){
    app. getStatmentById('students','all').done(function (students) {
        students = JSON.parse(students);
        app. getStatmentById('courses','all').done(function(courses){
            courses = JSON.parse(courses);
            app.getTemp('tamplates/home-page/homepagetest.html').done(function (temp) {
                $('main').empty();
                $('main').html(temp)
                for (let i = 0; i < students.length; i++) {
                    $('#here').append("<li><a onclick='showStudentById("+students[i].id+")' href='#'>" + students[i].name + "</a></li>")
                }
                for (let i = 0; i < courses.length; i++) {
                    $('#there').append("<li><a onclick=' showCourseById("+courses[i].id+")'>" + courses[i].name + "</a></li>")
                }
                // $("#main").append(temp,function(){
                //     $("#main").replace("{{name}}", student.name);
                //     $("#main").replace("{{id}}", student.id);
                //     $("#main").replace("{{email}}", student.email);
                //     $("#main").replace("{{phone}}", student.phone);
                //     $("#main").replace("{{image}}", student.image);

                // })

            })
        })
    });
}
function loadAdmins(){
    app. getStatmentById('admins','all').done(function (admins) {
        admins = JSON.parse(admins);
        app.getTemp('tamplates/home-page/homepagetest.html').done(function (temp) {
                $('main').empty();
                $('main').html(temp)
                for (let i = 0; i < admins.length; i++) {
                    $('#here').append("<li onclick='showAdminById("+admins[i].id+")'>" + admins[i].name + "</li>")
                }
             
            })
        })
}