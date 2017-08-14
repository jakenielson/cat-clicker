// DOM variables
var cat = document.getElementById('cat-img');
var catName = document.getElementById('cat-name');
var counter = document.getElementById('click-count');
var catList = document.getElementById('cat-list');

// JS variables
var currentCat = 0;
var cats = [
  {'name': 'Buttons', 'src': 'img/buttons.jpg', 'count': 0},
  {'name': 'Boots', 'src': 'img/boots.jpg', 'count': 0},
  {'name': 'Beans', 'src': 'img/beans.jpg', 'count': 0},
  {'name': 'Blue', 'src': 'img/blue.jpg', 'count': 0},
  {'name': 'Belle', 'src': 'img/belle.jpg', 'count': 0}
]

// Create list of cats
var node;
var anchor;
var textnode;
for (var i = 0; i < cats.length; i++) {
  node = document.createElement("li");
  anchor = document.createElement("a");
  anchor.className = "listed-cat";
  textnode = document.createTextNode(cats[i].name);
  anchor.appendChild(textnode);
  node.appendChild(anchor);
  catList.appendChild(node);
}

// Add event listener to cat picture
cat.addEventListener('click', function(){
  cats[currentCat].count += 1;
  counter.innerText = cats[currentCat].count;
}, null);

// Add event listeners to list of cats
var listedCats = document.getElementsByClassName("listed-cat");
for (var i = 0; i < listedCats.length; i++) {
  listedCats[i].addEventListener('click', (function(catNum){
    return function() {
      currentCat = catNum;
      catName.innerText = cats[currentCat].name;
      cat.src = cats[catNum].src;
      counter.innerText = cats[currentCat].count;
    };
  })(i));
}
