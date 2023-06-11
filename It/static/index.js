var gameBoard = document.getElementById('game-board');
var cat = document.getElementById('cat');

var isRunning = false;
var timer;

gameBoard.addEventListener('mouseenter', startChase);
gameBoard.addEventListener('mousemove', moveCat);
gameBoard.addEventListener('mouseleave', stopChase);

function startChase() {
  if (!isRunning) {
    isRunning = true;
  }
}

function stopChase() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
}

function moveCat(event) {
  if (isRunning) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    var boardWidth = gameBoard.offsetWidth;
    var boardHeight = gameBoard.offsetHeight;

    var catWidth = cat.offsetWidth;
    var catHeight = cat.offsetHeight;

    var maxX = boardWidth - catWidth;
    var maxY = boardHeight - catHeight;

    var catX = parseFloat(cat.style.left) || 0;
    var catY = parseFloat(cat.style.top) || 0;

    var targetX = mouseX - catWidth / 2;
    var targetY = mouseY - catHeight / 2;

    var speed = 2;

    if (Math.abs(catX - targetX) > speed) {
      catX += (targetX - catX) / speed;
    }
    if (Math.abs(catY - targetY) > speed) {
      catY += (targetY - catY) / speed;
    }

    catX = Math.min(Math.max(catX, 0), maxX);
    catY = Math.min(Math.max(catY, 0), maxY);

    cat.style.left = catX + 'px';
    cat.style.top = catY + 'px';

    if (Math.abs(catX - targetX) <= speed && Math.abs(catY - targetY) <= speed) {
      stopChase();
      alert('Котик спіймав мишку! Гра завершена!');
    }
  }
}
