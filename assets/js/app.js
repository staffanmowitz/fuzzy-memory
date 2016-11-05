'use strict';

// Give each card a random specific value = the picture on the front of the card
let cards = [
  ['card-1', 'img-1.png', false],
  ['card-2', 'img-1.png', false],
  ['card-3', 'img-2.png', false],
  ['card-4', 'img-2.png', false],
  ['card-5', 'img-3.png', false],
  ['card-6', 'img-3.png', false],
  ['card-7', 'img-4.png', false],
  ['card-8', 'img-4.png', false],
  ['card-9', 'img-5.png', false],
  ['card-10', 'img-5.png', false],
  ['card-11', 'img-6.png', false],
  ['card-12', 'img-6.png', false],
  ['card-13', 'img-7.png', false],
  ['card-14', 'img-7.png', false],
  ['card-15', 'img-8.png', false],
  ['card-16', 'img-8.png', false]
];

let score = 0;
let flipCounter = 0;
let flippedCards = [];

// Shuffle the content of the cards-array (Fisher-Yates shuffle)
function shuffleCards (array) {
  let i = 0;
  let j = 0;
  let temp = null;
  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const dealedCards = document.querySelectorAll('.card');

function dealCards () {
  score = 0;
  document.querySelector('.score span').innerHTML = score;
  flipCounter = 0;
  flippedCards = [];
  shuffleCards(cards);
  for (let i = 0; i < dealedCards.length; i++) {
    let dealedCard = dealedCards[i];
    dealedCard.setAttribute('src', 'assets/img/back.png');
    dealedCard.setAttribute('data-image', 'assets/img/' + cards[i][1]);
    // dealedCard.setAttribute('id', cards[i][0]);
    dealedCard.className = 'card';
  }
}

dealCards();

const replay = document.querySelector('button');
replay.addEventListener('click', dealCards, false);

for (let i = 0; i < dealedCards.length; i++) {
  dealedCards[i].addEventListener('click', flipCard, false);
}

function flipCard () {
  flipCounter++;
  let cardImg = this.getAttribute('data-image');
  this.setAttribute('src', cardImg);
  flippedCards.push(this);
  console.log(flippedCards);

  if (flipCounter === 1) {
    flippedCards[0].removeEventListener('click', flipCard, false);
  }

  if (flipCounter === 2) {
    flippedCards[0].addEventListener('click', flipCard, false);
    if (flippedCards[0].getAttribute('src') === flippedCards[1].getAttribute('src')) {
      score++;
      flippedCards[0].removeEventListener('click', flipCard, false);
      flippedCards[1].removeEventListener('click', flipCard, false);
      flippedCards[0].className = 'paired';
      flippedCards[1].className = 'paired';
    } else {
      flippedCards[0].setAttribute('src', 'assets/img/back.png');
      flippedCards[1].setAttribute('src', 'assets/img/back.png');
    }
    flipCounter = 0;
    flippedCards = [];
  }
  document.querySelector('.score span').innerHTML = score;
}
