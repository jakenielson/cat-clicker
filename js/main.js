var cats = document.getElementsByClassName('cat-img');
var counters = document.getElementsByClassName('click-count');
var count = [0, 0];
var eventNum;

for (var i = 0; i < cats.length; i++) {
  cats[i].addEventListener('click', (function(catNum){
    return function() {
      count[catNum] += 1;
      counters[catNum].innerText = count[catNum];
    };
  })(i));
}
