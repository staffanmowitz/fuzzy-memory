'use strict';

let cards = [
  ['card-1', 'img-1.png'],
  ['card-2', 'img-1.png'],
  ['card-3', 'img-2.png'],
  ['card-4', 'img-2.png'],
  ['card-5', 'img-3.png'],
  ['card-6', 'img-3.png'],
  ['card-7', 'img-4.png'],
  ['card-8', 'img-4.png'],
  ['card-9', 'img-5.png'],
  ['card-10', 'img-5.png'],
  ['card-11', 'img-6.png'],
  ['card-12', 'img-6.png'],
  ['card-13', 'img-7.png'],
  ['card-14', 'img-7.png'],
  ['card-15', 'img-8.png'],
  ['card-16', 'img-8.png']
];

let score = 0;
let flipCounter = 0;
let flippedCards = [];

// Shuffle the content of the cards-array (Fisher-Yates shuffle)
function shuffleCards (array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const dealedCards = document.querySelectorAll('.card');

function dealCards () {
  score = 0;
  document.querySelector('.score span').innerHTML = score;
  shuffleCards(cards);
  for (let i = 0; i < dealedCards.length; i++) {
    let dealedCard = dealedCards[i];
    dealedCard.setAttribute('src', 'assets/img/back.png');
    dealedCard.setAttribute('data-image', 'assets/img/' + cards[i][1]);
    dealedCard.className = 'card';
  }
}

const replay = document.querySelector('.replay button');
replay.addEventListener('click', dealCards, false);

dealCards();

function addClickEvent () {
  for (let i = 0; i < dealedCards.length; i++) {
    // Don't add click events cards that's been paired
    if (dealedCards[i].getAttribute('class') !== 'paired') {
      dealedCards[i].addEventListener('click', flipCard, false);
    }
  }
}
addClickEvent();

function flipBack (flippedCards) {
  flippedCards[0].setAttribute('src', 'assets/img/back.png');
  flippedCards[1].setAttribute('src', 'assets/img/back.png');
  document.querySelector('.message').innerHTML = 'Try again!';
  addClickEvent();
}

function flipCard () {
  flipCounter++;
  let cardImg = this.getAttribute('data-image');
  this.setAttribute('src', cardImg);
  flippedCards.push(this);

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
      document.querySelector('.message').innerHTML = 'You found a pair!';
    } else {
      for (let i = 0; i < dealedCards.length; i++) {
        dealedCards[i].removeEventListener('click', flipCard, false);
      }
      setTimeout(flipBack.bind(null, flippedCards), 1000);
    }
    flipCounter = 0;
    flippedCards = [];
    document.querySelector('.score span').innerHTML = score;
  }
}
