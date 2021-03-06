'use strict';

if (!sessionStorage.getItem('user')) {
    showLogin()
}
else {
    load(JSON.parse(sessionStorage.getItem('user')))
}
function showLogin() {
    app.getTemp('tamplates/login/login.html').done(function (data) {

        $('main').html(data);
    })
}

function login() {

    let username = $("#username").val()
    let password = $("#password").val()
    let data = {
        name: username,
        password: password
    }
    app.loginAjax('login', data).done(function (user) {
        
        sessionStorage.setItem('user', JSON.stringify(user))
        load(user)

    });
}
function load(a) {
    
    $('#welcome-banner').css('display', 'none')
    $('#userpic').attr("src", a.image);
    $('#name').append('hi ' + a.name)
    $('#role').append('sign out')
    $('#school').css('display', 'unset')

    switch (a.role_id) {
        case 1:
        case 2:
            $('#admins').css('display', 'unset');
            loadAdmins()
            break;
        case 3:
            loadSchool()
            break;
    }
}
function showObjById(id, table) {
    getObjById(id, table, function (obj) {
        var url = 'tamplates/view/'
        switch (table) {
            case 'admins':
                url += 'adminInfo.html'
                break;
            case 'courses':
                url += 'coursesInfo.html';
                break;
            case 'students':
                url += 'studentInfo.html';
                break;
        }
        app.objectDisplayer(obj, url, function (temp) {
            let elem = $("#main");
            elem.empty()
            elem.append(temp);
            buildBottens(table, obj)
        });
    })
}
function showUser() {
    var user = JSON.parse(sessionStorage.getItem('user'))

    app.objectDisplayer(user, 'tamplates/view/adminInfo.html', function (temp) {
        let elem = $('main');
        elem.empty()
        elem.append(temp);
        buildBottens('admins', user)
    });
}
function loadSchool(callback) {
    getStudents(function (students) {
        getCourses(function (courses) {
            getCoursesAndStudents(function () {
                applyCoursesStudents(courses, students, function () {
                    app.getTemp('tamplates/home-page/school-page.html').done(function (temp) {
                        $('main').empty();
                        $('main').html(temp)
                        for (let i = 0; i < students.length; i++) {
                            $('#here').append("<li onclick=' showObjById(" + students[i].id + ",`students`)' class='list-group-item'>"
                                + students[i].name + "<img class ='small-pic' src=" + students[i].image + "></li>")

                        }
                        for (let i = 0; i < courses.length; i++) {
                            $('#there').append("<li onclick=' showObjById(" + courses[i].id + ",`courses`)' class='list-group-item'>"
                                + courses[i].name + "<img class ='small-pic' src=" + courses[i].image + "></li>")
                        }
                    })
                })
            })
        })
    })

    if (callback && callback.type != 'click') {
        callback()
    }

}
function loadAdmins() {
    getAdmins(function (admins) {
        getRoles(function (roles) {
            app.getTemp('tamplates/home-page/admin-page.html').done(function (temp) {
                $('main').empty();
                $('main').html(temp)
                for (let i = 0; i < admins.length; i++) {
                    $('#here').append("<li onclick='showObjById(" + admins[i].id + ",`admins`)' class='list-group-item'>"
                        + admins[i].name + "<img class ='small-pic' src=" + admins[i].image + "></li>")
                }
                $('#main').html("<h1 class = 'jumbotron'>number of admins is: <hr>" + admins.length + "</h1>")
            })
        })
    })
}
function deleteCourse(id, table) {
    if (confirm("this " + table + " will be deleted with no return do yo wont to continue"))
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
    container.name = 'role_id'
    for (let index = 0; index < array.length; index++) {
        var option = document.createElement('option')
        option.value = array[index].id
        option.innerText = array[index].name
        container.appendChild(option)
    }
    $('#id').append(container)    // <-- $('div select').val() to get value -->
}
function buildRadioBtns(table) {
    var array = window.caches[table]
    for (let index = 0; index < array.length; index++) {
        $('#id').append("<br><input type='radio' value='" + array[index].id + "'>" + array[index].name)
    }
}
function showCreateForm(table, tempName, dropdowntable) {
    app.getTemp('tamplates/view/' + tempName).done(function (temp) {
        $('#main').empty();
        $('#main').append(temp)
        $(document).ready(function () {
        $('#add').click({ table: table }, submitForm)

            $('#main').addClass('jumbotron')
            dropdowntable == 'courses' ? buildRadioBtns(dropdowntable) : showDropdown(dropdowntable);
        })
    })
}
function showEditForm(table, tempName) {
    app.getTemp('tamplates/view/' + tempName).done(function (temp) {
        $('#main').empty();
        $('#main').append(temp)
        $(document).ready(function () {
            $('#add').click({ table: table }, EditForm)
            $('#main').addClass('jumbotron')
            table == 'students' ? buildRadioBtns('courses') : showDropdown('roles');
        })
    })
}
function submitForm(event) {
    event.preventDefault();
    var form = $('form')[0];
    console.log(form)
    var formData = new FormData(form);
    var table = event.data.table;
    formData.append('action', table);
    app.insertImage(table, formData).done(() => { app.insertNewData(table, formData); }).done((res) => {

        switch (table) {
            case 'courses':
                loadSchool()
                $('#main').append('new course inserted')
                break;
            case 'students':
                let inputs = $('div#id input')
                let courses = [];
                for (let i = 0; i < inputs.length; i++) {
                    const element = inputs[i];
                    if (element.checked == true) {
                        courses.push(element.value)
                    }
                }
                getStudents(function (studentArray) {
                    var student = studentArray[studentArray.length - 1];
                    addCoursesOfStudent(courses, student.id, function () {
                        loadSchool(function () {
                            showObjById(student.id, `students`)
                        })
                    })
                })
        }
    })
}
function addCoursesOfStudent(courses, id, callback) {
    var arrayData = []
    courses.forEach(course => {
        var obj = {}
        obj[id] = course
        arrayData.push(obj)
    });
    console.log(JSON.stringify(arrayData))
    var formdata = new FormData
    formdata.append('data', JSON.stringify(arrayData))
    app.insertNewData('students_courses', formdata).done(callback())
}
function getCoursesAndStudents(callback) {
    app.getStatment('students_courses', 'get all coursse and statments').done(function (res) {
        window.caches.studentCourses = res
        callback()
    })
}
function applyCoursesStudents(courses, students, callback) {
    courses.forEach(course => {
        course.addStudents()
    });
    students.forEach(student => {
        student.addCourses()
    });
    callback();

}
function getCourses(callback) {
    app.getStatment('courses', 'all').done(function (courses) {
        var courseArray = []
        for (let i = 0; i < courses.length; i++) {
            var v = Object.values(courses[i])
            var courseObject = new Course(...v)
            courseArray.push(courseObject)
        }
        window.caches.courses = courseArray;
        callback(courseArray)
    });
}
function getStudents(callback) {
    app.getStatment('students', 'all').done(function (students) {
        var studentArray = []
        for (let i = 0; i < students.length; i++) {
            var v = Object.values(students[i])
            var studentObject = new Student(...v)
            studentArray.push(studentObject)
        }
        window.caches.students = studentArray
        callback(studentArray)
    })
}
function getAdmins(callback) {
    app.getStatment('admins', 'all').done(function (admins) {
        var adminsArray = []
        for (let i = 0; i < admins.length; i++) {
            var v = Object.values(admins[i])
            var adminObject = new Admin(...v)
            adminsArray.push(adminObject)
        }
        window.caches.admins = adminsArray
        callback(adminsArray)
    })
}
function getRoles(callback) {
    app.getStatment('roles', 'all').done(function (roles) {
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
        showEditForm(table, table + 'UpdateForm.html');
    })
}
function getObjById(id, table, callback) {
    var array = caches[table]
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) callback(array[i])
    }
}
function signOut() {
    sessionStorage.clear();
    location.reload();

}
$('a#school').click(loadSchool)
$('a#admins').click(loadAdmins)
$('a#role').click(signOut)
$('a#name').click(showUser)




