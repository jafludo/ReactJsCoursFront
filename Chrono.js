var projectChosed = "";
var id = "";
var idproject= "";
var idgroup= "";
var nomgroup= "";
var idtimer = "";
var groupChosed = "";

document.getElementById('chrono').addEventListener("click", function(e) {
    if (passage == 0 && projectChosed != "") {
        //console.log(projectChosed);
        intervale = setInterval(setTime, 1000);
        setTime();
        passage++;
    }else console.log("Déjà lancé ou il faut sélectionner un projet")


});

document.getElementById('stopChrono').addEventListener("click", function(e) {
    clearInterval(intervale);
    passage = 0;
});

var intervale;
var passage = 0;
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;  //Timer de départ

function setTime() {
    //console.log("work");
    ++totalSeconds;
    updatetimergroupfromproject();
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

$('#stopChrono').click(function()   {
    createChrono();
});

$('#chrono').click(function()   {
   
});

document.addEventListener("load", getproject());

function getproject(){
    //console.log("start get project");
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
        //console.log("Project name : " + response[i].nomproject);
        var projectname = response[i].nomproject;
        id = response[i]._id;
        $("#projectlist").append("<OPTION id="+id+">"+ projectname+ "</OPTION>");
    }
}

$("#projectlist").change(function(event){

    idgroup= "";
    nomgroup= "";
    projectChosed = "";
    $("#grouplist").empty();
    $("#seconds").text("00");
    $("#minutes").text("00");
    id = $('#projectlist').find(":selected").attr('id');
    projectChosed = event.target.value;
    //console.log("project : "+projectChosed);
    //console.log("group : "+groupChosed);
    //idgroup = $('#grouplist').find(":selected").attr('id').text("");
    getgroup();
    //Test
});


function getgroup(){
    //console.log("start get group");
    var settings = {
        "url": "http://127.0.0.1:3000/project/" + id,
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {

        checkGroup(response);
        //console.log(response.idgroups + "= group");
    });
}


function checkGroup(response) {

    //console.log(response.idgroups.length);
    for (var i = 0; i < response.idgroups.length; i++) {
        //console.log("start append");
        //console.log(response.idgroups[i] + "= ID du groupe");
        idgroup = response.idgroups[i];
        getgroupname(idgroup);

    }

}
function getidtimergroupfromproject(){
    var settings = {
        "url": "http://127.0.0.1:3000/project/"+id,
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        idtimer = response.idtimer;
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
    });
}


function updatetimergroupfromproject(){
    //var string = "http://127.0.0.1:3000/project/"+idproject+"/"+idgroup+"/"+1;
    //console.log(string);
    console.log(id);
    var settings = {
        "url": "http://127.0.0.1:3000/project/"+id+"/"+idgroup+"/"+1,
        "method": "PUT"
    };
    $.ajax(settings).done(function (response) {
        console.log("success");
    });
    
}

function getgroupname(idgroup){
    //console.log("start get group");
    var settings = {
        "url": "http://127.0.0.1:3000/group/"+idgroup,
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        nomgroup = response.nomgroup;
        
        // console.log(nomgroup);
        //console.log("début append");
        $("#grouplist").append("<option id="+idgroup+">"+ nomgroup +"</option>");
        groupChosed = $("#grouplist").find(":selected").text();
        getidtimergroupfromproject();
        console.log("Fin append");
    });
}

//done







