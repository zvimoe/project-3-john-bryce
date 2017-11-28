'use strict'
function login() {
    let username = $("#username").val()
    let password = $("#password").val()
    let data = {   name: username,
                  password: password
                }
    app.loginAjax('login',data).done(function(role,admin){
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
     app.getStatmentById('students',id).done(function(student){
         let data={id:id,returnColum:'c_id'}
         app.getStatmentById('students_courses',data).done(function(studentCourses){
             student = JSON.parse(student);
            // studentCourses = JSON.parse(studentCourses);
            app.getTemp('tamplates/view/studentInfo.html').done(function(temp){
                 temp =  temp.replace("{{name}}", student.name);
                 temp =  temp.replace("{{id}}", student.id);
                 temp =  temp.replace("{{email}}", student.email);
                 temp =  temp.replace("{{phone}}", student.phone);
                 temp =  temp.replace("{{image}}", student.image);
                    $('#main').empty()
                    $('#main').append(temp);

            })
            
       })

    })
}
function showCourseById(id){
    app.getStatmentById('courses',id).done(function(student){
        let data={id:id,returnColum:'s_id'}
        app.getStatmentById('students_courses',data).done(function(studentCourses){
            student = JSON.parse(student);
           // studentCourses = JSON.parse(studentCourses);
           app.getTemp('tamplates/view/coursesInfo.html').done(function(temp){
                temp =  temp.replace("{{name}}", student.name);
                temp =  temp.replace("{{id}}", student.id);
                temp =  temp.replace("{{description}}", student.description);;
                temp =  temp.replace("{{image}}", student.image);
                   $('#main').empty()
                   $('#main').append(temp);

           })
           
      })

   })
}

    function showAdminById(id){

    }     // TODO


function loadSchool(){
    app. getStatmentById('students','all').done(function (students) {
        students = JSON.parse(students);
        app. getStatmentById('courses','all').done(function(courses){
            courses = JSON.parse(courses);
            app.getTemp('tamplates/home-page/homepagetest.html').done(function (temp) {
                $('main').empty();
                $('main').html(temp)
                for (let i = 0; i < students.length; i++) {
                            $( "<li/>", {
                                    'class':'btn btn-block',
                                    text: students[i].name,
                                    click: function() {
                                        showStudentById(students[i].id)
                                    }
                            })
                                .appendTo( "#here" );
                        
                        }
                for (let i = 0; i < courses.length; i++) {
                    $('#there').append("<li><a onclick=' showCourseById("+courses[i].id+")'>" + courses[i].name + "</a></li>")
                }

            })
        })
    });
}
function loadAdmins(){
    app.getStatmentById('admins','all').done(function (admins) {
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