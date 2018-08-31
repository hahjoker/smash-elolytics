var config = {
    apiKey: "AIzaSyDgl3nyuro0aofZFSd1wuBxqwDtueCdAo4",
    authDomain: "moviequeuelist.firebaseapp.com",
    databaseURL: "https://moviequeuelist.firebaseio.com",
    projectId: "moviequeuelist",
    storageBucket: "moviequeuelist.appspot.com",
    messagingSenderId: "642705972248"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
var matchRef = firestore.collection('matchhistory').doc(localStorage["matchid"]).collection('matches');

$(document).ready(function () {
    document.title = localStorage["matchid"];
    document.getElementById("timetitle").innerText = localStorage["matchid"];
    firestore.collection('matchhistory').doc(localStorage["matchid"]).get().then(function (doc) {
        if (doc.exists) {
            $("#player1").text(doc.data().p1);
            $("#player2").text(doc.data().p2);
        } else {
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
    tablegen();
});

function tablegen() {
    var tableBody = document.getElementById('board');
    var i = 0;
    var stock = new Array();
    matchRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data().c1);
            stock[i] = new Array(i + 1, doc.data().c1, doc.data().c2, doc.data().winner);
            i++;
        });
        for (i = 0; i < stock.length; i++) {
            var tr = document.createElement('TR');
            for (j = 0; j < stock[i].length; j++) {
                var td = document.createElement('TD')
                td.appendChild(document.createTextNode(stock[i][j]));
                if (j == 0) {
                    td.id = stock[i][j];
                }
                tr.appendChild(td)
            }
            tableBody.appendChild(tr);
        }
    });

};