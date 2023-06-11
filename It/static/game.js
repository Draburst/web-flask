var cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E']; // Пари карток
var shuffledCards = shuffle(cards); // Перемішані картки
var flippedCards = []; // Обрані картки
var isGameFinished = false; // Флаг, чи гра завершена

// Створення ігрової дошки
var gameBoard = document.getElementById('game-board');
for (var i = 0; i < shuffledCards.length; i++) {
  var card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-card-index', i);
  card.addEventListener('click', flipCard);
  gameBoard.appendChild(card);
}

// Функція для обертання картки
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped') && !isGameFinished) {
    this.innerHTML = shuffledCards[this.getAttribute('data-card-index')];
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

// Перевірка збігу обраних карток
function checkMatch() {
  var card1 = flippedCards[0];
  var card2 = flippedCards[1];

  if (card1.innerHTML === card2.innerHTML) {
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
    checkGameFinished();
  } else {
    card1.innerHTML = '';
    card2.innerHTML = '';
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  flippedCards = [];
}

// Перевірка, чи гра завершена
function checkGameFinished() {
  var flippedCount = document.getElementsByClassName('flipped').length;
  if (flippedCount === shuffledCards.length) {
    showWinMessage();
    isGameFinished = true;
  }
}

// Показати повідомлення про виграш
function showWinMessage() {
  var messageElement = document.getElementById('message');
  messageElement.innerText = 'Ви виграли! Бажаєте продовжити?';

  var playAgainButton = document.getElementById('play-again');
  playAgainButton.style.display = 'block';
  playAgainButton.addEventListener('click', playAgain);
}

// Функція для початку гри знову
function playAgain() {
  var messageElement = document.getElementById('message');
  messageElement.innerText = '';

  var playAgainButton = document.getElementById('play-again');
  playAgainButton.style.display = 'none';

  // Перемішати картки знову
  shuffledCards = shuffle(cards);
  var cardElements = document.getElementsByClassName('card');
  for (var i = 0; i < cardElements.length; i++) {
    cardElements[i].innerHTML = '';
    cardElements[i].classList.remove('flipped');
    cardElements[i].addEventListener('click', flipCard);
  }

  isGameFinished = false;
}

// Функція для перемішування масиву
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
