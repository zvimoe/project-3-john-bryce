'use strict';
function Person(id, name, phone, email,password, image) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.image = image;
    this.phone = phone;
    this.password = password;
}

function Admin(id, name, role_id, phone, email, password, image) {
    Person.call(this, id, name, phone, email,password, image);
    this.role_id = role_id;

}
 function Role(id,name){  
    this.name=name;     
    this.id =id; 
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
           getObjById(studentId,'students',function (student) {
                students.push(student);
                
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
           getObjById( courseId, 'courses',function (course) {
               courses.push(course);
            })
           
        }
    }
    this.courses=courses
}
