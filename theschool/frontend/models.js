'use strict';
function Person(id,name,phone,email,image){
    this.id=id;
    this.name=name;
    this.email=email;
    this.image=image;
    this.phone=phone;
}

function Admin(id,name,phone,email,image,role_id){
    Person.call(this,id,name,phone,email,image);
    this.role_id = role_id;
}

Admin.prototype.destInfo = {
    
   info:{
    place:$('#main'),
    tempUrl:'tamplates/view/adminInfo.html'
   },
   navBar:{
       place:$('#userInfo'),
       tempUrl:'tamplates/view/userInfo.html'

   }
}
function Student(id,name,phone,email,image){
    Person.call(this,id,name,phone,email,image)
}
Student.prototype.destInfo = {
 
        place:$('#main'),
        tempUrl:'tamplates/view/studentInfo.html'
    }
Student.prototype.getCourses= function(app){
        app.getStatmentBySelectedColumValue('students_courses','s_id',this.id).done(function(res){
          this.courses=res;
        })
    }

function Course(id,name,description,image){
    this.name=name;
    this.description=description;
    this.image=image
}
Course.prototype.destInfo = {

    place:$('#main'),
    tempUrl:'tamplates/view/coursetInfo.html'
}

Course.prototype.getStudents= function(app){
    app.getStatmentBySelectedColumValue('students_courses','c_id',this.id).done(function(res){
      this.courses=res;
    })
   }
