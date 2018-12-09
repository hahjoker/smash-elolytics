Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}
var matchRef = firestore.collection('matchhistory');
Date.prototype.today = function () {
    return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "-" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "-" + this.getFullYear();
}

$(document).ready(function () {

    $("#name11").text(localStorage['name1']);
    $("#player1").text(localStorage['name1']);
    $("#name22").text(localStorage['name2']);
    $("#player2").text(localStorage['name2']);
    var characters = ["Bayonetta",
        "Bowser",
        "Bowser Jr.",
        "Captain Falcon",
        "Chrom",
        "Cloud",
        "Corrin",
        "Daisy",
        "Dark Pit",
        "Dark Samus",
        "Diddy Kong",
        "Donkey Kong",
        "Dr. Mario",
        "Duck Hunt",
        "Falco", "Fox",
        "Ganondorf",
        "Greninja",
        "The Ice Climbers",
        "Ike",
        "Incineroar",
        "Inkling",
        "Isabelle",
        "Jigglypuff",
        "Ken",
        "King Dedede",
        "King K. Rool",
        "Kirby",
        "Link",
        "Little Mac",
        "Lucario",
        "Lucas",
        "Lucina",
        "Luigi",
        "Mario",
        "Marth",
        "Mega Man",
        "Meta Knight",
        "Mewtwo",
        "Mii Brawler",
        "Mii Gunner",
        "Mii Fighter",
        "Mr. Game & Watch",
        "Ness",
        "Olimar",
        "Pac-Man",
        "Palutena",
        "Peach",
        "Pichu",
        "Pikachu",
        "Pit",
        "Pokemon Trainer",
        "R.O.B.",
        "Robin",
        "Rosalina",
        "Roy",
        "Richter",
        "Ridley",
        "Ryu",
        "Samus",
        "Sheik",
        "Shulk",
        "Simon Belmont",
        "Solid Snake",
        "Sonic",
        "Toon Link",
        "Villager",
        "Wario",
        "Wii Fit Trainer",
        "Wolf",
        "Yoshi",
        "Young Link",
        "Zelda",
        "Zero Suit Samus"];
    var array_of_nodes = [];
    for (i = 0; i < characters.length; i++) {

        var opt = document.createElement('option');
        opt.value = characters[i];
        opt.innerHTML = characters[i];
        array_of_nodes.push(opt);

    }
    $('.think').append(array_of_nodes);
    $('.think').select2();
    var opt = document.createElement('option');
    opt.value = localStorage["name1"];
    opt.innerHTML = localStorage["name1"];
    $('.winners').append(opt);
    var opt2 = document.createElement('option');
    opt2.value = localStorage["name2"];
    opt2.innerHTML = localStorage["name2"];
    $('.winners').append(opt2);
    $('.winners').select2();
});
function testResults(form) {
    var winnerN;
    var loserN;
    var newDate = new Date();
    var datetime = newDate.today().toString() + "|" + newDate.timeNow().toString();
    matchRef = firestore.collection('matchhistory').doc(datetime);
    matchRef.collection("matches").doc("1").set({
        c1: form.g1char1.value,
        c2: form.g1char2.value,
        p1: localStorage["name1"],
        p2: localStorage["name2"],
        winner: form.g1winner.value
    })
    matchRef.collection("matches").doc("2").set({
        c1: form.g2char1.value,
        c2: form.g2char2.value,
        p1: localStorage["name1"],
        p2: localStorage["name2"],
        winner: form.g2winner.value
    })
    matchRef.collection("matches").doc("3").set({
        c1: form.g3char1.value,
        c2: form.g3char2.value,
        p1: localStorage["name1"],
        p2: localStorage["name2"],
        winner: form.g3winner.value
    })
    if (form.g2winner.value == form.g1winner.value) {
        matchRef.set({
            winner: form.g1winner.value,
            p1: localStorage["name1"],
            p2: localStorage["name2"]
        })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        winnerN = form.g1winner.value;
    }
    else {
        matchRef.set({
            winner: form.g3winner.value,
            p1: localStorage["name1"],
            p2: localStorage["name2"]
        })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        winnerN = form.g3winner.value;
    }
    if (winnerN == localStorage["name1"]) {
        loserN = localStorage["name2"];
        matchRef.update({ loser: loserN });
    }
    else {
        loserN = localStorage["name1"];
        matchRef.update({ loser: loserN });
    }
    manohman(winnerN, loserN);
    if (form.g1winner.value == localStorage["name1"])///player one wins
    {

        champWL(localStorage["name1"], localStorage["name2"], form.g1char1.value, form.g1char2.value, 0);
    }
    else {
        champWL(localStorage["name2"], localStorage["name1"], form.g1char2.value, form.g1char1.value, 0);
    }
    if (form.g2winner.value == localStorage["name1"]) {
        champWL(localStorage["name1"], localStorage["name2"], form.g2char1.value, form.g2char2.value, 1);
    }
    else {
        champWL(localStorage["name2"], localStorage["name1"], form.g2char2.value, form.g2char1.value, 1);

    }
    if (form.g3winner.value == localStorage["name1"]) {
        champWL(localStorage["name1"], localStorage["name2"], form.g3char1.value, form.g3char2.value, 2);
    }
    else if (form.g3winner.value == localStorage["name2"]) {
        champWL(localStorage["name2"], localStorage["name1"], form.g3char2.value, form.g3char1.value, 2);

    }
    setTimeout(move,4000);
}
function move(){
    window.location = "app.html";
}
function manohman(winner, loser) {
    var winnerElo = 0;
    var loserElo = 0;
    var wGamesPlayed = 0;
    var lGamesPlayed = 0;
    var wchamparray;
    var lchamparray;
    usersCollectionRef.where("name", "==", winner).get().then(function (docSnap) {
        docSnap.forEach(function (doc) {
            winnerElo = doc.data().elo;
            wGamesPlayed = doc.data().gamesplayed;
            wchamparray = doc.data().champsplayed;
            usersCollectionRef.where("name", "==", loser).get().then(function (docSnap) {
                docSnap.forEach(function (doc) {
                    loserElo = doc.data().elo;
                    lGamesPlayed = doc.data().gamesplayed;
                    lchamparray = doc.data().champsplayed;
                    winnerElo = getNewRating(winnerElo, loserElo, 1);
                    loserElo = getNewRating(loserElo, winnerElo, 0);
                    usersCollectionRef.doc(winner).set({
                        name: winner,
                        elo: winnerElo,
                        gamesplayed: wGamesPlayed + 1,
                        champsplayed: wchamparray
                    })
                        .then(function () {
                            console.log("Document successfully written!");
                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                        });
                    usersCollectionRef.doc(loser).set({
                        name: loser,
                        elo: loserElo,
                        gamesplayed: lGamesPlayed + 1,
                        champsplayed: lchamparray
                    })
                        .then(function () {
                            console.log("Document successfully written!");
                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                        });
                })
            });
        })
    });
}

