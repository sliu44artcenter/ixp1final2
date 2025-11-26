// ===========================
// Egg Fried Rice Game
// ===========================

// Game State
const gameState = {
    currentStep: 1,
    textures: {},
    ingredients: {
        egg: false,
        shallot: false,
        rice: false,
        oil: false
    },
    cutProgress: 0,
    cutRequired: 10,
    wokHeated: false,
    wokOiled: false,
    wokIngredients: [],
    gameComplete: false
};

// Canvas Setup
let canvas, ctx;

// ===========================
// Initialization
// ===========================

function init() {
    console.log('🍳 Initializing Egg Fried Rice Game...');

    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // Load textures
    loadTextures();

    // Initialize scene
    initScene();

    // Setup event listeners
    setupEventListeners();

    // Start with step 1 active
    activateStep(1);
}

// ===========================
// Texture Loading
// ===========================

function loadTextures() {
    console.log('📦 Loading textures...');

    const textureFiles = [
        'textures/kitchen1.png',
        'textures/kitchen2.png',
        'textures/kitchen3.png'
    ];

    let loadedCount = 0;

    textureFiles.forEach((file, index) => {
        const img = new Image();
        img.onload = () => {
            gameState.textures[`kitchen${index + 1}`] = img;
            loadedCount++;

            if (loadedCount === textureFiles.length) {
                console.log('✅ All textures loaded!');
                renderScene();
            }
        };

        img.onerror = () => {
            console.warn(`⚠️ Could not load ${file}. Using placeholder.`);
            loadedCount++;

            if (loadedCount === textureFiles.length) {
                renderScene();
            }
        };

        img.src = file;
    });
}

// ===========================
// Scene Initialization & Rendering
// ===========================

function initScene() {
    console.log('🎨 Initializing scene...');
    renderScene();
}

