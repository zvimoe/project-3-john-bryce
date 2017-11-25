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
         getStatmentById('students_courses',data={id:id,returnColum:'c_id'}).done(function(studentCourses){
             getTemp(studentInfo.html).done(function(temp){
                $('#main').empty();
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
        getStatmentById('admins',id).done(function(admin){
            getTemp(adminInfo.html).done(function(temp){
               $('#main').empty();
               $("#main").append(temp,function(){
                $("#main").replace("{{name}}", admin.name);
                $("#main").replace("{{id}}", admin.id);
                $("#main").replace("{{email}}", admin.email);
                $("#main").replace("{{phone}}", admin.phone);
                $("#main").replace("{{image}}", admin.image);

               })
           
          })
      })

    }     // TODO
    function showCourseById(id){
        getStatmentById('courses',id).done(function(student){
            getStatmentById('students_courses',data={id:id,returnColum:'s_id'}).done(function(studentCourses){
                getTemp(courseInfo.html).done(function(temp){
                   $("#main").empty()
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
    getStatmentById('students','all').done(function (students) {
        students = JSON.parse(students);
        getStatmentById('courses','all').done(function(courses){
            courses = JSON.parse(courses);
            getTemp('tamplates/home-page/homepagetest.html').done(function (temp) {
                $('main').empty();
                $('main').html(temp)
                for (let i = 0; i < students.length; i++) {
                    $('#here').append("<li onclick='showStudentById("+students[i].id+")'>" + students[i].name + "</li>")
                }
                for (let i = 0; i < courses.length; i++) {
                    $('#there').append("<li onclick=' showCourseById("+courses[i].id+")'>" + courses[i].name + "</li>")
                }
                $("#main").append(temp,function(){
                    $("#main").replace("{{ammountOfCourses}}",courses.length);
                    $("#main").replace("{{ammountOfCourses}}",students.length);
               
                })

            })
        })
    });
}
function loadAdmins(){
    getStatmentById('admins','all').done(function (admins) {
        admins = JSON.parse(admins);
            getTemp('tamplates/home-page/homepagetest.html').done(function (temp) {
                $('main').empty();
                $('main').html(temp)
                for (let i = 0; i < admins.length; i++) {
                    $('#here').append("<li onclick='showAdminById("+admins[i].id+")'>" + admins[i].name + "</li>")
                }
             
            })
        })
}