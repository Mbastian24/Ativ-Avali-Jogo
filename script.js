const images = [
    './assets/smurf1.jpg',
    './assets/smurf1.jpg',
    './assets/smurf2.jpg',
    './assets/smurf2.jpg',
    './assets/smurf3.jpg',
    './assets/smurf3.jpg',
    './assets/smurf4.jpg',
    './assets/smurf4.jpg',
    './assets/smurf5.jpg',
    './assets/smurf5.jpg',
    './assets/smurf6.jpg',
    './assets/smurf6.jpg',
    './assets/smurf7.jpg',
    './assets/smurf7.jpg',
    './assets/smurf8.jpg',
    './assets/smurf8.jpg'
];

let gameBoard = document.getElementById('jogo');
let timerDisplay = document.getElementById('timer');
let flippedCards = [];
let matchedCards = [];
let seconds = 0;
let timer;

function initGame() {
    clearInterval(timer);
    seconds = 0;
    timerDisplay.textContent = 'Tempo: 0s';
    matchedCards = [];
    flippedCards = [];
    createBoard();
}

function createBoard() {
    gameBoard.innerHTML = '';
    shuffleCards();
    images.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('quadradinho');
        card.dataset.value = image;
        card.style.backgroundImage = ''; // Limpa a imagem inicial
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

function shuffleCards() {
    images.sort(() => 0.5 - Math.random());
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.style.backgroundImage = `url(${card.dataset.value})`;
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 1) {
            startTimer();
        }

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
        checkGameOver();
    } else {
        firstCard.style.backgroundImage = '';
        secondCard.style.backgroundImage = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }
    flippedCards = [];
}

function checkGameOver() {
    if (matchedCards.length === images.length) {
        clearInterval(timer);
        alert(`Parabéns! Você completou o jogo em ${seconds} segundos.`);
    }
}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            seconds++;
            timerDisplay.textContent = `Tempo: ${seconds}s`;
        }, 1000);
    }
}

document.getElementById('embaralhar').addEventListener('click', initGame);
initGame();
