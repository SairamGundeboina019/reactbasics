//Select DOM Elements

const timeDisplay = document.getElementById("timeDisplay");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const lapButton = document.getElementById("lapButton");
const laps = document.getElementById("laps");

//TImer Variables

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 100);
  toggleButtons(true);
}

function pauseTimer() {
  clearInterval(timerInterval);
  elapsedTime = Date.now() - startTime;

}

function resetTimer () {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateTime();     // Reset display to 00:00:00
  laps.innerHTML = "";  //clear laps
  toggleButtons(false);  //reset button states
}

function updateTime () {
  const time = Date.now() - startTime;
  timeDisplay.innerText = formatTime(time);
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const millis = milliseconds % 1000; // Extract milliseconds

  // Include milliseconds in the formatted string
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMillis(millis)}`;
}

function pad(number) {
  return number.toString().padStart(2, "0");
}

function padMillis(number) {
  return number.toString().padStart(3, "0"); // Pad milliseconds to 3 digits
}

function recordLap (){
  const li = document.createElement("li");
  li.innerText = `Lap ${laps.children.length + 1}: ${timeDisplay.innerText}`;
  laps.appendChild(li);

}

function toggleButtons(isRunning) {
  startButton.disabled = isRunning;
  pauseButton.disabled = !isRunning;
  resetButton.disabled = !isRunning;
  lapButton.disabled = !isRunning;
}