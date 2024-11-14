// List of possible words for the game
const words = ["apple", "stone", "grape", "light", "table", "chair"];
const answer = words[Math.floor(Math.random() * words.length)]; // Randomly select answer
const maxAttempts = 6;
let currentAttempt = 0;

// Initialize game board
const gameBoard = document.getElementById("game-board");
for (let i = 0; i < maxAttempts * 5; i++) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  gameBoard.appendChild(tile);
}

function resetGame() {
  currentAttempt = 0;
  gameBoard.innerHTML = "";
  for (let i = 0; i < maxAttempts * 5; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    gameBoard.appendChild(tile);
  }
}

// Start game function using a while loop
function startGame() {
  const guessInput = document.getElementById("guess-input");
  let gameOver = false;

  // Use a while loop to control attempts
  while (currentAttempt < maxAttempts && !gameOver) {
    // Get user guess
    const guess = guessInput.value.toLowerCase();

    // Validate guess length
    if (guess.length !== 5) {
      showMessage("Please enter exactly 5 characters.");
      return;
    }

    // Display the guess on the game board
    const rowStart = currentAttempt * 5;
    for (let i = 0; i < 5; i++) {
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
      break;
    }

    // Increment attempt
    currentAttempt++;

    // Check if max attempts reached
    if (currentAttempt >= maxAttempts) {
      showMessage(`Game Over! The word was "${answer}".`);
      gameOver = true;
    }

    // Clear input for next guess
    guessInput.value = "";
  }

  if (gameOver) {
    const replay = confirm("Do you want to play again? (yes/no): ");
    if (replay) {
      startGame();
    }
  }
}

// Helper function to display messages
function showMessage(message) {
  document.getElementById("message").textContent = message;
}

document.addEventListener("DOMContentLoaded", () => {
  const guessForm = document.getElementById("guess-form");
  const dialogElem = document.getElementById("welcome-dialog");
  const startButton = document.getElementById("start-button");

  guessForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // Show the dialog
  dialogElem.showModal();

  startButton.addEventListener("click", () => {
    dialogElem.close();
    startGame();
  });
});
