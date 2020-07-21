var groupExist = "";


$("#CREATE").submit(function()  {
    console.log("start");
    groupExistGet();
    if (groupExist == "exist"){
        alert("Un groupe de meme nom existe déjà");
    }else{
        createGroup();
        alert("The group was created successfully");
        console.log("done");
    }

});

function createGroup()   {
        var groupname = document.getElementById("groupName").value;
        console.log(groupname);
        console.log(groupExist);

        $.ajax({
            url : 'http://127.0.0.1:3000/group', // La ressource ciblée
            type : 'POST', // Le type de la requête HTTP.

            data : {
                nomgroup: groupname,
            },

            success: function(data){
                console.log("success");

            },
            error: function(e) {
                console.log("fail");

            }
        });
}

$("#OtherGroups").click(function()  {
    console.log("click");
    getGroup();
});

function getGroup(){
    var settings = {
        "url": "http://127.0.0.1:3000/Group",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        checkGroup(response);
    });
}

function checkGroup(response){
   $('#listegroups').empty();
    for(let i = 0; i < response.length; i++)    {
        var groupname = response[i].nomgroup;
        $("ol").append("<li id="+groupname+">"+ groupname+ "</li>");
    } 
}


function groupExistGet(){
    var settings = {
        "url": "http://127.0.0.1:3000/Group",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        console.log("Start get for check");
        groupExistCheck(response);
    });
}

function groupExistCheck(response){
    $('#listegroups').empty();
    for(let i = 0; i < response.length; i++)    {
        var groupnamecheck = response[i].nomgroup;
        console.log("Start loop");
        if (groupnamecheck == document.getElementById("groupName").value){
            groupExist = "exist";
            console.log(groupExist)
        }
    }
}