$("#register").submit(function(e)  {
    console.log("start register")
    createUser();
});

$("#UserData").ready(function(){
    var email = localStorage.getItem('email');
    var role = localStorage.getItem('role');
    $("#UserData").text("Nom : "+ email + " " + "(" +role+ ")");
});
function createUser()   {
    if(document.getElementById("adduserpwd").value == document.getElementById("adduserpwd2").value)  {
        var user = document.getElementById("addusername").value;
        var pass = document.getElementById("adduserpwd").value;
        var role = document.getElementById("role").value;
        $.ajax({
            url : 'http://127.0.0.1:3000/users/register', // La ressource ciblée
            type : 'POST', // Le type de la requête HTTP.

            data : {
                email: user,
                password: pass,
                role: role
            },

            success: function(data){
                console.log("success");
            },
            error: function(e) {
                console.log(e);

            }
        });
    } else {
        alert("Please make sure to confirm your password.");
    }
}

$("#connect").submit(function(e)  {
    e.preventDefault();
    console.log("click");
    getUser();
    getPosts();
});

function getUser()   {

        var user = document.getElementById("username").value;
        var pass = document.getElementById("userpwd").value;
        
        console.log(pass + " " + user)

        $.ajax({
            url : 'http://127.0.0.1:3000/users/login', // La ressource ciblée
            type : 'POST', // Le type de la requête HTTP.

            data : {
                email: user,
                password: pass,
            },

            success: function(data){
                console.log("success");
                var tab = Object.values(data);
                var tab2 = Object.values(tab);
                var recup = Object.values(tab2[0]);
                localStorage.setItem('email', recup[0]);
                localStorage.setItem('role', recup[1]);
                window.location.href = "User.html";
            },
            error: function(e) {
                console.log(e);

            }
        });
}

function getPosts(){

    $.ajax({
        url : 'http://127.0.0.1:3000/posts', // La ressource ciblée
        type : 'GET', // Le type de la requête HTTP.

        success: function(data){
            console.log(data);
        },
        error: function(e) {
            console.log(e);

        }
    });
}


/**function getUser(){
    var settings = {
        "url": "http://127.0.0.1:3000/user",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        checkUser(response);
    });
}

var valide;

function checkUser(response)    {
    console.log("check");
    var connecte = false;
    for(let i = 0; i < response.length; i++)    {
        if ($("#username").val() == response[i].nomdecompte && $("#userpwd").val() == response[i].password)   {
            console.log("login successfull");
            var connecte = true;
            sessionStorage.setItem("userconnected", response[i].nomdecompte);
            sessionStorage.setItem("userid", response[i].id);
            window.location.href = "userpage.html";
        } else {
            console.log("wrong password or username");
        }
    }
    if(connecte == false){
        alert("Wrong password or username !")
    }
}
 */


$("#userconnected").ready(function() {
    if (sessionStorage.getItem("userconnected") != null)  {
        document.getElementById("connected").style.display = "block";
        document.getElementById("notconnected").style.display = "none";
        document.getElementById("userconnected").innerHTML = "Welcome " + sessionStorage.getItem("userconnected") + ", from here you can start joining or creating groups and projects to time you and your team !";
    }
});
