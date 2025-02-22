// Audio files for various events
let flipSound = new Audio('flip-sound.mp3');
let matchSound = new Audio('match-sound.mp3');
let countdownSound = new Audio('countdown-sound.mp3');
let menuMusic = new Audio('menu-music.mp3'); // Background music for the game menu
let gameOverSound = new Audio('game-over-sound.mp3');

menuMusic.loop = true;
menuMusic.volume = 0.5;

document.addEventListener('click', () => {
    if (menuMusic.paused) {
        menuMusic.play().catch(error => console.log('Audio playback failed:', error));
    }
}, { once: true });

// Categories for the game
const categories = {
    fruits: ['🍎', '🍌', '🍇', '🍍', '🍉', '🍓', '🍑', '🍒'],
    emojis: ['😊', '😂', '😍', '😎', '🥺', '😭', '😜', '😏'],
    animals: ['🐶', '🐱', '🐹', '🐯', '🦁', '🐵', '🐧', '🐰'],
    planets: ['🌗', '🌑', '🌕', '🌞', '🪐', '🌙', '🌒', '🌍'],
    country: ['🇮🇳🕌', '🇺🇸🗽', '🇬🇧🏰', '🇮🇹🍕', '🇯🇵🎌', '🇨🇦🍁', '🇨🇳🐉', '🇰🇷🥢']
};

let gameGrid = [];
let flippedCards = [];
let matchedCards = [];
let score = 0;
let timeRemaining = 20;
let timerInterval;
let countdownWarningPlayed = false;

// Show game menu
function showGameMenu() {
    document.querySelector('.landing-page').style.display = 'block';
    document.querySelector('.game-container').style.display = 'none';
    document.querySelector('.game-over').style.display = 'none';

    document.getElementById('game-over-gif').style.display = 'none'; // Hide GIF

    if (menuMusic.paused) {
        menuMusic.currentTime = 0;
        menuMusic.play().catch(error => console.log('Audio playback failed:', error));
    }
}

// Start the game
function startGame(category) {
    menuMusic.pause();

    gameGrid = createGameGrid(category);
    gameGrid = shuffle(gameGrid);
    flippedCards = [];
    matchedCards = [];
    score = 0;
    countdownWarningPlayed = false;

    renderCards(gameGrid);

    document.querySelector('.landing-page').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';

    document.getElementById('score').innerText = score;
    timeRemaining = 20;
    document.getElementById('time').innerText = timeRemaining;
    document.getElementById('time').classList.remove('warning');

    clearInterval(timerInterval);
    startTimer();
}

function createGameGrid(category) {
    return [...categories[category], ...categories[category]];
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function renderCards(grid) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    grid.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);
        card.setAttribute('data-value', item);
        card.addEventListener('click', handleCardClick);
        container.appendChild(card);
    });
}

function handleCardClick(event) {
    flipSound.play();
    const card = event.target;

    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        card.innerText = card.getAttribute('data-value');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        matchSound.play();
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        score += 10;
        document.getElementById('score').innerText = score;
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];

        timeRemaining += 2;
        document.getElementById('time').innerText = timeRemaining;
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.innerText = '';
            flippedCards = [];
        }, 1000);
    }

    if (matchedCards.length === gameGrid.length) {
        gameOver(true);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        document.getElementById('time').innerText = timeRemaining;

        if (timeRemaining <= 10 && !countdownWarningPlayed) {
            countdownSound.play();
            countdownWarningPlayed = true;
            document.getElementById('time').classList.add('warning');
        }

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            gameOver(false);
        }
    }, 1000);
}

function gameOver(win) {
    clearInterval(timerInterval);
    gameOverSound.play();
    const gameOverScreen = document.querySelector('.game-over');
    gameOverScreen.style.display = 'block';
    document.querySelector('.game-container').style.display = 'none';
    document.getElementById('final-score').innerText = score;
    document.getElementById('game-over-message').innerText = win ? 'You Win!' : 'Game Over';
    document.getElementById('game-over-message').style.color = win ? 'green' : 'red';

    // Show GIF below score
    const gameOverGif = document.getElementById('game-over-gif');
    gameOverGif.src = win ? 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWFocmRkYnV5aWJyZHlpYmJkZDk3NXNzejVibDdxa3NsaHZ4dWU2NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUA7aRXez8Do8SZOSI/giphy.gif' : 'https://tenor.com/view/pepe-loser-gif-26920875https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2d4bHJ1Y2poY2cxanE0eWxldHU5MHB4eHQ1OGZoZHcyeXU5d29qdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JUSwkiO1Eh5K43ruN0/giphy.gif';
    gameOverGif.style.display = 'block';
}

function restartGame() {
    showGameMenu();
}

function exitGame() {
    showGameMenu();
}

window.addEventListener('DOMContentLoaded', showGameMenu);
