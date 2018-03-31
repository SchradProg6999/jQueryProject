//api:  http://www.ist.rit.edu/api/

function showNews(){

    myXHR('get', {
        'path': '/news'
    }).done(function(json){
        $(".ui-dialog-content").dialog('close');
        let x = '';
        x += "<div><h1>News and Events: Archive</h1>"
        $.each(json.older, function(i, ele){
            x += "<div><h1>" + ele.title + "</h1>";
            x += "<p>" + ele.date + "</p>";
            x += "<p>" + ele.description + "</p>";
            x += "</div>";
        });

        x += "</div>";
        $(x).dialog({
            autoOpen: true,
            show: {
                effect: "fade",
                duration: 300
            },
            hide: {
                effect: "fade",
                duration: 300
            },
            draggable: false,
            resizeable: false
        });
    });
}


function showFacResearch(facultyResearch){

    var facResearchID = $(facultyResearch).attr('username');
    var uri = '/research/byFaculty/username=' + facResearchID;
    var encodedURI = encodeURI(uri);
    myXHR('get', {
        'path':encodedURI
    }).done(function(json) {
        $(".ui-dialog-content").dialog('close');
        console.log(json);

        let popUp = '';
        popUp += "<div><h1>" + json.facultyName + "</h1>";
        popUp += "<div><ul>";

        $.each(json.citations, function(i, ele){
            popUp += "<li>" + ele +"</li>";
        });

        popUp += "</ul></div></div>";
        $(popUp).dialog({
            autoOpen: true,
            show: {
                effect: "fade",
                duration: 300
            },
            hide: {
                effect: "fade",
                duration: 300
            },
            draggable: false,
            resizeable: false
        });
    });
}



function showInterestResearch(researchTopic){
    var researchID = $(researchTopic).attr('areaname');
    var uri = '/research/byInterestArea/areaName=' + researchID;
    var encodedURI = encodeURI(uri);
    myXHR('get', {
        'path': encodedURI
    }).done(function(json) {
        $(".ui-dialog-content").dialog('close');
        let popUp = '';
        popUp += "<div><div class='research-popup-header'><h1>Research By Domain Area: " + researchID + "</h1></div>";
        popUp += "<div><ul>";

        $.each(json.citations, function(i, ele){
            popUp += "<li>" + ele + "</li>";
        });

        popUp += "</ul></div>";
        popUp += "</div>";
        $(popUp).dialog({
            autoOpen: true,
            show: {
                effect: "fade",
                duration: 300
            },
            hide: {
                effect: "fade",
                duration: 300
            },
            draggable: false,
            resizeable: false
        });
    });
}



function showFacInfo(who) {
    // get the data-id to get more information
    var id = $(who).attr('data-id');
    myXHR('get', {
        'path': '/people/faculty/username=' + id
    }).done(function(json) {
        console.log(json);
        $(".ui-dialog-content").dialog('close');
        let popUp = '';
        popUp += "<div class='people-popup-header'><p><span>" + json.name + ", </span>" + json.title + "</p>";
        popUp += "<div class='people-popup-image'><img src='" + json.imagePath + "'/></div>";

        if(json.office != null){
            popUp += "<div class='people-popup-contact'><p>" + json.office + "</p>";
        }
        popUp += "<p>" + json.phone + "</p>";
        popUp += "<p>" + json.email + "</p></div>";

        $(popUp).dialog({
            autoOpen: true,
            show: {
                effect: "fade",
                duration: 300
            },
            hide: {
                effect: "fade",
                duration: 300
            },
            draggable: false,
            resizeable: false
        });
    });

} // end showFacInfo



function showStaffInfo(who) {
    // get the data-id to get more information
    var id = $(who).attr('data-id');
    myXHR('get', {
        'path': '/people/staff/username=' + id
    }).done(function(json) {
        console.log(json);
        $(".ui-dialog-content").dialog('close');
        let popUp = '';
        popUp += "<div class='people-popup-header'><p><span>" + json.name + ", </span>" + json.title + "</p>";
        popUp += "<div class='people-popup-image'><img src='" + json.imagePath + "'/></div>";

        if(json.office != null){
            popUp += "<div class='people-popup-contact'><p>" + json.office + "</p>";
        }
        if(json.phone != null){
            popUp += "<p>" + json.phone + "</p>";
        }
        popUp += "<p>" + json.email + "</p></div>";
        $(popUp).dialog({
            autoOpen: true,
            show: {
                effect: "fade",
                duration: 300
            },
            hide: {
                effect: "fade",
                duration: 300
            },
            draggable: false,
            resizeable: false
        });
    });

} // end showStaffInfo



function showFaculty(){
    // display the faculty
    myXHR('get', {
        'path': '/people/faculty'
    }).done(function(json) {
        let x = '';
        $("#people-section").html(x);
        $.each(json.faculty, function() {
            x = "<div class='people-card-div' onclick = 'showFacInfo(this)'; ";
            x += 'data-id = "' + $(this)[0].username + '" ';
            x += 'style = "cursor:pointer;"><h3>' + $(this)[0].name + '</h3>';
            x += '<p>' + $(this)[0].title + '</p>';
            x += '</div><hr/>';

            $('#people-section').append(x);
        });
    });
}



