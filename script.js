const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

// List of possible words for the game
const words = ["apple", "stone", "grape", "light", "table", "chair"];
let answer = words[Math.floor(Math.random() * words.length)];
let currentAttempt = 0;

// Reset game function
function resetGame() {
  answer = words[Math.floor(Math.random() * words.length)];
  currentAttempt = 0;

  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";

  // Reset game board
  for (let i = 0; i < MAX_ATTEMPTS * WORD_LENGTH; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    gameBoard.appendChild(tile);
  }
}

// Start game function using a while loop
function startGame() {
  const guessInput = document.getElementById("guess-input");
  const gameBoard = document.getElementById("game-board");
  const startButton = document.getElementById("submit-button");

  let gameOver = false;

  const guess = guessInput.value.toLowerCase();

  while (currentAttempt < MAX_ATTEMPTS && !gameOver) {
    // Display the guess on the game board
    const rowStart = currentAttempt * WORD_LENGTH;

    for (let i = 0; i < WORD_LENGTH; i++) {
      const tile = gameBoard.children[rowStart + i];
      tile.textContent = guess[i];

      // Color feedback
      if (guess[i] === answer[i]) {
        tile.classList.add("correct"); // Green for correct position
      } else if (answer.includes(guess[i])) {
        tile.classList.add("present"); // Yellow for correct letter, wrong position
      } else {
        tile.classList.add("absent"); // Gray for incorrect letter
      }
    }

    // Check if the guess is correct
    if (guess === answer) {
      showMessage("Congratulations! You guessed the word!");
      gameOver = true;
      startButton.disabled = true;
      break;
    }

    // Increment attempt
    currentAttempt++;

    // Check if max attempts reached
    if (currentAttempt >= MAX_ATTEMPTS) {
      showMessage(`The word was "${answer}".`);
      gameOver = true;
      startButton.disabled = true;
    }

    // Clear input for next guess
    guessInput.value = "";
    break;
  }
}

// Helper function to display messages
function showMessage(message) {
  document.getElementById("message").textContent = message;
  document.getElementById("game-over-dialog").showModal();
}

document.addEventListener("DOMContentLoaded", () => {
  const guessForm = document.getElementById("guess-form");
  const dialogElem = document.getElementById("welcome-dialog");
  const startButton = document.getElementById("start-button");
  const resetButton = document.querySelector(".reset");
  const gameOverDialog = document.getElementById("game-over-dialog");

  // Show welcome dialog
  dialogElem.showModal();

  // Initialize game board
  const gameBoard = document.getElementById("game-board");

  for (let i = 0; i < MAX_ATTEMPTS * WORD_LENGTH; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    gameBoard.appendChild(tile);
  }

  /* Event Listeners */
  resetButton.addEventListener("click", () => {
    gameOverDialog.close();
    resetGame();
  });

  guessForm.addEventListener("submit", (e) => {
    e.preventDefault();
    startGame();
  });

  startButton.addEventListener("click", () => {
    dialogElem.close();
  });
});
