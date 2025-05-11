let low = 1;
let high = 100;
let guess;
let attempts = 0;
let bestScore = localStorage.getItem('bestScore') || '-';

function updateStats() {
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('bestScore').textContent = bestScore;
}

function makeGuess() {
    guess = Math.floor((low + high) / 2);
    document.getElementById("guess").innerText = `Is your number ${guess}?`;
    document.getElementById("error").innerText = "";
    attempts++;
    updateStats();
    return true;
}

function resetGame() {
    low = 1;
    high = 100;
    attempts = 0;
    document.getElementById("result").innerText = "";
    document.getElementById("error").innerText = "";
    document.getElementById("resetBtn").style.display = "none";
    updateStats();
    makeGuess();
}

function saveScore() {
    if (bestScore === '-' || attempts < bestScore) {
        bestScore = attempts;
        localStorage.setItem('bestScore', bestScore);
        updateStats();
    }
}

function userResponse(response) {
    if (low > high) {
        document.getElementById("result").innerText = "Something went wrong. Did you change your number?";
        document.getElementById("resetBtn").style.display = "block";
        return;
    }

    if (response === '>') {
        if (guess >= 100) {
            document.getElementById("error").innerText = "Invalid input. Number cannot be greater than 100!";
            return;
        }
        low = guess + 1;
    } else if (response === '<') {
        if (guess <= 1) {
            document.getElementById("error").innerText = "Invalid input. Number cannot be less than 1!";
            return;
        }
        high = guess - 1;
    } else if (response === '=') {
        document.getElementById("result").innerText = `🎉 I got it! Your number is ${guess}!\nIt took ${attempts} attempts.`;
        document.getElementById("guess").innerText = "";
        document.getElementById("resetBtn").style.display = "block";
        saveScore();
        return;
    } else {
        document.getElementById("error").innerText = "Invalid input. Use >, <, or =.";
        return;
    }

    if (low <= high) {
        if (!makeGuess()) {
            return;
        }
    } else {
        document.getElementById("result").innerText = "🤔 You must be cheating! The number keeps changing!";
        document.getElementById("guess").innerText = "";
        document.getElementById("resetBtn").style.display = "block";
    }
}

updateStats();
makeGuess();