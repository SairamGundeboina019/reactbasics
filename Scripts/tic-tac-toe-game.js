const gameBoard = document.getElementById("gameBoard");
const gameStatus = document.getElementById("gameStatus");
const resetButton = document.getElementById("resetButton");


//Variable to track game state
let board = ["","","","","","","","","",];
let currentPlayer = "X";
let isGameActive = true;


//winnig combinations
let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],

];

function initializeBoard () {
  gameBoard.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.setAttribute("data-index", index);
      cellElement.addEventListener("click", handleCellClick);
      gameBoard.appendChild(cellElement);
    
  });
  updateStatus(`Player ${currentPlayer}'s Turn`);
}

function handleCellClick(event) {
const cellIndex = event.target.getAttribute("data-index");
if (board[cellIndex] !== "" || !isGameActive) return;

  board[cellIndex] = currentPlayer;
  event.target.innerText = currentPlayer;
  event.target.classList.add("taken");

  if (checkWinner()) {
    updateStatus(`Player ${currentPlayer} Wins!`);
    isGameActive = false;
  } else if (board.every(cell => cell !== "")) {
    updateStatus("It's a Tie");
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "x" ? "O": "X";
    updateStatus(`Player ${currentPlayer}'s Turn`);
  }

}

function checkWinner() {

  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);

  });
}

function updateStatus(messege) {
  gameStatus.innerText = messege;
}

resetButton.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  initializeBoard();
});

initializeBoard();