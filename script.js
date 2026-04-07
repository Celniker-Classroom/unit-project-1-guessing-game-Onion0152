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