function getRatingDelta(myRating, opponentRating, mgr) {
    if ([0, 0.5, 1].indexOf(mgr) === -1) {
        return null;
    }
    var letsgetit = 1 / (1 + Math.pow(10, (opponentRating - myRating) / 400));
    //k factor of 32
    console.log(Math.round(32 * (mgr - letsgetit)));
    return Math.round(32 * (mgr - letsgetit));
}
function getNewRating(myRating, opponentRating, mgr) {
    return myRating + getRatingDelta(myRating, opponentRating, mgr);
}

function champWL(winner, loser, wchampion, lchampion, modi) {
    var wchamparray;
    var lchamparray;
    usersCollectionRef.where("name", "==", winner).get().then(function (docSnap) {
        docSnap.forEach(function (doc) {
            wchamparray = doc.data().champsplayed;
            usersCollectionRef.where("name", "==", loser).get().then(function (docSnap) {
                docSnap.forEach(function (doc) {
                    lchamparray = doc.data().champsplayed;
                    var gods = {};
                    var ind = -1;
                    for (var index = 0; index < wchamparray.length; index++) {
                        var animal = wchamparray[index];
                        console.log(ind)
                        if (animal.champ == wchampion) {
                            ind = index;
                            gods = {
                                champ: wchampion,
                                totalgamesplayed: animal.totalgamesplayed + 1 + modi,
                                wins: animal.wins + 1 + modi
                            }
                            wchamparray.splice(index);
                            wchamparray.push(gods);
                            usersCollectionRef.doc(winner).update({ champsplayed: wchamparray });
                            break;
                        }
                    }
                    if (ind < 0) {
                        console.log("HElp");
                        gods = { champ: wchampion, wins: 1, totalgamesplayed: 1 };
                        wchamparray.push(gods);
                        usersCollectionRef.doc(winner).update({ champsplayed: wchamparray });
                    }
                    //loser
                    ind = -1;
                    var safe;
                    for (var index = 0; index < lchamparray.length; index++) {
                        var animal = lchamparray[index];
                        safe = animal;
                        if (animal.champ == lchampion) {
                            ind = index;
                            gods = {
                                champ: lchampion,
                                totalgamesplayed: animal.totalgamesplayed + 1 + modi,
                                wins: animal.wins
                            }
                            lchamparray.splice(index);
                            lchamparray.push(gods);
                            usersCollectionRef.doc(loser).update({ champsplayed: lchamparray });
                            break;
                        }
                    }
                    if (ind < 0) {
                        gods = { champ: wchampion, wins: 0, totalgamesplayed: 1 }
                        usersCollectionRef.doc(loser).update({ champsplayed: firebase.firestore.FieldValue.arrayUnion(gods) });
                    }

                })
            });
        })
    });
}

