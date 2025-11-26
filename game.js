// ===================================
// EGG FRIED RICE - COOKING GAME
// Interactive Cooking Simulation
// ===================================

// Game State
const gameState = {
    ingredientsAdded: [],
    totalIngredients: 4,
    currentStep: 0,
    instructions: [
        'Click on the ingredients to add them to your wok! Start with egg 🥚',
        'Great! Now add the rice 🍚',
        'Perfect! Add some green onion 🧅',
        'Almost done! Pour in some oil 🛢️',
        'Excellent! Your Egg Fried Rice is ready!'
    ]
};

// DOM Elements
let progressFill, instructionText, finalScreen;
let ingredientButtons, resetBtn;
let overlay1, overlay2, wokImage;

// ===================================
// INITIALIZATION
// ===================================
function init() {
    console.log('🍳 Initializing Egg Fried Rice Game...');

    // Get DOM elements
    progressFill = document.getElementById('progressFill');
    instructionText = document.getElementById('instructionText');
    finalScreen = document.getElementById('finalScreen');
    resetBtn = document.getElementById('resetBtn');
    overlay1 = document.getElementById('overlay1');
    overlay2 = document.getElementById('overlay2');
    wokImage = document.getElementById('wokImage');

    // Get all ingredient buttons
    ingredientButtons = document.querySelectorAll('.ingredient-button');

    // Setup event listeners
    setupEventListeners();

    // Start the game
    updateInstruction();
}

// ===================================
// EVENT LISTENERS
// ===================================
function setupEventListeners() {
    // Ingredient buttons
    ingredientButtons.forEach(button => {
        button.addEventListener('click', () => handleIngredientClick(button));
    });

    // Reset button
    resetBtn.addEventListener('click', resetGame);
}

// ===================================
// GAME LOGIC
// ===================================
function handleIngredientClick(button) {
    const ingredient = button.dataset.ingredient;

    // Check if already used
    if (gameState.ingredientsAdded.includes(ingredient)) {
        return;
    }

    // Add ingredient
    gameState.ingredientsAdded.push(ingredient);

    // Mark button as used
    button.classList.add('used');

    // Add visual feedback
    button.classList.add('shake');
    setTimeout(() => button.classList.remove('shake'), 500);

    // Update progress
    updateProgress();

    // Show ingredient overlays progressively
    showIngredientOverlay();

    // Update instruction
    gameState.currentStep++;
    updateInstruction();

    // Play sound effect (optional - can be added)
    playAddSound();

    // Check if complete
    if (gameState.ingredientsAdded.length === gameState.totalIngredients) {
        setTimeout(showFinalScreen, 1000);
    }
}

function updateProgress() {
    const progress = (gameState.ingredientsAdded.length / gameState.totalIngredients) * 100;
    progressFill.style.width = progress + '%';
}

function updateInstruction() {
    instructionText.textContent = gameState.instructions[gameState.currentStep];
    instructionText.classList.add('fade-in');

    setTimeout(() => {
        instructionText.classList.remove('fade-in');
    }, 500);
}

function showIngredientOverlay() {
    const ingredientCount = gameState.ingredientsAdded.length;

    // Show overlays progressively
    if (ingredientCount === 1) {
        // First ingredient - start showing overlay1
        overlay1.classList.add('visible');
    } else if (ingredientCount === 2) {
        // Second ingredient - enhance overlay1
        overlay1.style.opacity = '0.8';
    } else if (ingredientCount === 3) {
        // Third ingredient - show overlay2
        overlay2.classList.add('visible');
        overlay2.style.opacity = '0.6';
    } else if (ingredientCount === 4) {
        // Final ingredient - full overlays
        overlay1.style.opacity = '1';
        overlay2.style.opacity = '0.9';
    }
}

function showFinalScreen() {
    // Show final screen with animation
    finalScreen.classList.add('visible');

    // Play celebration effect
    createConfetti();
}

// ===================================
// RESET GAME
// ===================================
function resetGame() {
    console.log('🔄 Resetting game...');

    // Reset game state
    gameState.ingredientsAdded = [];
    gameState.currentStep = 0;

    // Reset progress bar
    progressFill.style.width = '0%';

    // Reset ingredient buttons
    ingredientButtons.forEach(button => {
        button.classList.remove('used', 'shake');
    });

    // Reset overlays
    overlay1.classList.remove('visible');
    overlay2.classList.remove('visible');
    overlay1.style.opacity = '';
    overlay2.style.opacity = '';

    // Hide final screen
    finalScreen.classList.remove('visible');

    // Reset instruction
    updateInstruction();
}

// ===================================
// VISUAL EFFECTS
// ===================================
function playAddSound() {
    // Optional: Add sound effects here
    // For now, just log
    console.log('🎵 Ingredient added!');
}

function createConfetti() {
    // Create colorful confetti particles
    const colors = ['#ff1493', '#4169e1', '#ffd700', '#00ff00', '#ff6347'];
    const container = document.querySelector('.container');

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.transition = 'all 3s ease-in';

            container.appendChild(confetti);

            // Animate falling
            setTimeout(() => {
                confetti.style.top = '100%';
                confetti.style.transform = `rotate(${Math.random() * 360}deg) translateX(${(Math.random() - 0.5) * 200}px)`;
                confetti.style.opacity = '0';
            }, 10);

            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 30);
    }
}

// ===================================
// TEXTURE PRELOADING
// ===================================
function preloadTextures() {
    const textures = [
        'textures/kitchen1.png',
        'textures/kitchen2.png',
        'textures/kitchen3.png'
    ];

    let loadedCount = 0;

    textures.forEach(src => {
        const img = new Image();
        img.onload = () => {
            loadedCount++;
            if (loadedCount === textures.length) {
                console.log('✅ All textures loaded!');
            }
        };
        img.onerror = () => {
            console.warn(`⚠️ Failed to load: ${src}`);
            loadedCount++;
        };
        img.src = src;
    });
}

// ===================================
// START GAME
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    init();
    preloadTextures();
    console.log('🎮 Egg Fried Rice Game Ready!');
});

// ===================================
// KEYBOARD SHORTCUTS (OPTIONAL)
// ===================================
document.addEventListener('keydown', (e) => {
    // Press R to reset
    if (e.key === 'r' || e.key === 'R') {
        if (finalScreen.classList.contains('visible')) {
            resetGame();
        }
    }

    // Press 1-4 to add ingredients
    const keyMap = {
        '1': 'eggBtn',
        '2': 'riceBtn',
        '3': 'greenOnionBtn',
        '4': 'oilBtn'
    };

    if (keyMap[e.key]) {
        const button = document.getElementById(keyMap[e.key]);
        if (button && !button.classList.contains('used')) {
            button.click();
        }
    }
});

console.log('🍳 Game loaded successfully!');
