//Cette fonction affiche les videos exitantes en base de données et leurs likes/dislikes
function showText(response){
    let textBlock = document.getElementById("textBlock");
    textBlock.innerHTML = "";

    for(let i = 0; i < response.length; i++) {
        let line = document.createElement("iframe");//
        line.setAttribute("src", response[i].lien);//
        textBlock.appendChild(line);//affichage video
        let like = document.createElement("button");
        like.setAttribute("id", "like" + i);//id utile plus tard pour la requête update
        like.setAttribute("data-id", response[i]._id); //attribut utile pour lier le like à sa video
        like.setAttribute("class", "btn btn-success");
        like.innerHTML = response[i].like; //ajoute valeur existante en bdd à like
        let dislike = document.createElement("button");
        dislike.setAttribute("id", "dislike" + i);//id utile plus tard pour la requête update
        dislike.setAttribute("data-id", response[i]._id);//attribut utile pour lier le dislike à sa video
        dislike.setAttribute("class", "btn btn-danger");
        dislike.innerHTML = response[i].dislike; //ajoute valeur existante en bdd à dislike
        like.style.backgroundColor = "blue";
        dislike.style.backgroundColor = "red";
        like.style.color = "white";
        dislike.style.color = "white";
        textBlock.appendChild(like);//append
        textBlock.appendChild(dislike);//append
        document.getElementById("count2").setAttribute("alt", i);
    }
}


//Cette fonction execute la requete GET pour afficher le resultat ci dessus
function getPost(){
    var settings = {
        "url": "http://127.0.0.1:3000/videos",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        showText(response);
    });
}

//execute la fonction ci dessus lors du clic "Afficher toutes les videos"
$("#listVideo").click(function() {
    getPost();
});

//cette fonction affiche les videos que l'utilisateur souhaite ajouter, ainsi que leurs boutons like et dislike
function video() {
    for(i = 0; i < 5; i++)  {
        if(document.getElementById("frame" + i).getAttribute("alt") == "empty")    {//verif max 5 videos avec attribut alt
            var inputVal = document.getElementById("video").value;
            var x = document.createElement("iframe");
            var frame0 = document.getElementById("frame" + i);
            frame0.setAttribute("alt", "full");//verif max 5 videos avec attribut alt
            x.setAttribute("src", inputVal);
            frame0.appendChild(x);//affichage video
            var pocebleu = document.createElement("button");
            var poceroje = document.createElement("button");
            pocebleu.setAttribute("id", "bleu" + i);
            poceroje.setAttribute("id", "rouge" + i);
            pocebleu.setAttribute("class", "btn btn-success");
            poceroje.setAttribute("class", "btn btn-danger");x
            pocebleu.innerHTML = "0";
            poceroje.innerHTML = "0";
            pocebleu.style.backgroundColor = "blue";
            poceroje.style.backgroundColor = "red";
            pocebleu.style.color = "white";
            poceroje.style.color = "white";
            frame0.appendChild(pocebleu);//affichage like
            frame0.appendChild(poceroje);//affichage dislike
            document.getElementById("count").setAttribute("alt", i);
            return;
        }
        if ((document.getElementById("frame4").getAttribute("alt") == "full"))  {//verif max 5 videos avec attribut alt
            alert("max 5 videos");
            return;
        }
    }
}



var cb = [0, 0, 0, 0, 0];
var cr = [0, 0, 0, 0, 0];

var cb2 = [0, 0, 0, 0, 0];
var cr2 = [0, 0, 0, 0, 0];

