var catImg = document.getElementById('cat-img');
var count = 0;

catImg.addEventListener('click', function(){
  count += 1;
  document.getElementById('click-count').innerText = count;
}, false);
