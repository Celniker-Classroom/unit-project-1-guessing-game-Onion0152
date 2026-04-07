//Javascript code

let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = [];

//Player name
let playerName = prompt("Please enter your name:");
if (playerName === null || playerName.trim() === "") {
    playerName = "Player";
}

//play
//get level
document.getElementById("playBtn").addEventListener("click", function() {
    let radios = document.getElementsByName("level");
    let range = 3;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            range = parseInt(radios[i].value);
        }
    }
});

//round setup
answer = Math.floor(Math.random() * range) + 1;

document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;

//pick answer

answer = Math.floor(Math.random() * range) + 1;

//Disable and enable buttons and radio choices
document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
document.getElementById("playBtn").disabled = true;
document.getElementById("guessBtn").disabled = false;
document.getElementById("giveUpBtn").disabled = false;
document.getElementById("guess").value = "";

let levelRadios = document.getElementsByName("level");
for (let i = 0; i < levelRadios.length; i++) {
    levelRadios[i].disabled = true;
}