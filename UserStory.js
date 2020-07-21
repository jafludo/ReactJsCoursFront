document.addEventListener("load", getUserStory());

$("#CREATE").click(function()  {
    console.log("start")
    createUserStory();
    alert("The userstory was created successfully")
    console.log("done")
});

function createUserStory()   {
    var userStoryname = document.getElementById("UserStoryName").value;
    var descriptionUserStory = document.getElementById("DescriptionUserStory").value;
    var timeUserStory = document.getElementById("TimeUserStory").value;
    console.log(userStoryname);
    console.log(descriptionUserStory);
    console.log(timeUserStory);

    $.ajax({
        url : 'http://127.0.0.1:3000/userstory', // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.

        data : {
            nomuserstory: userStoryname,
            descriptionstory: descriptionUserStory,
            timeruserstory: timeUserStory,
        },

        success: function(data){
            console.log("success");
        },
        error: function(e) {
            console.log("fail");

        }
    });
}



function getUserStory(){
    console.log("start get UserStory");
    var settings = {
        "url": "http://127.0.0.1:3000/userstory",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        checkUserStory(response);
        console.log(response);
    });
}

function checkUserStory(response)   {


    for(let i = 0; i < response.length; i++)    {
        console.log("UserStory name : " + response[i].nomuserstory);
        console.log("UserStory description : " + response[i].descriptionstory);
        console.log("UserStory time to do : " + response[i].timeruserstory);
        var userstoryname = response[i].nomuserstory;
        var userstorydescription = response[i].descriptionstory;
        var userstorytime = response[i].timeruserstory;
        $("ol").append("<li>"+ "user story: " + userstoryname + "<br>" + "description: " + userstorydescription + "<br>" + "Time: " + userstorytime + "</li>");
    }
}



$("#userconnected").ready(function() {
    if (sessionStorage.getItem("userconnected") != null)  {
        document.getElementById("connected").style.display = "block";
        document.getElementById("notconnected").style.display = "none";
    }
});