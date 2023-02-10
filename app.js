let deckId = '';
let card1Value = '';
let card2Value = '';
let compScore = 0;
let playerScore = 0;
const gameContainer = document.querySelector('.game-container');
const newDeckBtn = document.querySelector('.newDeckBtn');
const drawBtn = document.querySelector('.drawBtn');
const winnerHtml = document.querySelector('.winner');
const remainingHtml = document.querySelector('.remaining');
const compScoreEl = document.querySelector('.score.computer');
const playerScoreEl = document.querySelector('.score.player');

async function getNewDeck() {
    const res = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await res.json()
    remainingHtml.textContent = `Remaining cards: ${data.remaining}`
    deckId = data.deck_id
}

async function drawCards() {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`);
    const data = await res.json();
    remainingHtml.textContent = `Remaining Cards: ${data.remaining}`;
    gameContainer.children[3].innerHTML = `
        <img class="card" src=${data.cards[0].image} />`;
    gameContainer.children[4].innerHTML = `
        <img class="card" src=${data.cards[1].image} />`;
    card1Value = data.cards[0].value;
    card2Value = data.cards[1].value;
    winnerHtml.textContent = findWinner(card1Value, card2Value);

    if (data.remaining === 0) {
        drawBtn.disabled = true;
        if (compScore > playerScore) {
            remainingHtml.textContent = 'The Computer Wins!!!';
        } else if (compScore < playerScore) {
            remainingHtml.textContent = 'Player Wins!!!';
        } else {
            remainingHtml.textContent = `It's a tie!!!`;
        }
    }
}

function findWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"];
    const card1ValueIndex = valueOptions.indexOf(card1);
    const card2ValueIndex = valueOptions.indexOf(card2);

    if (card1ValueIndex > card2ValueIndex) {
        compScore++;
        compScoreEl.textContent = `Computer: ${compScore}`;
        return 'The Computer Wins!';
    } else if (card1ValueIndex < card2ValueIndex) {
        playerScore++;
        playerScoreEl.textContent = `Player: ${playerScore}`;
        return 'You win!';
    } else {
        return 'War';
    }
}

newDeckBtn.addEventListener('click', getNewDeck)

drawBtn.addEventListener('click', drawCards)