//traite les videos ajoutées par l'utilisateur lors de la session en cours
//fonction qui lorsqu'on like ou dislike une video, execute une requete put vers le serveur pour mettre à jour la valeur des likes et dislikes
document.getElementById("frame").addEventListener("click", function(e) {
    for(i= 0; i < 5; i++) {//pour determiner quel bouton
        if(e.target && e.target.id == "bleu" + i) {//si bouton = like
            if((cb[i]) == 0 && cr[i] == 0) {//les if vérifient la valeur du like et dislike présents en session
                cb[i]++;
                e.target.innerHTML = cb[i];
                let data =  {
                    like: e.target.innerHTML,
                }
                updatelikes(data, e.target.getAttribute("data-id"));
            } else if(cr[i] == 1 && cb[i] == 0)  {
                cr[i]--;
                cb[i]++;
                document.getElementById("rouge" + i).innerHTML = cr[i];
                e.target.innerHTML = cb[i];
                let data =  {
                    like: e.target.innerHTML,
                    dislike: cr[i],
                }
                updatelikes(data, e.target.getAttribute("data-id"));
            } else { return; }
        } else if (e.target && e.target.id == "rouge" + i) {
            if(cr[i] == 0 && cb[i] == 0) {
                cr[i]++;
                e.target.innerHTML = cr[i];
                let data =  {
                    dislike: e.target.innerHTML,
                }
                updatelikes(data, e.target.getAttribute("data-id"));
            } else if(cb[i] == 1 && cr[i] == 0)  {
                cb[i]--;
                cr[i]++;
                document.getElementById("bleu" + i).innerHTML = cb[i];
                e.target.innerHTML = cr[i];
                let data =  {
                    like: cb[i],
                    dislike: e.target.innerHTML,
                }
                updatelikes(data, e.target.getAttribute("data-id"));
            } else { return; }
        }
    }
});

//idem que la fonction du dessus mais pour les videos existantes en bdd
document.getElementById("textBlock").addEventListener("click", function(e) {
    for(i= 0; i < 20; i++) {
        cb2[i] = document.getElementById("like" + i).innerHTML;
        cr2[i] = document.getElementById("dislike" + i).innerHTML;
        if(e.target && e.target.id == "like" + i) {
            if((cb2[i]) == 0 && cr2[i] == 0) {
                cb2[i]++;
                e.target.innerHTML = cb2[i];
                let data =  {
                    like: e.target.innerHTML,
                }
                updatelikes(data, e.target.getAttribute("data-id"));
            } else if(cr2[i] == 1 && cb2[i] == 0)  {
                cr2[i]--;
                cb2[i]++;
                document.getElementById("dislike" + i).innerHTML = cr2[i];
                e.target.innerHTML = cb2[i];
                let data =  {
                    like: e.target.innerHTML,
                    dislike: cr2[i],
                }
                updatelikes(data, e.target.getAttribute("data-id"));
            } else { return; }
        } else if (e.target && e.target.id == "dislike" + i) {
            if(cr2[i] == 0 && cb2[i] == 0) {
                cr2[i]++;
                e.target.innerHTML = cr2[i];
                let data =  {
                    dislike: e.target.innerHTML,
                }
                updatelikes(data, e.target.getAttribute("data-id"));
            } else if(cb2[i] == 1 && cr2[i] == 0)  {
                cb2[i]--;
                cr2[i]++;
                document.getElementById("like" + i).innerHTML = cb2[i];
                e.target.innerHTML = cr2[i];
                let data =  {
                    like: cb2[i],
                    dislike: e.target.innerHTML,
                }
                updatelikes(data, e.target.getAttribute("data-id"));
            } else { return; }
        }
    }
});

//requete post une video
$("#buttonvideo").click(function(e){
    video();
    $.ajax({
        url : 'http://127.0.0.1:3000/videos', // La ressource ciblée
        type : 'POST', // Le type de la requête HTTP.

        data : {
            name: "video1",
            lien: document.getElementById("video").value,
            id:  1,
        },
        success: function(data){
            console.log("success");
            var c = document.getElementById("count").getAttribute("alt");
            document.getElementById("bleu" + c).setAttribute("data-id", data._id);
            document.getElementById("rouge" + c).setAttribute("data-id", data._id);

        },
        error: function(e) {
            console.log(e);
        }
    });

});


//requete put qui met à jour les likes et dislikes
function updatelikes(data, dataid){
    $.ajax({
        url : 'http://127.0.0.1:3000/videos/' + dataid, // La ressource ciblée
        type : 'PUT', // Le type de la requête HTTP.

        data : data,

        success: function(data){
            console.log("success");
        },
        error: function(e) {
            console.log(e);
        }
    });
}

function email() {
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "IpssiSonnerie@ipssi.com",
        Password : "2D7461B6DFCD6F15C55FC59B0725AAD1364C",
        To : 'v.abrivard@ecole-ipssi.net',
        From : "v.abrivard@ecole-ipssi.net",
        Subject : "Hello my friend i'm a bot from india",
        Body : "Do you want to subscribe to our news letter"
    }).then(
        message => alert(message)
    );
}