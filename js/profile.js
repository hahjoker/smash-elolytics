var usersCollectionRef = firestore.collection('users');

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
    var getProductHeight = $('.product.active').height();
    $('.products').css({
      height: getProductHeight
    });
  
  
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
    for (i = 0; i < stock.length; i++) {
        var tr = document.createElement('div');
        tr.className="meter";
        var td = document.createElement('span');

        var tf=document.createElement('p');
        tf.appendChild(document.createTextNode(stock[i][0]));
        setBody.appendChild(tf);
        
        var zz=stock[i][2]/stock[i][1];

        console.log(zz);
        var a =zz*100;
        var u=a.toFixed(0)+"%";
        td.style.width=u;
        
        tr.appendChild(td);
        setBody.appendChild(tr);
        var pcpc=document.createElement('p');
        pcpc.appendChild(document.createTextNode(u));
        setBody.appendChild(pcpc);
        var spacer=document.createElement('p');
        spacer.className="description";
        setBody.appendChild(spacer);
    }
});
}
