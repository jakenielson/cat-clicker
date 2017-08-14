var cats = document.getElementsByClassName('cat-img');
var counters = document.getElementsByClassName('click-count');
var count = [0, 0];
var eventNum;

for (var i = 0; i < cats.length; i++) {
  cats[i].addEventListener('click', function(e){
    eventNum = e.path[0].currentSrc.slice(58, 59) - 1;
    count[eventNum] += 1;
    counters[eventNum].innerText = count[eventNum];
  }, false);
}
