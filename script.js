let cardsArray = [
  "public/bobrossparrot.gif",
  "public/explodyparrot.gif",
  "public/fiestaparrot.gif",
  "public/metalparrot.gif",
  "public/revertitparrot.gif",
  "public/tripletsparrot.gif",
  "public/unicornparrot.gif"
];


let promptValue = 0;
let totalCardsFlipped = 0;
let seconds = 0;
let howManyFlippedCards = 0;
let howManyMoves = 0;
let flippedCards = [];
let timerId;


howManyCards();
counter();


function counter() {

  const timerDiv = document.createElement('div');
  timerDiv.className = 'timer';
  timerDiv.textContent = `${seconds} segundos`;
  document.body.appendChild(timerDiv);

  timerId = setInterval(() => {
    seconds++;
    timerDiv.textContent = `${seconds} segundos`; 
  }, 1000);
}

function howManyCards() {

  while (promptValue < 4 || promptValue > 14 || promptValue % 2 !== 0) {
    promptValue = Number(prompt("Insira um número par entre 4 e 14:"));
  }

  randomizeArray()

}


function randomizeArray() { 

  cardsArray.sort(() => Math.random() - 0.5);

  const numberOfCards = promptValue / 2;

  let selectedCardsArray = cardsArray.slice(0, numberOfCards);

  gameStart(selectedCardsArray);

}
 

function gameStart(selectedCardsArray) {

  const finalCardsArray = selectedCardsArray.concat(selectedCardsArray);

  finalCardsArray.sort(() => Math.random() - 0.5);

  const cardContainer = document.querySelector('.card-container');

  for (let i = 0; i < finalCardsArray.length; i++) {
    let cardHTML = `
    <div class="card" id="${i}">
      <div class="front-face face">
        <img src="public/back.png" alt="Back" class="card-back">
      </div>
      <div class="back-face face">
        <img src="${finalCardsArray[i]}" alt="Front" class="card-front">
      </div>
    </div>
    `;

    const temporaryContainer = document.createElement('div');
    temporaryContainer.innerHTML = cardHTML;

    temporaryContainer.firstElementChild.addEventListener('click', cardClicked);
  
    cardContainer.appendChild(temporaryContainer.firstElementChild);
  }
}


function cardClicked(event) {

  /* Information about a clicked card */
  const card = event.currentTarget;

  let cardId = card.getAttribute('id');

  /* If you click an already flipped card, the app doesn't count as a move */
  if (!(card.querySelector('.front-face').classList.contains("front-face-click"))) {
    howManyMoves++;
    console.log(`howManyMoves: ${howManyMoves}`);
  };

  /* Making sure I don't count two or more clicks related to an already flipped card */
  if (cardId !== flippedCards[0] && cardId !== flippedCards[1] && !(card.querySelector('.front-face').classList.contains("front-face-click"))) {
    flippedCards.push(cardId);
    howManyFlippedCards++;
    console.log(`flippedCards: [${flippedCards}]`)
    console.log(`howManyFlippedCards: ${howManyFlippedCards}`)
  }

  /* When to flip a card */
  if (howManyFlippedCards <= 2 && !(card.querySelector('.front-face').classList.contains("front-face-click"))) {
    card.querySelector('.front-face').classList.add('front-face-click');
    card.querySelector('.back-face').classList.add('back-face-click')
  }

  handleCards();
}

  
function handleCards() {

  if (howManyFlippedCards === 2) {

    const firstCardSrc = document.getElementById(flippedCards[0]).querySelector('.back-face img').getAttribute('src');
    const secondCardSrc = document.getElementById(flippedCards[1]).querySelector('.back-face img').getAttribute('src');

    /* Checking if the cards are a match */
    if (firstCardSrc === secondCardSrc) {

      totalCardsFlipped += 2;
      flippedCards = [];
      howManyFlippedCards = 0;
      console.log(`totalCardsFlipped: ${totalCardsFlipped}`);
      console.log(`promptValue: ${promptValue}`);

      /* In case the cards aren't a match */
    } else {

      setTimeout(() => {

        let firstCard = document.getElementById(flippedCards[0]);
        let secondCard = document.getElementById(flippedCards[1]);
      
        firstCard.children[0].classList.remove('front-face-click');
        firstCard.children[1].classList.remove('back-face-click');
    
        secondCard.children[0].classList.remove('front-face-click');
        secondCard.children[1].classList.remove('back-face-click');
    
        flippedCards = [];
        howManyFlippedCards = 0;
  
      }, 1000)
    }
  };

  setTimeout(() => {
    handleEnd();
  }, 500)

}


function handleEnd() {

  if (totalCardsFlipped === promptValue) {

    clearInterval(timerId);
    alert(`Você ganhou em ${howManyMoves} jogadas e em ${seconds} segundos!`)

    location.reload(); 

  };

}
