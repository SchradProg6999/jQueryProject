//api:  http://www.ist.rit.edu/api/

// $(".main-wrapper").tiltedpage_scroll({
//     sectionContainer: ".page-wrapper",
//     angle: 20,
//     opacity: true,
//     scale: false,
//     outAnimation: true,
// });


function showCoopTable(ele){
    $("#table-data-div").toggle();
    $("#coop-table-data").toggle();
}



function showEmploymentTable(ele){
    $("#table-data-div").toggle();
    $("#employment-table-data").toggle();
}



function addBounce(ele){
        $(ele).effect("bounce", {times:3}, "slow");
}


function showMinor(minor){
    var minorName = $(minor).attr('minor');
    var uri = '/minors/UgMinors/name=' + minorName;
    var encodedURI = encodeURI(uri);
    myXHR('get', {
        'path':encodedURI
    }).done(function(json) {

    });

}


function showDegInfo(degObj){
    if($(degObj).attr('degree')){
        var degree = $(degObj).attr('degree');
        var uri = '/degrees/undergraduate/degreeName=' + degree;
    }
    else{
        var degree = $(degObj).attr('data-id');
        var uri = '/degrees/graduate/degreeName=' + degree;
    }
    var encodedURI = encodeURI(uri);
    myXHR('get', {
        'path':encodedURI
    }).done(function(json) {
        console.log(json);
        $(".ui-dialog-content").dialog('close');
        let popUp = '';
        popUp += "<div><h1>" + json.title + "</h1>";
        popUp += "<p class='footnote'></p>";
        popUp += "<hr><ul id='concentration-list'>";

        $.each(json.concentrations, function(i, ele){
            popUp += "<li>" + ele + "</li>";
        });
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
            x = "<div class='people-card-div col-sm-3' onclick = 'showFacInfo(this)'; ";
            x += "data-id = '" + $(this)[0].username + "'";
            x += "style = 'cursor:pointer;'><div class='card-info'><h3>" + $(this)[0].name + "</h3>";
            x += "<p>" + $(this)[0].title + "</p>";
            x += "</div></div>";

            $('#people-section').append(x);
        });

        $(".card-info").mouseenter(function(){
            $(this).css("color", "#eb6124");
        });
        $(".card-info").mouseleave(function(){
            $(this).css("color", "#f8f8f8");
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
            x = "<div class='people-card-div col-sm-3' onclick = 'showStaffInfo(this)'; ";
            x += "data-id = '" + $(this)[0].username + "'";
            x += "style = 'cursor:pointer;'><div class='card-info'><h3>" + $(this)[0].name + "</h3>";
            x += "<p>" + $(this)[0].title + "</p>";
            x += "</div></div>";

            $('#people-section').append(x);
        });

        $(".card-info").mouseenter(function(){
            $(this).css("color", "#eb6124");
        });
        $(".card-info").mouseleave(function(){
            $(this).css("color", "#f8f8f8");
        });
    });
}



