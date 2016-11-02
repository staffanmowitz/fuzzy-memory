'use strict';

// Give each card a random specific value = the picture on the front of the card
var cards = [
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

function dealCards() {
  document.querySelector('div.cards').innerHTML = "";
  cards.forEach(function(i) {
    var card = document.createElement('div');
    card.className = 'card';
    //card.innerHTML = i;
    document.querySelector('div.cards').appendChild(card);
  });
}

dealCards();
