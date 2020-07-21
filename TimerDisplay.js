var projectChosed = "";
var id = "";
var idgroup= "";
var nomgroup= "";
var projectName = "";
var idtimer = "";

document.addEventListener("load", getproject());


function getproject(){
    console.log("start get project");
    var settings = {
        "url": "http://127.0.0.1:3000/project",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        checkproject(response);
    });
}

function checkproject(response)   {


    for(let i = 0; i < response.length; i++)    {
        console.log("Project name : " + response[i].nomproject);
        projectName = response[i].nomproject;
        id = response[i]._id;
        console.log(id);
        getgroup();

    }
}



function getgroup(){
    console.log("start get group");
    var settings = {
        "url": "http://127.0.0.1:3000/project/" + id,
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        console.log("Starting Check group function")
        checkGroup(response);
        //console.log(response.idgroups + "= group");
    });
}


function checkGroup(response) {

    console.log(response.idgroups.length);
    for (var i = 0; i < response.idgroups.length; i++) {
        console.log("start append");
        console.log(response.idgroups[i] + "= ID du groupe");
        idgroup = response.idgroups[i];
        getidtimergroupfromproject();

    }

}


function getidtimergroupfromproject(){
    var settings = {
        "url": "http://127.0.0.1:3000/project/"+id,
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        idtimer = response.idtimer;
        console.log("START TIMER GET");
        gettimergroupfromproject();
    });
}

function gettimergroupfromproject(){
    var settings = {
        "url": "http://127.0.0.1:3000/timer/"+idtimer,
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {

        var idrecup = response.idtypeEntity.indexOf(idgroup);
        //Si group find into timer of project
        if(idrecup != -1){
            console.log(response.timerEntity[idrecup]);
            totalSeconds = response.timerEntity[idrecup];

        }
        idtimer = response.idtimer;
        getgroupname(idgroup);
    });
}




function getgroupname(idgroup){
    console.log("start get group");
    var settings = {
        "url": "http://127.0.0.1:3000/group/"+idgroup,
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        nomgroup = response.nomgroup;
        console.log(nomgroup);
        console.log("début append");
        //$("#grouplist").append("<option>"+ nomgroup +"</option>");
        $("ol").append("<li>"+ "Projet: " + projectName + " groupe : " + nomgroup + " Temps passé sur le projet : " + totalSeconds + " secondes" + "</li>");
        console.log("Fin append");
    });
}









