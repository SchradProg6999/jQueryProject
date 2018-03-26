//api:  http://www.ist.rit.edu/api/
$(document).ready(function() {

    // start with the about page
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

    // display undergraduate programs
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



    // display graduate programs
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


    // display minor programs
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



    // display employment information
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
            x += "<p>" + json.degreeStatistics.statistics[].value + "</p>";
            x += "<p>" + json.degreeStatistics.statistics[].description + "</p>";
            count ++;
        });
    });



    // display the faculty
    myXHR('get', {
        'path': '/people/faculty'
    }).done(function(json) {
        //console.log(json);
        let x = '';

        $.each(json.faculty, function() {
            x = '<div onclick = "facMore(this)" ';
            x += 'data-id = "' + $(this)[0].username + '" ';
            x += 'style = "cursor:pointer;"><h3>' + $(this)[0].name + '</h3>';
            x += '<p>' + $(this)[0].title + '</p>';
            x += '<img src = "' + $(this)[0].imagePath + '"/></div><hr/>';
        });

        $('#people-section').html(x);
    });




    function facMore(who) {
        // get the data-id to get more information

        var id = $(who).attr('data-id');

        myXHR('get', {
            'path': '/people/faculty/username=' + id
        }).done(function(json) {
            console.log(json);
        });

    } // end facMore

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
