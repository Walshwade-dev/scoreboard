const greetEl = document.getElementById('greetings');
const timerEl = document.getElementById('timer');

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
    let totalSeconds = 90 * 60; // converts mins into secs => 3600 secs
    let currentSecond = 0;

    // update timer every second
    let timerInterval = setInterval(function () {
        // calculate mins and secs
        let minutes = Math.floor(currentSecond / 60)
        let seconds = currentSecond % 60;

        // format and update timer element
        timerEl.textContent = formatTime(minutes, seconds);

        // increment current second
        currentSecond++;

        // check if timer has reached 90 minutes
        if (currentSecond > totalSeconds) {
            clearInterval(timerInterval); // stop the timer
            timerEl.textContent = '90:00'; // set timer to 90:00
        }
    }, 1000); // update every second
}

// call the updateTimer function and greet function when the window loads
window.onload = function () {
    greet();
    updateTimer();
}
