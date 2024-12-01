// Select DOM elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0"; // Current input on the display
let previousInput = ""; // Stores the previous number
let operator = null;    // Stores the last operator used

// Add event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => handleButtonClick(button.dataset.value));
});

function handleButtonClick(value) {
  if (isNumber(value)) {
    handleNumber(value);
  } else if (isOperator(value)) {
    handleOperator(value);
  } else if (value === "=") {
    calculate();
  } else if (value === "AC") {
    clearAll();
  } else if (value === "DEL") {
    deleteLast();
  }
  updateDisplay();
}

function isNumber(value) {
  return !isNaN(value) || value === ".";
}

function isOperator(value) {
  return ["+", "-", "*", "/"].includes(value);
}

function handleNumber(value) {
  if (currentInput === "0" && value !== ".") {
    currentInput = value; // Replace 0 with the new number
  } else if (value === "." && currentInput.includes(".")) {
    // Do nothing if a decimal is already present
    return;
  } else {
    currentInput += value; // Append the number
  }
}

function handleOperator(value) {
  if (operator !== null) {
    calculate(); // Calculate if an operator was already present
  }
  operator = value;
  previousInput = currentInput;
  currentInput = "0"; // Reset current input for the next number
}

function calculate() {
  if (operator === null || previousInput === "") return;

  const previous = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  switch (operator) {
    case "+":
      currentInput = (previous + current).toString();
      break;
    case "-":
      currentInput = (previous - current).toString();
      break;
    case "*":
      currentInput = (previous * current).toString();
      break;
    case "/":
      currentInput = current === 0 ? "Error" : (previous / current).toString();
      break;
  }

  operator = null;
  previousInput = "";
}

function clearAll() {
  currentInput = "0";
  previousInput = "";
  operator = null;
}

function deleteLast() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
}

function updateDisplay() {
  display.innerText = currentInput;
}
