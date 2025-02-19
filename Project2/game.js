// Audio files for various events  
let flipSound = new Audio('flip-sound.mp3');
let matchSound = new Audio('match-sound.mp3');
let countdownSound = new Audio('countdown-sound.mp3');
let menuMusic = new Audio('menu-music.mp3'); // Background music for the game menu
let gameOverSound = new Audio('game-over-sound.mp3');

menuMusic.loop = true;
menuMusic.volume = 0.5;

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
let timeRemaining = 30;
let timerInterval;
let countdownWarningPlayed = false;

// Play menu music when on the game menu
function showGameMenu() {
    document.querySelector('.landing-page').style.display = 'block';
    document.querySelector('.game-container').style.display = 'none';
    document.querySelector('.game-over').style.display = 'none';

    // Ensure menu music plays when the menu is visible
    menuMusic.currentTime = 0; // Restart music
    menuMusic.play().catch(error => console.log('Audio playback failed:', error));
}

// Start the game with the selected category
function startGame(category) {
    menuMusic.pause(); // Stop menu music when the game starts

    // Reset game state
    gameGrid = createGameGrid(category);
    gameGrid = shuffle(gameGrid);
    flippedCards = [];
    matchedCards = [];
    score = 0;
    countdownWarningPlayed = false;

    // Render cards
    renderCards(gameGrid);

    // Update UI
    document.querySelector('.landing-page').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';

    document.getElementById('score').innerText = score;
    timeRemaining = 30;
    document.getElementById('time').innerText = timeRemaining;
    document.getElementById('time').classList.remove('warning');

    // Start the timer
    startTimer();
}

// Create the game grid based on the selected category
function createGameGrid(category) {
    return [...categories[category], ...categories[category]];  // Make pairs of cards
}

// Shuffle the array of cards
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Render the cards on the screen
function renderCards(grid) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';  // Clear any previous cards

    grid.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);
        card.setAttribute('data-value', item);
        card.addEventListener('click', handleCardClick);
        container.appendChild(card);
    });
}

// Handle card clicks and flip logic
function handleCardClick(event) {
    flipSound.play(); // Play flip sound

    const card = event.target;

    // Prevent flipping if already flipped or matched
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        card.innerText = card.getAttribute('data-value');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check for match between two flipped cards
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        matchSound.play();  // Play match sound
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        score += 10;
        document.getElementById('score').innerText = score;
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.innerText = '';
            flippedCards = [];
        }, 1000);
    }

    checkForGameOver();
}

// Check if the game is over (all cards matched)
function checkForGameOver() {
    if (matchedCards.length === gameGrid.length) {
        clearInterval(timerInterval);
        gameOver(true);  // Game Over - You Win
    }
}

// Start the countdown timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        document.getElementById('time').innerText = timeRemaining;

        // Trigger warning sound if time is less than or equal to 10 seconds
        if (timeRemaining <= 10 && !countdownWarningPlayed) {
            countdownSound.play();
            countdownWarningPlayed = true;
            document.getElementById('time').classList.add('warning');  // Change timer to warning color
        }

        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            gameOver(false);  // Game Over - Time's Up
        }
    }, 1000);
}

// End the game and show Game Over screen with animation
function gameOver(win) {
    gameOverSound.play();  // Play game over sound
    const gameOverScreen = document.querySelector('.game-over');
    gameOverScreen.style.display = 'block';
    gameOverScreen.classList.add('game-over-animation');  // CSS class for animation
    document.querySelector('.game-container').style.display = 'none';
    document.getElementById('final-score').innerText = score;
    document.getElementById('game-over-message').innerText = win ? 'You Win!' : 'Game Over';
}

// Restart the game
function restartGame() {
    showGameMenu();
}

// Exit the game
function exitGame() {
    showGameMenu();
}

// Initialize the game menu on page load
window.addEventListener('DOMContentLoaded', showGameMenu);
window.addEventListener('load', () => {
    menuMusic.play().catch(error => console.log('Audio playback failed:', error));
});
