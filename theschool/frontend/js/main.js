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
    });
}
function load(admin) {
    let a = JSON.parse(admin);
    switch (a.role_id) {
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
    getObjById(id, 'students', function (student) {
        app.objectDisployter(student, 'tamplates/view/studentInfo.html', function (temp) {
            let elem = $("#main");
            elem.empty()
            elem.append(temp);
            buildBottens('students', student)


        })
    })

}
function showCourseById(id) {
    getObjById(id, 'courses', function (course) {
        app.objectDisployter(course, 'tamplates/view/coursesInfo.html', function (temp) {
            let elem = $("#main");
            elem.empty()
            elem.append(temp);
            buildBottens('courses', course)
        })
    })


}

function showAdminById(id) {
    app.getStatmentById('admins', id).done(function (admin) {
        admin = JSON.parse(admin);
        app.objectDisployter(admin, 'tamplates/view/adminInfo.html', function (temp) {
            let elem = $("#main");
            elem.empty()
            elem.append(temp);
            buildBottens('admins', admin)
        });
    })
}


function loadSchool() {
    getCoursesAndStudents(function () {
        getCourses(function (courses) {
            getStudents(function (students) {
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
                })
            })
        })
    })

}
function loadAdmins() {
    getAdmins(function (admins) {
        getRoles(function(roles) {
            app.getTemp('tamplates/home-page/admin-page.html').done(function (temp) {
                $('main').empty();
                $('main').html(temp)
                for (let i = 0; i < admins.length; i++) {
                    $('#here').append("<li onclick='showAdminById(" + admins[i].id + ")' class='list-group-item'>"
                     + admins[i].name + "<img class ='small-pic' src=" + admins[i].image + "></li>")
                }
                $('#main').html("<h1 class = 'jumbotron'>number of admins is: <hr>" + admins.length + "</h1>")
            })
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
function showDropdown(tabel) {

    var array = window.caches[tabel]
    console.log(array)
    var container = document.createElement('select')
    container.name ='role_id'
    for (let index = 0; index < array.length; index++) {
        var option = document.createElement('option')
        option.value=array[index].id 
        option.innerText=array[index].name
        container.appendChild(option)
    }
    $('#id').append(container)    // <-- $('div select').val() to get value -->
}
function buildRadioBtns(table) {
    var array = window.caches[table]
    for (let index = 0; index < array.length; index++) {
        $('#id').append("<br><input type='radio' value='" + array[index].id +"'>" + array[index].name)
    }
}

function showCreateForm(table, tempName, dropdowntable) {
    app.getTemp('tamplates/view/' + tempName).done(function (temp) {
        $('#main').empty();
        $('#main').append(temp)
        $(document).ready(function () {
            $('#add').click({ table: table },loadImage)
            $('#main').addClass('jumbotron')
            dropdowntable == 'courses' ? buildRadioBtns(dropdowntable) : showDropdown(dropdowntable);
        })
    })
}
function signOut() {
    sessionStorage.clear();
    location.reload();

}
function getCoursesAndStudents(callback) {
    app.getStatmentById('students_courses', 'get all coursse and statments').done(function (res) {
        window.caches.studentCourses = JSON.parse(res)
        callback()
    })
}

function getCourses(callback) {
    app.getStatmentById('courses', 'all').done(function (courses) {
        courses = JSON.parse(courses);
        var courseArray = []
        for (let i = 0; i < courses.length; i++) {
            var v = Object.values(courses[i])
            var courseObject = new Course(...v)
            courseObject.addStudents()
            courseArray.push(courseObject)
        }
        window.caches.courses = courseArray;
        callback(courseArray)
    });
}
function getStudents(callback) {
    app.getStatmentById('students', 'all').done(function (students) {
        students = JSON.parse(students);
        var studentArray = []
        for (let i = 0; i < students.length; i++) {
            var v = Object.values(students[i])
            var studentObject = new Student(...v)
            studentObject.addCourses()
            studentArray.push(studentObject)
        }
        window.caches.students = studentArray
        callback(studentArray)
    })
}
function getAdmins(callback) {
    app.getStatmentById('admins', 'all').done(function (admins) {
        admins = JSON.parse(admins);
        var adminsArray = []
        for (let i = 0; i < admins.length; i++) {
            var v = Object.values(admins[i])
            var adminObject = new Student(...v)
            adminsArray.push(adminObject)
        }
        window.caches.admins = adminsArray
        callback(adminsArray)
    })
}
function getRoles(callback) {
    app.getStatmentById('roles', 'all').done(function (roles) {
        roles = JSON.parse(roles);
        var rolesArray = []
        for (let i = 0; i < roles.length; i++) {
            var v = Object.values(roles[i])
            var roleObject = new Role(...v)
            rolesArray.push(roleObject)
        }
        window.caches.roles = rolesArray
        callback(rolesArray)
    })
}






function buildBottens(table, obj) {
    $('#delete').click(function () {
        deleteCourse(obj.id, table)
    })
    $('#edit').click(function () {
        showEditForm(obj);
    })
}
function addList(array, callback) {
    console.log(array)
    for (let i = 0; i < array.length; i++) {
        console.log(array[i].name)
        var il = document.createElement('div')
        il.innerText = array[i].name;
        callback(il)
    }
}
function getObjById(id, table, callback) {
    var array = caches[table]
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) callback(array[i])
    }
}



$('a#school').click(loadSchool)
$('a#admins').click(loadAdmins)
$('a#role').click(signOut)



