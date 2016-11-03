'use strict';

// Give each card a random specific value = the picture on the front of the card
const cards = [
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
  shuffleCards(cards);
  for (let i = 0; i < dealedCards.length; i++) {
    let dealedCard = dealedCards[i];
    dealedCard.setAttribute('src', 'assets/img/back.png');
    dealedCard.setAttribute('data-image', 'assets/img/' + cards[i][1]);
  }
}

dealCards();

const replay = document.querySelector('button');
replay.addEventListener('click', dealCards, false);

for (let i = 0; i < dealedCards.length; i++) {
  dealedCards[i].addEventListener('click', flipCard, false);
}

function flipCard () {
  let cardImg = this.getAttribute('data-image');
  this.setAttribute('src', cardImg);
}