function renderScene() {
    // Clear canvas
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render background texture (kitchen1 as main background)
    if (gameState.textures.kitchen1) {
        ctx.globalAlpha = 0.4;
        ctx.drawImage(gameState.textures.kitchen1, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;
    }

    // Render based on current step
    switch (gameState.currentStep) {
        case 1:
            renderIngredientSelectionScene();
            break;
        case 2:
            renderCuttingBoardScene();
            break;
        case 3:
        case 4:
        case 5:
            renderWokScene();
            break;
        case 6:
            renderFinalDishScene();
            break;
    }

    // Add kitchen atmosphere
    addKitchenAtmosphere();
}

function renderIngredientSelectionScene() {
    // Draw a kitchen counter/table area
    ctx.fillStyle = '#b8956a';
    ctx.fillRect(50, 150, 700, 250);

    // Draw counter edge
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(50, 150, 700, 20);

    // Add texture overlay (kitchen2) for counter
    if (gameState.textures.kitchen2) {
        ctx.globalAlpha = 0.3;
        ctx.drawImage(gameState.textures.kitchen2, 50, 150, 700, 250);
        ctx.globalAlpha = 1.0;
    }

    // Draw labels
    ctx.fillStyle = '#5a4635';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Select Your Ingredients', canvas.width / 2, 100);
}

function renderCuttingBoardScene() {
    // Use kitchen3 texture for cutting board area
    if (gameState.textures.kitchen3) {
        ctx.globalAlpha = 0.5;
        ctx.drawImage(gameState.textures.kitchen3, 200, 150, 400, 300);
        ctx.globalAlpha = 1.0;
    }
}

function renderWokScene() {
    // Draw stove area
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(150, 200, 500, 300);

    // Use kitchen textures for stove background
    if (gameState.textures.kitchen1) {
        ctx.globalAlpha = 0.2;
        ctx.drawImage(gameState.textures.kitchen1, 150, 200, 500, 300);
        ctx.globalAlpha = 1.0;
    }

    // Draw stove top
    ctx.fillStyle = '#2c2c2c';
    ctx.fillRect(200, 250, 400, 200);

    // Draw wok outline
    ctx.strokeStyle = '#4a4a4a';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(400, 350, 175, 0, Math.PI * 2);
    ctx.stroke();
}

function renderFinalDishScene() {
    // Draw final presentation area
    ctx.fillStyle = '#d4a574';
    ctx.fillRect(100, 100, 600, 400);

    // Use all textures for final scene
    if (gameState.textures.kitchen2) {
        ctx.globalAlpha = 0.3;
        ctx.drawImage(gameState.textures.kitchen2, 100, 100, 600, 400);
        ctx.globalAlpha = 1.0;
    }

    // Draw serving plate
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(400, 300, 150, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ff6b35';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Add decorative elements
    ctx.fillStyle = '#5a4635';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🍳 Delicious! 🍚', 400, 520);
}

function addKitchenAtmosphere() {
    // Add subtle vignette effect
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 100,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ===========================
// Event Listeners
// ===========================

function setupEventListeners() {
    // Step 1: Ingredient selection
    const ingredients = document.querySelectorAll('.ingredient');
    ingredients.forEach(ingredient => {
        ingredient.addEventListener('click', () => clickIngredient(ingredient));
    });

    // Step 2: Cutting
    const cutBtn = document.getElementById('cutBtn');
    const cuttingBoard = document.getElementById('cuttingBoard');

    cutBtn.addEventListener('click', startCutting);
    cuttingBoard.addEventListener('click', cutIngredient);

    // Step 3: Heat wok
    const heatBtn = document.getElementById('heatBtn');
    heatBtn.addEventListener('click', heatWok);

    // Step 4: Add oil
    const oilBtn = document.getElementById('oilBtn');
    oilBtn.addEventListener('click', addOil);

    // Step 5: Add ingredients to wok
    const addEggBtn = document.getElementById('addEggBtn');
    const addRiceBtn = document.getElementById('addRiceBtn');
    const addShallotBtn = document.getElementById('addShallotBtn');

    addEggBtn.addEventListener('click', () => addToWok('egg'));
    addRiceBtn.addEventListener('click', () => addToWok('rice'));
    addShallotBtn.addEventListener('click', () => addToWok('shallot'));

    // Step 6: Complete
    const finishBtn = document.getElementById('finishBtn');
    finishBtn.addEventListener('click', completeDish);

    // Restart button
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', restartGame);
}

// ===========================
// Step 1: Take Ingredients
// ===========================

function clickIngredient(ingredientElement) {
    const type = ingredientElement.dataset.type;

    if (gameState.currentStep !== 1 || gameState.ingredients[type]) {
        return;
    }

    // Mark as collected
    gameState.ingredients[type] = true;
    ingredientElement.classList.add('collected');

    // Add to prep tray
    const prepItems = document.getElementById('prepItems');
    const prepItem = document.createElement('div');
    prepItem.className = 'prep-item';
    prepItem.textContent = ingredientElement.querySelector('.ingredient-icon').textContent;
    prepItems.appendChild(prepItem);

    // Update progress
    const collected = Object.values(gameState.ingredients).filter(v => v).length;
    document.getElementById('step1-progress').textContent = `${collected}/4 collected`;

    // Check if all collected
    if (collected === 4) {
        setTimeout(() => {
            completeStep(1);
            activateStep(2);
            document.getElementById('cutBtn').disabled = false;
        }, 500);
    }
}

// ===========================
// Step 2: Cut Ingredients
// ===========================

function startCutting() {
    // Hide ingredients, show cutting board
    document.querySelectorAll('.ingredient').forEach(el => el.style.display = 'none');
    document.getElementById('prepTray').style.display = 'none';
    document.getElementById('cuttingBoard').style.display = 'block';

    renderScene();
}

function cutIngredient() {
    if (gameState.currentStep !== 2) return;

    gameState.cutProgress++;

    // Update progress display
    document.getElementById('cutProgress').textContent =
        `${gameState.cutProgress}/${gameState.cutRequired}`;

    // Add visual feedback
    const cutArea = document.querySelector('.cutting-area');
    cutArea.style.transform = 'scale(0.95)';
    setTimeout(() => {
        cutArea.style.transform = 'scale(1)';
    }, 100);

    // Check if cutting complete
    if (gameState.cutProgress >= gameState.cutRequired) {
        setTimeout(() => {
            document.getElementById('cutIndicator').textContent = '✅ All cut!';
            setTimeout(() => {
                completeStep(2);
                activateStep(3);
                document.getElementById('heatBtn').disabled = false;
                prepareWokArea();
            }, 1000);
        }, 300);
    }
}

// ===========================
// Step 3: Heat the Wok
// ===========================

function prepareWokArea() {
    // Hide cutting board, show wok
    document.getElementById('cuttingBoard').style.display = 'none';
    document.getElementById('wokArea').style.display = 'block';

    renderScene();
}

function heatWok() {
    if (gameState.currentStep !== 3) return;

    gameState.wokHeated = true;

    // Activate stove glow
    const stoveGlow = document.getElementById('stoveGlow');
    stoveGlow.classList.add('active');

    // Visual feedback
    updateWokTexture();

    setTimeout(() => {
        completeStep(3);
        activateStep(4);
        document.getElementById('oilBtn').disabled = false;
    }, 1500);
}

// ===========================
// Step 4: Add Oil
// ===========================

function addOil() {
    if (gameState.currentStep !== 4) return;

    gameState.wokOiled = true;

    // Update wok appearance
    const wokContents = document.getElementById('wokContents');
    wokContents.classList.add('oiled');

    updateWokTexture();

    setTimeout(() => {
        completeStep(4);
        activateStep(5);
        document.getElementById('addEggBtn').disabled = false;
    }, 1000);
}

// ===========================
// Step 5: Stir Fry
// ===========================

function addToWok(ingredient) {
    if (gameState.currentStep !== 5) return;

    // Add ingredient to wok
    gameState.wokIngredients.push(ingredient);

    // Create visual element
    const wokContents = document.getElementById('wokContents');
    const ingredientEl = document.createElement('div');
    ingredientEl.className = 'wok-ingredient';

    // Map ingredient to emoji
    const ingredientEmojis = {
        egg: '🥚',
        rice: '🍚',
        shallot: '🧅'
    };

    ingredientEl.textContent = ingredientEmojis[ingredient];
    wokContents.appendChild(ingredientEl);

    // Update wok texture
    updateWokTexture();

    // Update progress
    const addedCount = gameState.wokIngredients.length;
    document.getElementById('step5-progress').textContent = `${addedCount}/3 added`;

    // Enable next button in sequence
    if (ingredient === 'egg') {
        document.getElementById('addEggBtn').disabled = true;
        document.getElementById('addRiceBtn').disabled = false;
    } else if (ingredient === 'rice') {
        document.getElementById('addRiceBtn').disabled = true;
        document.getElementById('addShallotBtn').disabled = false;
    } else if (ingredient === 'shallot') {
        document.getElementById('addShallotBtn').disabled = true;

        // All ingredients added
        setTimeout(() => {
            completeStep(5);
            activateStep(6);
            document.getElementById('finishBtn').disabled = false;
        }, 1000);
    }
}

// ===========================
// Step 6: Complete Dish
// ===========================

function completeDish() {
    if (gameState.currentStep !== 6) return;

    gameState.gameComplete = true;

    // Hide wok area
    document.getElementById('wokArea').style.display = 'none';

    // Render final scene
    renderScene();

    // Complete step
    completeStep(6);

    // Show completion message
    document.querySelector('.steps-container').style.display = 'none';
    document.getElementById('completionMessage').style.display = 'block';

    // Celebration effect
    createConfetti();
}

// ===========================
// Helper Functions
// ===========================

function activateStep(stepNumber) {
    gameState.currentStep = stepNumber;

    // Remove active class from all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });

    // Add active class to current step
    const currentStepEl = document.getElementById(`step${stepNumber}`);
    if (currentStepEl) {
        currentStepEl.classList.remove('locked');
        currentStepEl.classList.add('active');

        // Scroll into view
        currentStepEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    console.log(`📍 Step ${stepNumber} activated`);
}

function completeStep(stepNumber) {
    const stepEl = document.getElementById(`step${stepNumber}`);
    if (stepEl) {
        stepEl.classList.remove('active');
        stepEl.classList.add('completed');

        // Add checkmark
        const stepNumber = stepEl.querySelector('.step-number');
        stepNumber.textContent = '✓';
    }

    console.log(`✅ Step ${stepNumber} completed`);
}

function updateWokTexture() {
    // Re-render the scene to show wok changes
    renderScene();

    // Add particle effects based on state
    if (gameState.wokHeated && gameState.wokOiled) {
        // Could add steam/smoke particles here
        console.log('🔥 Wok is hot and oiled!');
    }
}

function createConfetti() {
    // Simple confetti celebration
    const colors = ['#ff6b35', '#f7931e', '#4caf50', '#ffd700', '#ff69b4'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-20px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.transition = 'all 3s ease-in';

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.style.top = window.innerHeight + 'px';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            }, 10);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

function restartGame() {
    // Reset game state
    gameState.currentStep = 1;
    gameState.ingredients = { egg: false, shallot: false, rice: false, oil: false };
    gameState.cutProgress = 0;
    gameState.wokHeated = false;
    gameState.wokOiled = false;
    gameState.wokIngredients = [];
    gameState.gameComplete = false;

    // Reset UI
    document.getElementById('completionMessage').style.display = 'none';
    document.querySelector('.steps-container').style.display = 'block';

    // Reset all steps
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index > 0) {
            step.classList.add('locked');
        }

        // Reset step numbers
        const stepNumber = step.querySelector('.step-number');
        stepNumber.textContent = index + 1;
    });

    // Reset buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.disabled = true;
    });

    // Reset ingredients
    document.querySelectorAll('.ingredient').forEach(ingredient => {
        ingredient.classList.remove('collected');
        ingredient.style.display = 'block';
    });

    // Reset prep tray
    document.getElementById('prepItems').innerHTML = '';
    document.getElementById('prepTray').style.display = 'block';
    document.getElementById('step1-progress').textContent = '0/4 collected';

    // Reset cutting board
    document.getElementById('cutProgress').textContent = '0/10';
    document.getElementById('cutIndicator').textContent = 'Click to cut!';
    document.getElementById('cuttingBoard').style.display = 'none';

    // Reset wok
    document.getElementById('stoveGlow').classList.remove('active');
    document.getElementById('wokContents').classList.remove('oiled');
    document.getElementById('wokContents').innerHTML = '';
    document.getElementById('wokArea').style.display = 'none';
    document.getElementById('step5-progress').textContent = '0/3 added';

    // Restart game
    activateStep(1);
    renderScene();

    console.log('🔄 Game restarted!');
}

// ===========================
// Start Game
// ===========================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

console.log('🎮 Egg Fried Rice Game loaded!');
