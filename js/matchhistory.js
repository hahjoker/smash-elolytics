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
var matchRef = firestore.collection('matchhistory');

function tablegen() {
    var tableBody = document.getElementById('board');
    var i = 0;
    var stock = new Array();
    var winner;
    var loser;
    var people = new Array();
    matchRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            //console.log(doc.id, " => ", doc.data().elo);
            winner = doc.data.winner;
            matchRef.doc(doc.id).collection("matches").get().then(function (querySnapshot) {
                console.log(querySnapshot);
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id, " => ", doc.data());
                })
            });
            stock[i] = new Array(doc.id, doc.data().winner, doc.data().loser);
            //console.log(stock[i]);
            i++;
        });
        for (i = 0; i < stock.length; i++) {
            var tr = document.createElement('TR');
            for (j = 0; j < stock[i].length; j++) {
                var td = document.createElement('TD')
                td.appendChild(document.createTextNode(stock[i][j]));
                if (j == 0) {
                    td.id = stock[i][j];
                    td.setAttribute('href', "#");
                    td.setAttribute('onClick', "sendOff(this.id)");
                }
                tr.appendChild(td)
            }
            tableBody.appendChild(tr);
        }
    });

};

function sendOff(clicked) {
    alert(clicked);
}