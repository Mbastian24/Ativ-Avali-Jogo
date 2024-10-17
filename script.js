// Array de imagens, cada imagem aparece duas vezes
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

// Elementos para o tabuleiro e o display do timer
let gameBoard = document.getElementById('jogo');
let timerDisplay = document.getElementById('timer');
let flippedCards = []; // Cartas atualmente viradas
let matchedCards = []; // Cartas que foram combinadas
let seconds = 0; // Contador de segundos
let timer; // Temporizador

// Inicio o jogo
function initGame() {
    clearInterval(timer); // Para o temporizador, se estiver em execução
    seconds = 0; // Reinicia o contador de segundos
    timerDisplay.textContent = 'Tempo: 0s'; // Atualiza o display do timer
    matchedCards = []; // Limpa cartas combinadas
    flippedCards = []; // Limpa cartas viradas
    createBoard(); // Cria o tabuleiro do jogo
}

// Cria o tabuleiro de jogo
function createBoard() {
    gameBoard.innerHTML = ''; // Limpa o conteúdo do tabuleiro
    shuffleCards(); // Embaralha as cartas
    images.forEach(image => {
        const card = document.createElement('div'); // Cria uma nova carta
        card.classList.add('quadradinho'); // Adiciona classe para estilo
        card.dataset.value = image; // Armazena o valor da imagem
        card.style.backgroundImage = ''; // Limpa a imagem inicial
        card.addEventListener('click', () => flipCard(card)); // Adiciona evento de clique
        gameBoard.appendChild(card); // Adiciona a carta ao tabuleiro
    });
}

// Embaralha as cartas
function shuffleCards() {
    images.sort(() => 0.5 - Math.random()); // Ordena o array de imagens aleatoriamente
}

// Lógica para virar uma carta
function flipCard(card) {
    // Ve se é possível virar a carta
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.style.backgroundImage = `url(${card.dataset.value})`; // Define a imagem da carta
        card.classList.add('flipped'); // Marca a carta como virada
        flippedCards.push(card); // Adiciona a carta à lista de cartas viradas

        // Inicia o temporizador na primeira carta virada
        if (flippedCards.length === 1) {
            startTimer();
        }

        // Se duas cartas estão viradas, verifica a correspondência após 1 segundo
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// Verifica se as duas cartas viradas são iguais
function checkMatch() {
    const [firstCard, secondCard] = flippedCards; // Desestrutura as cartas viradas
    // Verifica se as cartas correspondem
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched'); // Marca as cartas como combinadas
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard); // Adiciona às cartas combinadas
        checkGameOver(); // Verifica se o jogo terminou
    } else {
        // Se não correspondem, vira as cartas de volta
        firstCard.style.backgroundImage = '';
        secondCard.style.backgroundImage = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }
    flippedCards = []; // Limpa a lista de cartas viradas
}

// Verifica se o jogo acabou
function checkGameOver() {
    // Se todas as cartas foram combinadas
    if (matchedCards.length === images.length) {
        clearInterval(timer); // Para o temporizador
        alert(`Impressionante! Você é mais rápido que o Wi-Fi da sua avó! Tempo ${seconds} segundos.`); // Exibe mensagem de vitória
    }
}

// Inicia o temporizador
function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            seconds++; // Coloca o contador de segundos
            timerDisplay.textContent = `Tempo: ${seconds}s`; // Atualiza o display do timer
        }, 1000); // A cada segundo
    }
}

// Adiciona evento para o botão de embaralhar
document.getElementById('embaralhar').addEventListener('click', initGame);
initGame(); // Inicia o jogo ao carregar a página
