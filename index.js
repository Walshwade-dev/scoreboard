const greetEl = document.getElementById('greetings');
const timerEl = document.getElementById('timer');
let timerInterval; // variable to hold the timer interval
let gameStarted = false; // variable to track if the game has started

function greet() {
    let currentHour = new Date().getHours();

    if (currentHour < 12) {
        greetEl.textContent = "Good Morning";
    } else if (currentHour < 17) {
        greetEl.textContent = "Good Afternoon";
    } else {
        greetEl.textContent = "Good Evening";
    }
}

function formatTime(mins, secs) {
    // add leading zeros where necessary
    let formattedMinutes = String(mins).padStart(2, '0');
    let formattedSeconds = String(secs).padStart(2, '0');

    return formattedMinutes + ":" + formattedSeconds;
}

// function to update timer 
function updateTimer() {
    let totalSeconds = 90 * 60; // converts mins into secs => 5400 secs
    let currentSecond = 0;

    // disable start button
    startBtn.disabled = true;

    // update timer every second
    timerInterval = setInterval(function () {
        // calculate mins and secs
        let minutes = Math.floor(currentSecond / 60)
        let seconds = currentSecond % 60;

        // format and update timer element
        timerEl.textContent = formatTime(minutes, seconds);

        // increment current second
        currentSecond++;

        // check if timer has reached 90 minutes or 45 minutes
        if (currentSecond >= totalSeconds || currentSecond === (45 * 60)) {
            clearInterval(timerInterval); // stop the timer
            timerEl.textContent = '90:00'; // set timer to 90:00
            startBtn.disabled = false; // enable start button
        }
    }, 1000); // update every second
}

// function to reset timer
function resetTimer() {
    clearInterval(timerInterval); // stop the timer
    timerEl.textContent = '00:00'; // reset timer to 00:00
    startBtn.disabled = false; // enable start button
}

// function to enable score clicking when game starts
function enableScoreClick() {
    if (gameStarted) {
        homeScoreEl.addEventListener('click', incrementHomeScore);
        awayScoreEl.addEventListener('click', incrementAwayScore);
    } else {
        homeScoreEl.removeEventListener('click', incrementHomeScore);
        awayScoreEl.removeEventListener('click', incrementAwayScore);
    }
}

// call the updateTimer function and greet function when the window loads
window.onload = function () {
    greet();
    enableScoreClick();
}


let homeScoreEl = document.querySelector('.home-team-score');
let awayScoreEl = document.querySelector('.away-team-score');

homeScoreEl.textContent = 0;
awayScoreEl.textContent = 0;

//function to update score display with leading zeros
function updateScoreDisplay(element, score) {
    element.textContent = String(score).padStart(2, '0')
}


let homeScore = 0;
let awayScore = 0;

updateScoreDisplay(homeScoreEl, homeScore);
updateScoreDisplay(awayScoreEl, awayScore);

//function add score
function incrementHomeScore() {
    homeScore++
    updateScoreDisplay(homeScoreEl, homeScore);
}

function incrementAwayScore() {
    awayScore++
    updateScoreDisplay(awayScoreEl, awayScore);
}

// Event listeners for buttons
let startBtn = document.querySelector('.start-btn');
let newGameBtn = document.querySelector('.new-game-btn');

startBtn.addEventListener('click', () => {
    gameStarted = true;
    enableScoreClick();
    updateTimer();
});

newGameBtn.addEventListener('click', () => {
    homeScore = 0;
    awayScore = 0;
    updateScoreDisplay(homeScoreEl, homeScore);
    updateScoreDisplay(awayScoreEl, awayScore)
    resetTimer();
});
