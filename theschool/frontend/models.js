'use strict';
function Person(id, name, phone, email,password, image) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.image = image;
    this.phone = phone;
}

function Admin(id, name, role_id, phone, email, password, image) {
    Person.call(this, id, name, phone, email,password, image);
    this.role_id = role_id;

}


function Student(id, name, phone, email,password, image) {
    Person.call(this, id, name, phone, email,password, image)
}


function Course(id, name, description, image) {
    this.id =id;
    this.name = name;
    this.description = description;
    this.image = image
}

Course.prototype.addStudents = function () {               // gets the courses of the student from diffrent table
    var sc = caches.studentCourses
    var students = [];
    for (var i = 0; i < sc.length; i++) {
        var studentId = sc[i].s_id;
        var courseId = sc[i].c_id;
        if (courseId == this.id) {
            app.getStatmentById('students', studentId).done(function (student) {
                var s =JSON.parse(student)
                students.push(s);
                
            })
        }
    }
    this.students = students;
}

Student.prototype.addCourses = function () {               // gets the students of the course from diffrent table
    var sc = caches.studentCourses
    var courses = []
    for (var i = 0; i < sc.length; i++) {
        var studentId = sc[i].s_id;
        var courseId = sc[i].c_id;
        if (studentId == this.id) {
            app.getStatmentById('courses', courseId).done(function (course) {
                
                var c =JSON.parse(course)
                courses.push(c);
            })
           
        }
    }
    this.courses=courses
}
