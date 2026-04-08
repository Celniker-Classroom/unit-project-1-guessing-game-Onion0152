//Javascript code

let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = [];
let startTime = 0;
let totalTime = 0;
let fastestTime = Infinity;
let totalRounds = 0;

//Player name
let playerName = prompt("Please enter your name:");
if (playerName === null || playerName.trim() === "") {
    playerName = "Player";
} else {
    playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();
}

//play
function play() {
    //get level
    let radios = document.getElementsByName("level");
    let range = 3;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            range = parseInt(radios[i].value);
        }
    }

    //round setup
    answer = Math.floor(Math.random() * range) + 1;
    guessCount = 0;
    startTime = new Date().getTime();

    document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;

    //Disable and enable buttons and radio choices
    document.getElementById("playBtn").disabled = true;
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("guess").value = "";

    let levelRadios = document.getElementsByName("level");
    for (let i = 0; i < levelRadios.length; i++) {
        levelRadios[i].disabled = true;
    }
}

document.getElementById("playBtn").addEventListener("click", play);

//guessing
document.getElementById("guessBtn").addEventListener("click", function() {
    let input = document.getElementById("guess").value;
    let num = parseInt(input);

    if (isNaN(num)) {
        document.getElementById("msg").textContent = "Please enter a valid number.";
        return;
    }
    
    guessCount++;
    let diff = Math.abs(num - answer);

    //correct guess
    if (num === answer) {
        document.getElementById("msg").textContent = "Correct, " + playerName + "! You guessed the number in " + guessCount + " tries.";
        document.getElementById("guessBtn").disabled = true;
        updateScore(guessCount);
        updateTimers(new Date().getTime());
        reset();
    } else if (num > answer) {
        let feedback = "Too high. ";
        if (diff <= 2) {
            feedback += "Hot!";
        } else if (diff <= 5) {
            feedback += "Warm.";
        } else {
            feedback += "Cold.";
        }
        document.getElementById("msg").textContent = feedback;
    } else if (num < answer) {
        let feedback = "Too low. ";
        if (diff <= 2) {
            feedback += "Hot!";
        } else if (diff <= 5) {
            feedback += "Warm.";
        } else {
            feedback += "Cold.";
        }
        document.getElementById("msg").textContent = feedback;
    }
    document.getElementById("guess").value = "";
});

document.getElementById("giveUpBtn").addEventListener("click", giveUp);

//give up
function giveUp() {
    let radios = document.getElementsByName("level");
    let range = 3;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            range = parseInt(radios[i].value);
        }
    }
    totalRounds++;
    updateScore(range);
    updateTimers(new Date().getTime());
    reset();
}

//update score when win
function updateScore(score) {
    totalRounds++;
    totalWins++;
    totalGuesses += score;
    scores.push(score);
    scores.sort(function(a, b) {
        return a - b;
    });

    let avgScore = Math.round(totalGuesses / totalWins);

    document.getElementById("wins").textContent = "Total Wins: " + totalWins;
    document.getElementById("avgScore").textContent = "Average Score: " + avgScore;

    //update leaderboard with top 3
    let leaderboardItems = document.getElementsByName("leaderboard");
    for (let i = 0; i < leaderboardItems.length; i++) {
        if (i < scores.length) {
            leaderboardItems[i].textContent = scores[i];
        }
    }
}

//reset
function reset() {
    document.getElementById("playBtn").disabled = false;
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    let levelRadios = document.getElementsByName("level");
    for (let i = 0; i < levelRadios.length; i++) {
        levelRadios[i].disabled = false;
    }
