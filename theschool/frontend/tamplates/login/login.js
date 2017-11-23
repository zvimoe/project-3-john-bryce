'use strict'
function login() {
    let username = $("#username").val()
    let password = $("#password").val()
    $.ajax({
        url: "../backend/api/API.php",
        type: 'GET',
        data: {
            action: 'login',
            data: {
                name: username,
                password: password
            }
        },
        success: function (role) {
            switch (role) {
                case "1":
                    $('body').css('background-color', 'red');
                    break;
                case "2":
                    $('#admin-tab').css('display', 'none')
                    break;
            }
            GetList('students').done(function (students) {
                students = JSON.parse(students);
                GetList('courses').done(function(courses){
                    courses = JSON.parse(courses);
                getTemp('tamplates/home-page/homepagetest.html').done(function (temp) {
                    $('main').empty();
                    $('main').html(temp)
                    for (let i = 0; i < students.length; i++) {
                        $('#here').append("<li onclick='showStudentById("+students[i].id+")'>" + students[i].name + "</li>")
                    }
                    for (let i = 0; i < courses.length; i++) {
                        $('#there').append("<li>" + courses[i].name + "</li>")
                    }
                })
                })
            });

        }


    });
}





function getTemp(url) {
    return $.ajax(url)
}
function GetList($listName) {
    return $.ajax({
        url: "../backend/api/API.php",
        type: 'GET',
        data: {
            action: $listName,
            data: { id: 'all' }
        },
    });
}
function showStudentById(id){
     getStatmentById('student',id).done(function(student){
         getStatmentById('coursesOfStudent',id).done(function(studentCourses){
            //  return {
            //      student:student,
            //      studentCourses:studentCourses
            //  }
            $("")
         })
     })

}