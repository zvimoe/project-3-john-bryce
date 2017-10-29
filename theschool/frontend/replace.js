 $.ajax('service/courses.json')
    .always(function(data) {
        $.ajax('views/course.html')
        .always(function(courseTemplate) {

            for (let i=0; i < data.length; i++) {
                var c = courseTemplate;
                c = c.replace("{{name}}", data[i].name);
                c = c.replace("{{subtitle}}", data[i].subtitle);
                c = c.replace("{{availability}}", data[i].availability);
                c = c.replace("{{imgsrc}}", data[i].imgsrc);
                c = c.replace("{{imgalt}}", data[i].imgalt);

                let d = document.createElement('div');
                d.innerHTML = c;
                document.getElementById('courses').appendChild(d);
            }

        });

});