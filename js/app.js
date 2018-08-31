let newUser = document.querySelector('#newUser');
var usersCollectionRef = firestore.collection('users');

function newUsers() {
    var person = prompt("Please enter your name", "");
    usersCollectionRef.doc(person).set({
        name: person,
        elo: 1000,
        gamesplayed: 0,
        champsplayed: [{ champ: "", wins: 0, totalgamesplayed: 0 }]
    }).then(function (docRefs) {
        console.log("Document written with ID: ", docRefs.id);
    })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
    setTimeout(myFunction, 2000);
};

function myFunction() {
    window.location = "app.html";
}


function profileSent(reff){
    localStorage["profileID"]=reff;
    window.location="profile.html";
}

function tablegen() {
    var tableBody = document.getElementById('board');
    var i = 0;
    var stock = new Array()

    usersCollectionRef.orderBy("elo", 'desc').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data().elo);
            stock[i] = new Array(doc.id, doc.data().elo);
            console.log(stock[i]);
            i++;
        });
        for (i = 0; i < stock.length; i++) {
            var tr = document.createElement('TR');
            for (j = 0; j < stock[i].length; j++) {
                var td = document.createElement('TD')
                if(j==0){
                    td.id = stock[i][j];
                    td.setAttribute('onClick', "profileSent(this.id)");
                }
                td.appendChild(document.createTextNode(stock[i][j]));
                tr.appendChild(td)
            }
            tableBody.appendChild(tr);
        }
    });

};

function listgen() {
    var i = 0;
    var stock = new Array();
    usersCollectionRef.orderBy("elo", 'desc').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data().elo);
            stock[i] = doc.id;
            i++;
        });
        var ul = document.getElementById("board");
        for (i = 0; i < stock.length; i++) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(stock[i]));
            ul.appendChild(li);
        }
    });
}