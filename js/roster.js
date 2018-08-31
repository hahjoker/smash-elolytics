
var usersCollectionRef = firestore.collection('users');


function listgen() {
  var i = 0;
  var stock = new Array()

  usersCollectionRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      stock[i] = doc.id;
      i++;
    });
    var ul = document.getElementById("board");
    for (i = 0; i < stock.length; i++) {
      var a = document.createElement("a")
      a.className += "js-hover";
      //a.href = ""
      a.id += stock[i];
      var li = document.createElement("li");
      a.appendChild(document.createTextNode(stock[i]));

      li.appendChild(a);
      ul.appendChild(li);
    }
  });
  var hoverEl = document.querySelectorAll('.js-hover');
  var imgArray = [];
  var data = [];

  data.forEach(function (el, i) {
    image = document.createElement('img');


    image.setAttribute('src', el);
    document.body.appendChild(image);
    imgArray.push(image);

  });

  hoverEl.forEach(function (el, i) {
    el.addEventListener('mouseover', function () {
      imgArray[i].classList.add('visible');
    });


    el.addEventListener('mouseleave', function () {
      imgArray[i].classList.remove('visible');
    });
  });
}
