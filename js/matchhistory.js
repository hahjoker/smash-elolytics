
var matchRef = firestore.collection('matchhistory');

function tablegen() {
    var tableBody = document.getElementById('board');
    var i = 0;
    var stock = new Array();
    matchRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            //console.log(doc.id, " => ", doc.data().elo);
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
                    td.setAttribute('onClick', "sendOff(this.id)");
                }
                tr.appendChild(td)
            }
            tableBody.appendChild(tr);
        }
    });

};

function sendOff(clicked) {
    localStorage["matchid"]=clicked;
    window.location="series.html";
}