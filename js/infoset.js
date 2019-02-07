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
        "Joker",
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
        "Piranha Plant",
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
    var p1array=[form.g1char1.value,form.g2char1.value,form.g3char1.value];
    var gOutcome=[form.g1winner.value,form.g2winner.value,form.g3winner.value]
    var p2array=[form.g1char2.value,form.g2char2.value,form.g3char2.value];
    champUpdater(localStorage["name1"],localStorage["name2"],p1array,p2array,gOutcome);
    setTimeout(move,4000);
}
function champUpdater(p1,p2,player1s,player2s,outcomes)
{
    var totalgamesplay;
    if(outcomes[2]=="NA")
    {
        totalgamesplay=2;
    }
    else
        totalgamesplay=3;

    var buildp1=[];
    var buildp2=[];
    var gods;
    var i;
    for (i = 0; i < totalgamesplay; i++) { 
        if(p1==outcomes[i])
        {
            gods=player1s[i];
            buildp1.push({champ:gods,totalgamesplayed:1,wins:1});
            gods=player2s[i];
            buildp2.push({champ:gods,totalgamesplayed:1,wins:0});
        }
        else
        {
            gods=player1s[i];
            buildp1.push({champ:gods,totalgamesplayed:1,wins:0});
            gods=player2s[i];
            buildp2.push({champ:gods,totalgamesplayed:1,wins:1});
        }
      }

      var output1 = [];
      var output2 = [];

      buildp1.forEach(function(item) {
        var existing = output1.filter(function(v, i) {
            return v.champ == item.champ;
        });
        if (existing.length) {
            var existingIndex = output1.indexOf(existing[0]);
            output1[existingIndex].wins = output1[existingIndex].wins+item.wins;
            output1[existingIndex].totalgamesplayed = output1[existingIndex].totalgamesplayed+item.totalgamesplayed;
        } else {
            if (typeof item.wins == 'string')
            item.wins = [item.wins];
            output1.push(item);
        }
        });
    buildp2.forEach(function(item) {
        var existing = output2.filter(function(v, i) {
            return v.champ == item.champ;
        });
        if (existing.length) {
            var existingIndex = output2.indexOf(existing[0]);
            output2[existingIndex].wins = output2[existingIndex].wins+item.wins;
            output2[existingIndex].totalgamesplayed = output2[existingIndex].totalgamesplayed+item.totalgamesplayed;
        } else {
            if (typeof item.wins == 'string')
            item.wins = [item.wins];
            output2.push(item);
        }
        });

    var p1champarray;
    var p2champarray;
    usersCollectionRef.where("name", "==", p1).get().then(function (docSnap) {
        docSnap.forEach(function (doc) {
            p1champarray = doc.data().champsplayed;
            usersCollectionRef.where("name", "==", p2).get().then(function (docSnap) {
                docSnap.forEach(function (doc) {
                    p2champarray = doc.data().champsplayed; 
                    //p1
                    var combo=p1champarray.concat(output1);
                    var comboOutput=[];
                    
                    combo.forEach(function(item) {
                        var existing = comboOutput.filter(function(v, i) {
                            return v.champ == item.champ;
                        });
                        if (existing.length) {
                            var existingIndex = comboOutput.indexOf(existing[0]);
                            comboOutput[existingIndex].wins = comboOutput[existingIndex].wins+item.wins;
                            comboOutput[existingIndex].totalgamesplayed = comboOutput[existingIndex].totalgamesplayed+item.totalgamesplayed;
                        } else {
                            if (typeof item.wins == 'string')
                            item.wins = [item.wins];
                            comboOutput.push(item);
                        }
                        
                        });
                    usersCollectionRef.doc(p1).update({ champsplayed: comboOutput });


                    //p2
                    combo=p2champarray.concat(output2);
                    comboOutput2=[];
                    
                    combo.forEach(function(item) {
                        var existing = comboOutput2.filter(function(v, i) {
                            return v.champ == item.champ;
                        });
                        if (existing.length) {
                            var existingIndex = comboOutput2.indexOf(existing[0]);
                            comboOutput2[existingIndex].wins = comboOutput2[existingIndex].wins+item.wins;
                            comboOutput2[existingIndex].totalgamesplayed = comboOutput2[existingIndex].totalgamesplayed+item.totalgamesplayed;
                        } else {
                            if (typeof item.wins == 'string')
                            item.wins = [item.wins];
                            comboOutput2.push(item);
                        }
                        
                        });
                    usersCollectionRef.doc(p2).update({ champsplayed: comboOutput2 });

                    });});
        });
    });
}
function move(){
    window.location = "app.html";
}
function manohman(winner, loser) {
    var winnerElo = 0;
    var loserElo = 0;
    //var wGamesPlayed = 0;
    //var lGamesPlayed = 0;
    var wchamparray;
    var lchamparray;
    usersCollectionRef.where("name", "==", winner).get().then(function (docSnap) {
        docSnap.forEach(function (doc) {
            winnerElo = doc.data().elo;
            //wGamesPlayed = doc.data().gamesplayed;
            wchamparray = doc.data().champsplayed;
            usersCollectionRef.where("name", "==", loser).get().then(function (docSnap) {
                docSnap.forEach(function (doc) {
                    loserElo = doc.data().elo;
                    //lGamesPlayed = doc.data().gamesplayed;
                    lchamparray = doc.data().champsplayed;
                    winnerElo = getNewRating(winnerElo, loserElo, 1);
                    loserElo = getNewRating(loserElo, winnerElo, 0);
                    usersCollectionRef.doc(winner).set({
                        name: winner,
                        elo: winnerElo,
                        //gamesplayed: wGamesPlayed + 1,
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
                        //gamesplayed: lGamesPlayed + 1,
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

