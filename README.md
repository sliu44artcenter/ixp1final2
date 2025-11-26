# 🍳 Egg Fried Rice Game 🍚

An interactive cooking mini-game where you learn to make delicious egg fried rice!

## 🎮 Game Features

Experience a complete cooking workflow with 6 interactive steps:

1. **Take Ingredients** - Click to collect egg, shallot, rice, and oil
2. **Cut Ingredients** - Chop your ingredients on the cutting board
3. **Heat the Wok** - Turn on the stove and heat up your wok
4. **Add Oil** - Pour oil into the hot wok
5. **Stir Fry** - Add ingredients in the correct order and stir fry
6. **Finish** - Complete your masterpiece and enjoy!

## 📁 Setup Instructions

### 1. Place Your Texture Images

You need to place the three kitchen texture images in the `textures/` folder:

```
textures/
├── kitchen1.png
├── kitchen2.png
└── kitchen3.png
```

These textures should contain:
- Kitchen booth backgrounds
- Props (cutting board, knife, wok, vegetables basket, bottles, bowls, etc.)
- Stove and cooking equipment

### 2. Open the Game

Simply open `index.html` in your web browser:

```bash
# Option 1: Direct open
open index.html

# Option 2: Using a local server (recommended)
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

## 🛠️ Technical Details

### File Structure

```
/
├── index.html          # Main game page
├── style.css           # Warm kitchen-themed styling
├── game.js             # Game logic and interactions
├── textures/           # Kitchen texture images (you provide)
│   ├── kitchen1.png
│   ├── kitchen2.png
│   └── kitchen3.png
└── README.md           # This file
```

### Game Functions

The game includes the following core functions:

- `loadTextures()` - Loads the three kitchen texture images
- `initScene()` - Initializes the game scene
- `clickIngredient()` - Handles ingredient selection
- `cutIngredient()` - Processes cutting actions
- `addToWok()` - Adds ingredients to the wok
- `updateWokTexture()` - Updates wok visuals during cooking
- `completeDish()` - Finalizes the dish

### Visual Style

- Cozy kitchen atmosphere with warm color palette
- Slightly pixelated/low-poly feel matching the textures
- Smooth animations and transitions
- Responsive design that works on different screen sizes

## 🎨 Design Choices

- **Color Scheme**: Warm oranges, browns, and earth tones
- **Typography**: Clean, readable fonts
- **Interactions**: Click-based for simplicity
- **Feedback**: Visual and animated responses to all actions

## 🚀 Features

- ✅ Full client-side game (no server required)
- ✅ Uses provided textures for authentic kitchen feel
- ✅ Step-by-step cooking guidance
- ✅ Progress tracking for each step
- ✅ Celebration effects on completion
- ✅ Restart functionality to play again

## 🎯 How to Play

1. **Start** by clicking on all four ingredients (egg, shallot, rice, oil)
2. **Cut** the ingredients by clicking repeatedly on the cutting board (10 times)
3. **Heat** the wok by clicking the "Turn on Stove" button
4. **Add Oil** when the wok is hot
5. **Stir Fry** by adding ingredients in order: egg → rice → shallot
6. **Finish** and enjoy your delicious egg fried rice!

## 📝 Notes

- The game automatically loads textures from the `textures/` folder
- If textures fail to load, the game will display placeholders
- All interactions are designed to be intuitive and fun
- Progress is saved as you complete each step

## 🎉 Enjoy Cooking!

Have fun making your virtual egg fried rice!

---

**Made with ❤️ using HTML, CSS, and JavaScript**
