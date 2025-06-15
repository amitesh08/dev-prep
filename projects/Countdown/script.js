const startBtn = document.getElementById("startButton");
const timeInput = document.getElementById("timeInput");
const countdownDisplay = document.getElementById("countdownDisplay");
const pauseBtn = document.getElementById("pauseButton");
const resumeBtn = document.getElementById("resumeButton");

let timer;
let pauseTime;
let valueInSeconds;
function startTimer() {
  valueInSeconds = parseInt(timeInput.value);
  console.log(valueInSeconds);
  if (isNaN(valueInSeconds)) {
    countdownDisplay.innerText = "Please enter a valid number";
    return;
  }

  if (valueInSeconds <= 0) {
    countdownDisplay.innerText = "please enter seconds > 0";
    return;
  }

  clearInterval(timer); // clear any existing interval before starting new one

  timer = setInterval(() => {
    valueInSeconds--;
    countdownDisplay.innerText = `Time remaining: ${valueInSeconds} seconds`;

    if (valueInSeconds <= 0) {
      clearInterval(timer);
      countdownDisplay.innerText = "times up⏱️";
      timeInput.value = "";
    }
  }, 1000);
}

//task --> to implement the pause and resume while countdown is going
function pauseTimer() {
  clearInterval(timer);
  countdownDisplay.innerText = `Time paused: ${valueInSeconds} seconds`;
}

function resumeTimer() {
  clearInterval(timer); // clear previous interval if any
  timer = setInterval(() => {
    valueInSeconds--;
    countdownDisplay.innerText = `Time remaining: ${valueInSeconds} seconds`;

    if (valueInSeconds <= 0) {
      clearInterval(timer);
      countdownDisplay.innerText = "Time's up ⏱️";
      timeInput.value = "";
    }
  }, 1000);
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resumeBtn.addEventListener("click", resumeTimer);
