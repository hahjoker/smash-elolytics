var usersCollectionRef = firestore.collection('users');
var matchRef = firestore.collection('matchhistory');

$(document).ready(function() {
    document.title=localStorage["profileID"];
    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    var y=getRandomColor()
    $('body').css({
      background: y
    });
    $('.title').css({
      color: y
    });
    
    $("#player").text(localStorage['profileID']);
    champWriter();  
    matchWriter();
  });

function champWriter(){
    var setBody = document.getElementById('set');
var i = 0;
var stock = new Array();
usersCollectionRef.where("name", "==", localStorage["profileID"]).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data().champsplayed);
        for(var z =0;z<doc.data().champsplayed.length;z++)
        {
            console.log(doc.data().champsplayed[z].champ, doc.data().champsplayed[z].totalgamesplayed,doc.data().champsplayed[z].wins);
            stock[z]= new Array(doc.data().champsplayed[z].champ, doc.data().champsplayed[z].totalgamesplayed,doc.data().champsplayed[z].wins);
        }
    });
    if(stock.length>11)
      stock.length=11;
    for (i = 1; i < stock.length; i++) 
    {
        var li = document.createElement('li');
        console.log(stock[i][0]);
        var nam = document.createElement('div');
        nam.className="large";
        var percentage = document.createElement('div');
        percentage.className="numerical";
        
        nam.appendChild(document.createTextNode(stock[i][0]));
        nam.appendChild(document.createTextNode("\t"));

        var zz=stock[i][2]/stock[i][1];
        console.log(zz);
        var a =zz*100;
        var u=a.toFixed(0)+"%";
        //td.style.width=u;
        
        
        nam.appendChild(document.createTextNode("\t"));
        percentage.appendChild(document.createTextNode(u));
        li.appendChild(nam);
        li.appendChild(percentage);
        
        var desc = document.createElement('div');
        desc.className="small";
        desc.appendChild(document.createTextNode(stock[i][2]+"W"+"\t"));
        desc.appendChild(document.createTextNode(stock[i][1]+"L"));
        li.appendChild(desc);
        //setBody.appendChild(desc);
        setBody.appendChild(li);
        
    }
});
}
function matchWriter(){
  var setBody = document.getElementById('match');
  var i = 0;
  var stock = new Array();
  matchRef.get().then(function (querySnapshot) 
  {
    querySnapshot.forEach(function (doc) 
    {
      if(i>10)
      {
        return;
      }
      if(doc.data().p1==localStorage["profileID"]||doc.data().p2==localStorage["profileID"])
      {
        var brass=true;
        if(doc.data().p1==localStorage["profileID"])
        {
          brass=true;
        }
        else if (doc.data().p2==localStorage["profileID"]) 
        {
          brass=false;
        }
        console.log(doc.id, " => ", doc.data());
        
        mm=document.createElement("li");
        //var aaa = document.createElement('div');
        //aaa.className="leftL";
        //aaa.appendChild(document.createTextNode(doc.data().winner));
        var bbb = document.createElement('div');
        bbb.className="rightR";
        if(brass)
        {
          bbb.appendChild(document.createTextNode(doc.data().p2));
        }
        else{
          bbb.appendChild(document.createTextNode(doc.data().p1));
        }

        //mm.appendChild(document.createTextNode(doc.data().winner));
        //mm.appendChild(aaa);
        mm.appendChild(bbb);
        var desc = document.createElement('div');
        desc.className="subscript";
        desc.appendChild(document.createTextNode(doc.data().winner));
        mm.appendChild(desc);
        setBody.appendChild(mm);
        i++;
      }
      console.log(i);
    });
});
}
