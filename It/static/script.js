var myContainerElement = document.getElementById("my-container");
var inputElement = document.getElementById("input");
var timerElement = document.getElementById("timer");
var resultElement = document.getElementById("result");
var startButton = document.getElementById("start-button");
var endButton = document.getElementById("end-button");

var startTime;
var endTime;
var typedCharacters = 0;

startButton.addEventListener("click", function() {
  startGame();
});

endButton.addEventListener("click", function() {
  endGame();
});

function startGame() {
  inputElement.disabled = false;
  inputElement.value = "";
  inputElement.focus();
  startTime = new Date();
  startTimer();
  startButton.disabled = true;
  endButton.disabled = false;
}

function endGame() {
  inputElement.disabled = true;
  endTime = new Date();
  var elapsedTime = (endTime - startTime) / 60000; // перетворення в хвилини
  var cpm = Math.round(typedCharacters / elapsedTime);

  resultElement.textContent = "Ваша швидкість письма: " + cpm + " CPM";
  startButton.disabled = false;
  endButton.disabled = true;
}

function startTimer() {
  var timerInterval = setInterval(function() {
    var currentTime = new Date();
    var elapsedTime = Math.floor((currentTime - startTime) / 1000); // перетворення в секунди
    timerElement.textContent = elapsedTime + "c";
  }, 1000); // оновлення кожну секунду
}

inputElement.addEventListener("input", function() {
  typedCharacters = inputElement.value.length;
});

inputElement.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) { // перевірка, чи натиснута клавіша Enter
    endGame();
  }
});