function showStaff(){
    //display the staff
    myXHR('get', {
        'path': '/people/staff'
    }).done(function(json) {
        let x = '';
        $("#people-section").html(x);
        $.each(json.staff, function() {
            x = "<div class='people-card-div' onclick = 'showStaffInfo(this)'; ";
            x += 'data-id = "' + $(this)[0].username + '" ';
            x += 'style = "cursor:pointer;"><h3>' + $(this)[0].name + '</h3>';
            x += '<p>' + $(this)[0].title + '</p>';
            x += '</div><hr/>';

            $('#people-section').append(x);
        });
    });
}



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


    // FACULTY AND STAFF HEADER
    myXHR('get', {
        'path': '/people/'
    }).done(function(json) {
        let x = '';
        x += "<div id='people-header'><h1>" + json.title + "</h1>";
        x += "<p>" + json.subTitle + "</p>";
        x += "<div onclick='showFaculty()' class='people-choice'><h3>Faculty</h3></div>";
        x += "<div onclick='showStaff()' class='people-choice'><h3>Staff</h3></div>";
        x += "</div>";

        $('#people-section-header').append(x);
    });



    // DISPLAY THE FACULTY
    myXHR('get', {
        'path': '/people/faculty'
    }).done(function(json) {
        let x = '';
        //console.log(json);

        $.each(json.faculty, function() {
            x = "<div class = 'people-card-div' onclick = 'showFacInfo(this)'; ";
            x += 'data-id = "' + $(this)[0].username + '" ';
            x += 'style = "cursor:pointer;"><h3>' + $(this)[0].name + '</h3>';
            x += '<p>' + $(this)[0].title + '</p>';
            x += '</div><hr/>';

            $('#people-section').append(x);
        });
    });

    myXHR('get', {
        'path': '/research/byInterestArea'
    }).done(function(json) {
        console.log(json);

        $.each(json.byInterestArea, function(){
            let x = '';
            x += "<div class = 'research-card-div' onclick = 'showInterestResearch(this)'; ";
            x += "areaname = '" + $(this)[0].areaName + "' ";
            x += "style = 'cursor:pointer;'>";
            x += "<h3>" + $(this)[0].areaName + "</h3>";
            x += "</div><hr/>";

            $('#research-section').append(x);
        });
    });

    myXHR('get', {
        'path': '/research/byFaculty'
    }).done(function(json) {
        console.log(json);

        $.each(json.byFaculty, function(i, ele){
            let x = '';
            x += "<div class = 'research-card-fac-div' onclick = 'showFacResearch(this)'; ";
            x += "username = '" + ele.username + "' ";
            x += "style = 'cursor:pointer;'>";
            x += "<img src='https://ist.rit.edu/assets/img/people/" + ele.username + ".jpg'/>"
            x += "<h3>" + ele.facultyName + "</h3>";
            x += "</div>";

            $('#research-faculty-section').append(x);
        });
    });

    myXHR('get', {
        'path': '/resources'
    }).done(function(json) {
        console.log(json);

        let x = '';
        x += "<div class = 'resource-header'><h1>" + json.title + "</h1></div>";
        x += "<div class = 'resource-header'><h1>Current Students</h1></div>";
        x += "<div class = 'resource-cards'>";
        x += "<div><h3>" + json.coopEnrollment.title + "</h3></div>";
        x += "<div><h3>Forms</h2></div>";
        x += "<div><h3>" + json.tutorsAndLabInformation.title + "</h3></div>";
        x += "<div><h3>" + json.studyAbroad.title + "</h3></div>";
        x += "<div><h3>" + json.studentServices.title + "</h3></div>";
        x += "<div><h3>" + json.studentAmbassadors.title + "</h3></div>";
        x += "</div>";

        $('#current-resources-section').append(x);
    });


    myXHR('get', {
        'path': '/footer'
    }).done(function(json) {
        console.log(json);

        let x = '';
        x += "<div class = 'footer-header'>";
        x += "<div class = 'social-presence'><h1>" + json.social.title + "</h1>";
        x += "<h3>" + json.social.tweet + "</h3>";
        x += "<h4>" + json.social.by + "</h4>";
        x += "<a href='" + json.social.twitter + "'><i class='fab fa-twitter-square'></i></a>";
        x += "<ahref='" + json.social.facebook + "'><i class='fab fa-facebook-square'></i></a>";
        x += "<div class = 'apply-div-footer'><a href='" + json.quickLinks[0].href + "'>Apply Now</a></div>";
        x += "<div class = 'bottom-footer-wrapper'><div class = 'quicklinks-footer'>"
        x += "<ul>";

        $.each(json.quickLinks, function(i, ele){
            x += "<li><a href='" + ele.href + "'>" + ele.title + "</a></li>";
        });

        x += "</ul></div>";
        x += "<div class = 'copyright-footer'>" + json.copyright.html + "</div>";
        x += "</div>";

        $("#footer").append(x);
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
