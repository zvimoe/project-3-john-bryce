'use strict';
(function () {
    if (!sessionStorage.getItem('admin')) {
        app.getTemp('tamplates/login/login.html').done(function (data) {

            $('main').html(data);
        })
    }
    else {
        load(sessionStorage.getItem('admin'))
    }
})();

function login() {
    let username = $("#username").val()
    let password = $("#password").val()
    let data = {
        name: username,
        password: password
    }
    app.loginAjax('login', data).done(function (admin) {
        sessionStorage.setItem('admin', admin)
        load(admin)
        var b = sessionStorage.getItem('admin');
        console.log(b)


    });
}
function load(admin) {
    let a = JSON.parse(admin);
    let role = a.role_id;
    console.log(role)
    switch (role) {
        case 2:
            $('#name').append('hi ' + a.name)
            $('#role').append('sign out')
            loadAdmins()
            break;
        case 1:
            $('#name').append('hi ' + a.name)
            $('#role').append('sign out')
            console.log('works')
            $('#admins').css('display', 'none');
            loadSchool()
            break;
    }
}

function showStudentById(id) {
    app.getStatmentById('students', id).done(function (student) {
            student = JSON.parse(student);
            // studentCourses = [];
            // getcourses(id, function (res) {
            //     studentCourses.push(res)
            // });
            app.objectDisployter(student, 'tamplates/view/studentInfo.html', function (temp) {
                let elem = $("#main");
                elem.empty()
                elem.append(temp);
                buildBottens('students', student)
                // addList(studentCourses,function(list) {
                //      $('#ul').append(list)

                // })



            })
        })
  
}
function showCourseById(id) {
    app.getStatmentById('courses', id).done(function (course) {
          course = JSON.parse(course);
            app.objectDisployter(course, 'tamplates/view/coursesInfo.html', function(temp){
                let elem = $("#main");
                elem.empty()
                elem.append(temp);
                buildBottens('courses', course)
                // addList(studentCourses,function(list) {
                //      $('#ul').append(list)

                })



           
    })


}

function showAdminById(id) {
    app.getStatmentById('admins', id).done(function (admin) {
        admin = JSON.parse(admin);
        app.objectDisployter(admin, 'tamplates/view/adminInfo.html', 'main', 'admins')
        $('#deleteCourse').click(function () {
            console.log('bb')
            deleteCourse(student.id)
        })
        $('#editCourse').click(function () {
            showEditForm(admin);
        })
    });

}

// TODO


function loadSchool() {
    app.getStatmentById('students', 'all').done(function (students) {
        students = JSON.parse(students);
        app.getStatmentById('courses', 'all').done(function (courses) {
            courses = JSON.parse(courses);
            app.getTemp('tamplates/home-page/school-page.html').done(function (temp) {
                $('main').empty();
                $('main').html(temp)
                for (let i = 0; i < students.length; i++) {
                    $('#here').append("<li onclick=' showStudentById(" + students[i].id + ")' class='list-group-item'>"
                        + students[i].name + "<img class ='small-pic' src=" + students[i].image + "></li>")

                }
                for (let i = 0; i < courses.length; i++) {
                    $('#there').append("<li onclick=' showCourseById(" + courses[i].id + ")' class='list-group-item'>"
                        + courses[i].name + "<img class ='small-pic' src=" + courses[i].image + "></li>")
                }
                getCoursesAndStudents()

            })
        })
    });
}
function loadAdmins() {
    app.getStatmentById('admins', 'all').done(function (admins) {
        admins = JSON.parse(admins)
        app.getTemp('tamplates/home-page/admin-page.html').done(function (temp) {
            $('main').empty();
            $('main').html(temp)
            for (let i = 0; i < admins.length; i++) {
                $('#here').append("<li onclick='showAdminById(" + admins[i].id + ")' class='list-group-item'>" + admins[i].name + "</li>")
            }
            $('#main').html("<h1 class = 'jumbotron'>number of admins is: <hr>" + admins.length + "</h1>")

        })
    })
}
function deleteCourse(id, table) {
    if (confirm("this course will be deleted with no return do yo wont to continue"))
        app.deleteById(table, id).done(function (res) {
            let message = ""
            if (typeof (res) == 'string') {
                message = res
            }
            else {
                message = "course was deleted"
            }
            $('#main').empty()
            $('#main').append(message);
            loadSchool()
        });

}
function showCourseForm(table) {
    app.getTemp('tamplates/view/createCourse.html').done(function (temp) {
        $('#main').empty();
        $('#main').append(temp);
        $('#addcourse').click({ table: table }, loadImage)

    });

}
function showStudentForm(table){
    app.getTemp('tamplates/view/createStudent.html').done(function (temp) {
        $('#main').empty();
        $('#main').append(temp);
        $('#addstudent').click({ table: table }, loadImage)
    });
}
function showEditForm(obj) {
    
    $('#main').empty()
    var keys = Object.keys(obj)
    var form =document.createElement('form')
    for (var i = 0; i < keys.length; i++) {
        var input = document.createElement('input')
        input.id = input.name = input.placeholder = keys[i]
        form.appendChild(input)
        input.value=obj[keys[i]]
    }
    var button =document.createElement('button');
    button.innerText='update';
    form.appendChild(button)
    button.addEventListener('click',function(event){
        event.preventDefault()
         console.log(form)
    })
    $('#main').addClass('jumbotron')
    $('#main').append(form)

    
}
function signOut() {
    sessionStorage.clear();
    location.reload();

}
function getCoursesAndStudents() {
    app.getStatmentById('students_courses', 'get all coursse and statments').done(function (res) {
        window.caches.studentCourses = JSON.parse(res)



    })
}
function getcourses(id, callback) {
    var sc = caches.studentCourses
    for (var i = 0; i < sc.length; i++) {
        if (sc[i].s_id == id) {
            app.getStatmentById('courses', sc[i].c_id).done(function (course) {
                callback(JSON.parse(course));
            })

            // callback(course)
        }
    }

}
function buildBottens(table, obj) {
    $('#delete').click(function () {
        deleteCourse(obj.id, table)
    })
    $('#edit').click(function () {
        showEditForm(obj);
    })
}
function addList(array,callback) {
    console.log(array)
    for(let i = 0; i < array.length; i++) {
        console.log(array[i].name)
        var il = document.createElement('div')
        il.innerText = array[i].name;
        callback(il)
    }



}
$('a#school').click(loadSchool)
$('a#admins').click(loadAdmins)
$('a#role').click(signOut)