$(document).ready(function() {

    // ABOUT PAGE
    myXHR('get', {
        'path': '/about/'
    }).done(function(json) {
        //json = JSON.parse(json); 		// if we forget to return the dataType in myXHR
        let x = '<h1>' + json.title + '</h1>';
        x += '<p>' + json.description + '</p>';
        x += '<p id="quote">"' + json.quote + '"</p>';
        x += '<p id="quote-author">~' + json.quoteAuthor + '</p>';
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
            x += "<div onclick='showDegInfo(this)' degree='" + item.degreeName + "' class='col-sm-4 undergrad-deg' id='undergrad-deg" + i + "'><h2>" + item.title + "</h2>";
            x += "<p>" + item.description + "</p></div>";
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
                x += "<div onclick='showDegInfo(this)' class='grad-deg col-sm-4' id='grad-deg" + i + "' data-id=" + item.degreeName + "><h2>" + item.title + "</h2>";
                x += "<p>" + item.description + "</p></div>";
                $('#graduate-degree-section').append(x);
            }
            else{
                let x = '';
                x += "<div class='col-sm-12' id='grad-certs'><h2>Our Graduate Advanced Certificates</h2>";
                x += "<a href='http://www.rit.edu/programs/web-development-adv-cert' ><div>" + item.availableCertificates[0] + "</div></a>";
                x += "<a href='http://www.rit.edu/programs/networking-planning-and-design-adv-cert'><div>" + item.availableCertificates[1] + "</div></a>";
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
            x += "<div onclick='showMinor(this)' class='ugMinor col-sm-3' id='ugMinor" + i + "' minor='" + item.name + "'>"
            x += "<div class='title-wrapper'><h3>" + item.title + "</h3></div></div>";
            $('#minors-section').append(x);
        });
    });



    // DISPLAY EMPLOYMENT INFORMATION
    myXHR('get', {
        'path': '/employment/'
    }).done(function(json) {
        console.log(json);
        let x = '';
        x += "<div class='col-sm-12' id='employment-title'>";
        x += "<h1>" + json.introduction.title + "</h1>";
        x += "</div>"
        $("#employment-section").append(x);

        x = '';
        x += "<div class='employment-subheader-div col-sm-12'>";
        x += "<h3 class='employment-subheader'>" + json.introduction.content[0].title + "</h3>";
        x += "<p>" + json.introduction.content[0].description + "</p>";
        $("#employment-section").append(x);

        x = '';
        $.each(json.degreeStatistics.statistics, function(i, item){
            x += "<div class='deg-stat-wrapper col-sm-3'>";
            x += "<div class='deg-stats'><h2>" + item.value + "</h2>";
            x += "<p>" + item.description + "</p></div></div>";
        });
        $("#employment-section").append(x);


        x = '';
        x += "<div class='employment-subheader-div col-sm-12'>";
        x += "<h3 class='employment-subheader'>" + json.introduction.content[1].title + "</h3>";
        x += "<p>" + json.introduction.content[1].description + "</p>";
        $("#employment-section").append(x);

        x = '';
        x += "<div class='col-sm-12' id='employers-list'>";
        x += "<h2 class='employment-subheader'>" + json.employers.title + "</h2>";
        for(var i = 0; i < json.employers.employerNames.length; i++){
            x += "<h3 class='col-sm-2'>" + json.employers.employerNames[i] + "</h3>";
        }
        x += "</div>"
        $("#employment-section-2").append(x);


        x = '';
        x += "<div class='col-sm-12' id='careers-list'>";
        x += "<h2 class='employment-subheader'>" + json.careers.title + "</h2>";
        for(var i = 0; i < json.careers.careerNames.length; i++){
            x += "<h3 class='col-sm-2'>" + json.careers.careerNames[i] + "</h3>";
        }
        x += "<div class='footnote col-sm-12'><p>*Employers/Careers are randomly pulled from our recent graduates</p></div>";
        x += "</div>"
        $("#employment-section-2").append(x);
    });



    // DISPLAY COOP TABLE AND EMPLOYMENT TABLE UNDER MAP
    myXHR('get', {
        'path': '/employment/'
    }).done(function(json) {
        console.log(json);
        let x = '';
        x += "<div class='col-sm-12 col-centered'>"
        x += "<div onclick='showCoopTable(this)' class='coop-employment-table col-sm-6' id='coopTable' name = 'coopTable'>";
        x += "<div class='coop-title'><h3>" + json.coopTable.title + "</h3></div>";
        x += "</div>";
        x += "<div onclick='showEmploymentTable(this)' class='coop-employment-table col-sm-6' id='employmentTable' name = 'employmentTable'>";
        x += "<div class='coop-title'><h3>" + json.employmentTable.title + "</h3></div>";
        x += "</div></div>";
        $("#coop-table-section").append(x);
    });


    myXHR('get', {
        'path': "/employment/employmentTable"
    }).done(function(json) {
        console.log(json);
        let table = '';
        table += "<tbody>";
        $.each(json.employmentTable.professionalEmploymentInformation, function(){
            table += "<tr><td>" + this.employer + "</td><td>" + this.degree + "</td><td>" + this.city + "</td><td>" + this.title + "</td><td>" + this.startDate + "</td></tr>";
        });
        table += "</tbody>";
        let completeTable = $("#employment-table-data").append(table);

        let createTable = $("#employment-table-data").DataTable();
    });

    myXHR('get', {
        'path': "/employment/coopTable"
    }).done(function(json) {
        console.log(json);
        let table = '';
        table += "<tbody>";
        $.each(json.coopTable.coopInformation, function(){
            table += "<tr><td>" + this.employer + "</td><td>" + this.degree + "</td><td>" + this.city + "</td><td>" + this.term + "</td></tr>";
        });
        table += "</tbody>";
        $("#coop-table-data").append(table);
        $("#coop-table-data").DataTable();
    });


    // FACULTY AND STAFF HEADER
    myXHR('get', {
        'path': '/people/'
    }).done(function(json) {
        let x = '';
        x += "<div id='people-header'><h1>" + json.title + "</h1>";
        x += "<p>" + json.subTitle + "</p>";
        x += "<div onclick='showFaculty()' class='people-choice'><h1>Faculty</h1></div>";
        x += "<div onclick='showStaff()' class='people-choice'><h1>Staff</h1></div>";
        x += "</div>";

        $('#people-section-header').append(x);

        $(".people-choice").mouseenter(function(){
            $(this).animate({zoom:1.1}, 200, "easeInSine");
        });
        $(".people-choice").mouseleave(function(){
            $(this).animate({zoom:1.0}, 200, "easeOutSine");
        });
    });



    // DISPLAY THE FACULTY
    myXHR('get', {
        'path': '/people/faculty'
    }).done(function(json) {
        let x = '';
        //console.log(json);

        $.each(json.faculty, function() {
            x = "<div class = 'people-card-div col-sm-3' onclick = 'showFacInfo(this)'; ";
            x += "data-id = '" + $(this)[0].username + "'";
            x += "style = 'cursor:pointer;'><div class='card-info'><h3>" + $(this)[0].name + "</h3>";
            x += "<p>" + $(this)[0].title + "</p>";
            x += "</div></div>";
            $('#people-section').append(x);
        });

        $(".card-info").mouseenter(function(){
            $(this).css("color", "#eb6124");
        });
        $(".card-info").mouseleave(function(){
            $(this).css("color", "#f8f8f8");
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
            x += "<div class='research-circle-wrapper col-sm-2'><div class='research-circle'><h4>" + $(this)[0].areaName + "</h4></div>";
            x += "</div></div>";

            $('#research-section').append(x);
        });
    });

    myXHR('get', {
        'path': '/research/byFaculty'
    }).done(function(json) {
        console.log(json);

        $.each(json.byFaculty, function(i, ele){
            let id = ele.username.replace(/\s+/g, '');
            let x = '';
            x += "<div class = 'research-card-fac-div col-sm-3' onclick = 'showFacResearch(this)'; ";
            x += "username = '" + ele.username + "' ";
            x += "style = 'cursor:pointer;'>";
            x += "<div class='research-card-fac' id=" + id + "><img src='https://ist.rit.edu/assets/img/people/" + ele.username + ".jpg' style='width: 195px; height: 200px;'/>"
            x += "<div class='fac-rec-name'><h5>" + ele.facultyName + "</h5></div>";
            x += "</div></div>";

            $('#research-faculty-section').append(x);
        });

        $(".research-card-fac").mouseenter(function(ele){
            $("#" + $(this)[0].id + " .fac-rec-name").fadeIn("slow");
        });
        $(".research-card-fac").mouseleave(function(ele){
            $("#" + $(this)[0].id + " .fac-rec-name").fadeOut("slow");
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
