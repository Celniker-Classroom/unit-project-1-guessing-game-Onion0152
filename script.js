// add javascript here
let playerName = "";
let answer = 0;
let currentRange = 0;
let guessesThisRound = 0;
let startTime = 0;

let allScores = [];
let totalWins = 0;
let totalTime = 0;
let fastestTime = Infinity;


const rawName = prompt("Enter your name:");
playerName = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();


function updateTime() {
    const now = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const day = now.getDate();
    let suffix = "th";
    if (day < 11 || day > 13) {
        if (day % 10 === 1) suffix = "st";
        else if (day % 10 === 2) suffix = "nd";
        else if (day % 10 === 3) suffix = "rd";
    }

    const timeString = now.toLocaleTimeString(); // Includes seconds
    document.getElementById("date").textContent = `${months[now.getMonth()]} ${day}${suffix}, ${now.getFullYear()} - ${timeString}`;
}

setInterval(updateTime, 1000);
updateTime();


function play() {
   
    const radios = document.getElementsByName("level");
    for (let radio of radios) {
        if (radio.checked) {
            currentRange = parseInt(radio.value);
            break;
        }
    }

    answer = Math.floor(Math.random() * currentRange) + 1;
    guessesThisRound = 0;
    startTime = new Date().getTime();

    document.getElementById("msg").textContent = `${playerName}, guess a number between 1 and ${currentRange}!`;
    

    document.getElementById("playBtn").disabled = true;
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
}

function makeGuess() {
    const userGuess = parseInt(document.getElementById("guess").value);
    guessesThisRound++;
    
    let feedback = "";
    const diff = Math.abs(userGuess - answer);

    if (userGuess === answer) {
        feedback = `Correct! Well done, ${playerName}!`;
        endRound(guessesThisRound);
    } else {
        const highLow = userGuess > answer ? "high" : "low";
        const proximity = diff <= 2 ? "hot" : diff <= 5 ? "warm" : "cold";
        feedback = `Too ${highLow}. You are ${proximity}.`;
    }

    document.getElementById("msg").textContent = feedback;
}

function giveUp() {
    document.getElementById("msg").textContent = `The answer was ${answer}. Better luck next time, ${playerName}!`;
    endRound(currentRange);
}

function endRound(score) {
    const endTime = new Date().getTime();
    const roundTime = (endTime - startTime) / 1000;

    allScores.push(score);
    totalWins++;
    totalTime += roundTime;
    if (roundTime < fastestTime) fastestTime = roundTime;

    updateStats();
    reset();
}

function updateStats() {

    document.getElementById("wins").textContent = `Total wins: ${totalWins}`;
    
    const avgScore = allScores.reduce((a, b) => a + b, 0) / allScores.length;
    document.getElementById("avgScore").textContent = `Average Score: ${avgScore.toFixed(1)}`;
    
    document.getElementById("fastest").textContent = `Fastest Game: ${fastestTime.toFixed(1)}s`;
    document.getElementById("avgTime").textContent = `Average Time: ${(totalTime / totalWins).toFixed(1)}s`;


    const sorted = [...allScores].sort((a, b) => a - b);
    const listItems = document.getElementsByName("leaderboard");
    
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].textContent = sorted[i] !== undefined ? sorted[i] : "--";
    }
}

function reset() {
    document.getElementById("playBtn").disabled = false;
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("guess").value = "";
}


document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);
