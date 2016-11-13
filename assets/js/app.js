'use strict';

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
  ['card-16', 'img-8.png'],
  ['card-17', 'img-9.png'],
  ['card-18', 'img-9.png'],
  ['card-19', 'img-10.png'],
  ['card-20', 'img-10.png'],
  ['card-21', 'img-11.png'],
  ['card-22', 'img-11.png'],
  ['card-23', 'img-12.png'],
  ['card-24', 'img-12.png'],
  ['card-25', 'img-13.png'],
  ['card-26', 'img-13.png'],
  ['card-27', 'img-14.png'],
  ['card-28', 'img-14.png'],
  ['card-29', 'img-15.png'],
  ['card-30', 'img-15.png'],
  ['card-31', 'img-16.png'],
  ['card-32', 'img-16.png'],
  ['card-33', 'img-17.png'],
  ['card-34', 'img-17.png'],
  ['card-35', 'img-18.png'],
  ['card-36', 'img-18.png']
];

let score = 0;
let flipCounter = 0;
let flippedCards = [];
let tempCards;
let dealedCards;

const replayEasy = document.querySelector('.easy button');
replayEasy.addEventListener('click', function (event) {
  dealCards('easy');
}, false);

const replayHard = document.querySelector('.hard button');
replayHard.addEventListener('click', function (event) {
  dealCards('hard');
}, false);

// Shuffle the content of the cards-array (Fisher-Yates shuffle)
function shuffleCards (array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function dealCards (level) {
  // Reset score and clear old cards for each new game
  score = 0;
  document.querySelector('.score span').innerHTML = score;
  document.querySelector('div.cards').innerHTML = '';
  tempCards = cards.slice();
  if (level === 'easy') {
    // Only play with the first 16 cards if the difficulty is set to 'easy'
    document.querySelector('div.cards').className = 'cards';
    for (var i = 0; i < 20; i++) {
      tempCards.pop();
    }
  } else {
    document.querySelector('div.cards').className = 'cards hard';
  }
  shuffleCards(tempCards);
  // Deal the shuffled cards
  for (let k = 0; k < tempCards.length; k++) {
    let card = document.createElement('img');
    card.className = 'card';
    card.setAttribute('src', 'assets/img/back.png');
    card.setAttribute('data-image', 'assets/img/' + tempCards[k][1]);
    document.querySelector('div.cards').appendChild(card);
  }
  // Add click event to the dealed cards
  dealedCards = document.querySelectorAll('.card');
  addClickEvent();
}

// Automatically start easy game on page load
dealCards('easy');

function addClickEvent () {
  for (let i = 0; i < dealedCards.length; i++) {
    // Don't add click events cards that's been paired
    if (dealedCards[i].getAttribute('class') !== 'paired') {
      dealedCards[i].addEventListener('click', flipCard, false);
    }
  }
}

function flipBack (flippedCards) {
  flippedCards[0].setAttribute('src', 'assets/img/back.png');
  flippedCards[1].setAttribute('src', 'assets/img/back.png');
  document.querySelector('.message').innerHTML = 'Try again!';
  // Add back click events to all cards
  addClickEvent();
}

function gameOver () {
  // Print message if all cards have been paired
  let pairedCards = document.querySelectorAll('.paired');
  if (pairedCards.length === dealedCards.length) {
    document.querySelector('.message').innerHTML = 'You won!';
  }
}

function flipCard () {
  flipCounter++;
  let cardImg = this.getAttribute('data-image');
  this.setAttribute('src', cardImg);
  // Add clicked cards to flippedCards-array
  flippedCards.push(this);

  if (flipCounter === 1) {
    // Remove click event from first clicked card to prevent user form clicking it again
    flippedCards[0].removeEventListener('click', flipCard, false);
  }

  if (flipCounter === 2) {
    // Prepare for next round by adding back click event to first clicked card
    flippedCards[0].addEventListener('click', flipCard, false);
    if (flippedCards[0].getAttribute('src') === flippedCards[1].getAttribute('src')) {
    // If user found a pair - add one point to the score, add class 'paired' to the cards, remove click event and print message
      score++;
      flippedCards[0].removeEventListener('click', flipCard, false);
      flippedCards[1].removeEventListener('click', flipCard, false);
      flippedCards[0].className = 'paired';
      flippedCards[1].className = 'paired';
      document.querySelector('.message').innerHTML = 'You found a pair!';
    } else {
    // If user didn't found a pair - let them look at the flipped cards for one second and then flip them back.
    // Remove click event from all cards during this time to prevent user from sneak peeking...
      for (let i = 0; i < dealedCards.length; i++) {
        dealedCards[i].removeEventListener('click', flipCard, false);
      }
      setTimeout(flipBack.bind(null, flippedCards), 1000);
    }

    // After each round: reset flipCounter and flippedCards array, print score and check if all cards have been paired
    flipCounter = 0;
    flippedCards = [];
    document.querySelector('.score span').innerHTML = score;
    gameOver();
  }
}
