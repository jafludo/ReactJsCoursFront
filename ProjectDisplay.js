document.addEventListener("load", getgroup());
document.addEventListener("load", getproject());

$("#Bound").click(function(){
    var groupname = $("#grouplist").val();
    var projectname = $("#projectlist").val();
    
    var idgroup = $('#grouplist').find(":selected").attr('id');
    var idproject = $('#projectlist').find(":selected").attr('id');

    //Bound des deux lists
    
    $.ajax({
        url : 'http://127.0.0.1:3000/project/'+idproject+'/'+idgroup+'', // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.

        success: function(data){
            console.log("success");
        },
        error: function(e) {
            console.log("fail");

        }
    });
    
});

$("#grouplist").change(function(event){
    console.log(event.target.value);
});

$("#projectlist").change(function(event){
    console.log(event.target.value);
});

$("#CREATE").click(function()  {
    console.log("start")
    createProject();
    alert("The project was created successfully")
    console.log("done")
});

function createProject()   {
    var projectname = document.getElementById("projectName").value;
    var descriptionProject = document.getElementById("DescriptionProjet").value;
    console.log(projectname)
    console.log(descriptionProject)

    $.ajax({
        url : 'http://127.0.0.1:3000/project', // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.

        data : {
            nomproject: projectname,
            description: descriptionProject,
        },

        success: function(data){
            console.log("success");
        },
        error: function(e) {
            console.log("fail");

        }
    });
}



function getgroup(){
    console.log("start get group");
    var settings = {
        "url": "http://127.0.0.1:3000/group",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        checkGroup(response);
        //console.log(response);
    });
}

function checkGroup(response)   {


    for(let i = 0; i < response.length; i++)    {
        console.log("Group name : " + response[i].nomgroup);
        var groupname = response[i].nomgroup;
        var id = response[i]._id
        console.log(id);
        $("#grouplist").append("<option id="+id+">"+ groupname+ "</option>");
    }
}



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
        var projectname = response[i].nomproject;
        var id = response[i]._id
        $("#projectlist").append("<option id="+id+">"+ projectname+ "</option>");
    }
}