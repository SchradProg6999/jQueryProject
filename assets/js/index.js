//api:  http://www.ist.rit.edu/api/

function facMore(who) {
    // get the data-id to get more information

    var id = $(who).attr('data-id');

    myXHR('get', {
        'path': '/people/faculty/username=' + id
    }).done(function(json) {
        alert("Info for each faculty member  goes here (not really) yay!!!");
    });

} // end facMore

$(document).ready(function() {

    // ABOUT PAGE
    myXHR('get', {
        'path': '/about/'
    }).done(function(json) {
        //json = JSON.parse(json); 		// if we forget to return the dataType in myXHR
        let x = '<h2>' + json.title + '</h2>';
        x += '<p>' + json.description + '</p>';
        x += '<p>' + json.quote + '</p>';
        x += '<p>' + json.quoteAuthor + '</p>';
        $('#about-section').html(x);
    });

    // DISPLAY UNDERGRADUATE PROGRAMS
    myXHR('get', {
        'path': '/degrees/undergraduate/'
    }).done(function(json) {
        console.log(json);

        // have arrays to decode and display
        $.each(json.undergraduate, function(i, item) {
            let x = '';
            x += "<div class=undergrad-deg id='undergrad-deg" + i + "'><h2>" + item.title + "</h2>";
            x += "<p>" + item.description + "</p></div>";
            // $("#undergrad-deg2").on('click', function(){
            //     console.log("Yay it worked");
            // })
            $('#undergraduate-degree-section').append(x);
        });
    });



    // DISPLAY GRADUATE PROGRAMS
    myXHR('get', {
        'path': '/degrees/graduate/'
    }).done(function(json) {
        console.log(json);

        // have arrays to decode and display
        $.each(json.graduate, function(i, item) {
            if(i < json.graduate.length - 1){
                let x = '';
                x += "<div class=grad-deg id='grad-deg" + i + "'><h2>" + item.title + "</h2>";
                x += "<p>" + item.description + "</p></div>";
                $('#graduate-degree-section').append(x);
            }
            else{
                let x = '';
                x += "<div class=grad-deg id='grad-deg" + i + "'><h2>" + item.degreeName + "</h2>";
                x += "<div>" + item.availableCertificates[0] + "</div>";
                x += "<div>" + item.availableCertificates[1] + "</div>";
                $('#graduate-degree-section').append(x);
            }
        });
    });


    // DISPLAY MINOR PROGRAMS
    myXHR('get', {
        'path': '/minors/'
        //'path': '/course/courseID=CSEC-101' THIS CAN BE USED FOR A SPECIFIC COURSE
    }).done(function(json) {
        console.log(json);
        $.each(json.UgMinors, function(i, item) {
            let x = '';
            x += "<div class=ugMinor id='ugMinor" + i + "'><h3>" + item.title + "</h3></div>";
            $('#minors-section').append(x);
        });
    });



    // DISPLAY EMPLOYMENT INFORMATION
    myXHR('get', {
        'path': '/employment/'
    }).done(function(json) {
        console.log(json);
        let x = '';
        x += "<div id='employment-title'>";
        x += "<h2>" + json.introduction.title + "</h2>";
        x += "</div>"
        $("#employment-section").append(x);

        x = '';
        x += "<div class='employment-subheader-div'>";
        x += "<h3 class='employment-subheader'>" + json.introduction.content[0].title + "</h3>";
        x += "<p>" + json.introduction.content[0].description + "</p>";
        $("#employment-section").append(x);

        x = '';
        let count = 0;
        $.each(json.degreeStatistics, function(i, item){
            x += "<div class='deg-stat' id='deg-stat" + i + "'>";
            x += "<p>" + json.degreeStatistics.statistics[count].value + "</p>";
            x += "<p>" + json.degreeStatistics.statistics[count].description + "</p></div>";
            count ++;
            $("#employment-section").append(x);
        });


        x = '';
        x += "<div class='employment-subheader-div'>";
        x += "<h3 class='employment-subheader'>" + json.introduction.content[1].title + "</h3>";
        x += "<p>" + json.introduction.content[1].description + "</p>";
        $("#employment-section").append(x);

        x = '';
        x += "<div id='employers-list'>";
        x += "<h3 class='employment-subheader'>" + json.employers.title + "</h3>";
        for(var i = 0; i < json.employers.employerNames.length; i++){
            x += "<h4>" + json.employers.employerNames[i] + "</h4>";
        }
        x += "</div>"
        $("#employment-section").append(x);


        x = '';
        x += "<div id='careers-list'>";
        x += "<h3 class='employment-subheader'>" + json.careers.title + "</h3>";
        for(var i = 0; i < json.careers.careerNames.length; i++){
            x += "<h4>" + json.careers.careerNames[i] + "</h4>";
        }
        x += "<div class = 'footnote'><p>*Employers/Careers are randomly pulled from our recent graduates</p></div>";
        x += "</div>"
        $("#employment-section").append(x);
    });



    // DISPLAY COOP TABLE AND EMPLOYMENT TABLE UNDER MAP
    myXHR('get', {
        'path': '/employment/'
    }).done(function(json) {
        let x = '';
        x += "<div class='coop_employment_table'>";
        x += "<h3>" + json.coopTable.title + "</h3>";
        x += "</div>";
        $("#map-section").append(x);

        x = '';
        x += "<div class='coop_employment_table'>";
        x += "<h3>" + json.employmentTable.title + "</h3>";
        x += "</div>";
        $("#map-section").append(x);
    });



    // display the faculty
    myXHR('get', {
        'path': '/people/faculty'
    }).done(function(json) {
        let x = '';

        $.each(json.faculty, function(i, item) {
            x = "<div onclick = 'facMore(this)';";
            x += 'data-id = "' + $(this)[0].username + '" ';
            x += 'style = "cursor:pointer;"><h3>' + $(this)[0].name + '</h3>';
            x += '<p>' + $(this)[0].title + '</p>';
            x += '<img src = "' + $(this)[0].imagePath + '"/></div><hr/>';

            $('#people-section').append(x);
        });
    });
}); // end of document ready


// myXHR
// input: (t,d)
// t = 'get' or 'post'
// d = '{'path':'/about'}
// output: json object ready to consume the callback
//			in our case, json

function myXHR(t, d) {
    return $.ajax({
        type: t,
        cache: false,
        async: true,
        dataType: 'json',
        url: 'proxy.php',
        data: d,
        beforeSend: function() {
            // do something before sending
        }
    }).always(function() {
        //always do this no matter what
    }).fail(function() {
        // handle failure
    })
}
