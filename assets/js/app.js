'use strict';

// Give each card a random specific value = the picture on the front of the card
const cards = [
  'img-1',
  'img-1',
  'img-2',
  'img-2',
  'img-3',
  'img-3',
  'img-4',
  'img-4',
  'img-5',
  'img-5',
  'img-6',
  'img-6',
  'img-7',
  'img-7',
  'img-8',
  'img-8'
];

const newGame = document.querySelector('button');

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

function dealCards () {
  shuffleCards(cards);
  document.querySelector('div.cards').innerHTML = '';
  cards.forEach(function (i) {
    let card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-image', i + '.png');
    card.innerHTML = '<img src="assets/img/back.png">';
    document.querySelector('div.cards').appendChild(card);
  });
}

dealCards();

newGame.addEventListener('click', function (event) {
  dealCards();
});

const card = document.querySelectorAll('div.card');

for (let i = 0; i < card.length; i++) {
  card[i].addEventListener('click', function () {
    let cardImg = card[i].getAttribute('data-image');
    this.innerHTML = '<img src="assets/img/' + cardImg + '">';
  });
}
