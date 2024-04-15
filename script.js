// INITIALIZE PATHS //////
const playerOnePath =    [20, 21, 22, 23, 24, 16, 13, 10, 7 , 4 , 1 , 2 , 3 , 6 , 9 , 12, 15, 18, 28, 29, 30, 31, 32, 33, 48, 63, 62, 61, 60, 59, 58, 66, 69, 72, 75, 78, 81, 80, 79, 76, 73, 70, 67, 64, 54, 53, 52, 51, 50, 49, 34, 35, 36, 37, 38, 39, 40];
const playerTwoPath =   [6 , 9 , 12, 15, 18, 28, 29, 30, 31, 32, 33, 48, 63, 62, 61, 60, 59, 58, 66, 69, 72, 75, 78, 81, 80, 79, 76, 73, 70, 67, 64, 54, 53, 52, 51, 50, 49, 34, 19, 20, 21, 22, 23, 24, 16, 13, 10, 7 , 4 , 1 , 2 , 5 , 8 , 11, 14, 17, 26];
const playerThreePath =  [76, 73, 70, 67, 64, 54, 53, 52, 51, 50, 49, 34, 19, 20, 21, 22, 23, 24, 16, 13, 10, 7 , 4 , 1 , 2 , 3 , 6 , 9 , 12, 15, 18, 28, 29, 30, 31, 32, 33, 48, 63, 62, 61, 60, 59, 58, 66, 69, 72, 75, 78, 81, 80, 77, 74, 71, 68, 65, 56];
const playerFourPath = [62, 61, 60, 59, 58, 66, 69, 72, 75, 78, 81, 80, 79, 76, 73, 70, 67, 64, 54, 53, 52, 51, 50, 49, 34, 19, 20, 21, 22, 23, 24, 16, 13, 10, 7 , 4 , 1 , 2 , 3 , 6 , 9 , 12, 15, 18, 28, 29, 30, 31, 32, 33, 48, 47, 46, 45, 44, 43, 42];

// DEBUG PATHS //////
// function a(p, c, d, f) {f();p.forEach((n, i) => {setTimeout(() => {const e=document.getElementById('cell-'+n);if(e){e.style.backgroundColor=c;}},i*d);});}
// function b(){document.querySelectorAll('.cell').forEach(e => {e.style.backgroundColor='';});}
// const s=100;
// setTimeout(() => {a(playerOnePath,'var(--playerOneColor)',s,b);setTimeout(() => {a(playerTwoPath,'var(--playerTwoColor)',s,b);setTimeout(() => {a(playerThreePath,'var(--playerThreeColor)',s,b);setTimeout(() => {a(playerFourPath,'var(--playerFourColor)',s,b);}, playerTwoPath.length*s+100);}, playerThreePath.length*s+100);}, playerOnePath.length*s+100);}, 0);

// DICE ROLL //////
let lastResult = null;
let lastShown = null;
let repeatCount = 1;

document.getElementById('dice-roll').addEventListener('click', function() {
    let rolls = 0;
    const maxRolls = 15;
    let result = Math.floor(Math.random() * 6) + 1;
    lastShown = result;
    this.textContent = result;

    let interval = setInterval(() => {
        do {
            result = Math.floor(Math.random() * 6) + 1;
        } while (result === lastShown);
        
        this.textContent = result;
        lastShown = result;
        rolls++;
        
        if (rolls >= maxRolls) {
            clearInterval(interval);
            finalizeRoll(result);
        }
    }, 75);
});

function finalizeRoll(result) {
    document.getElementById('dice-roll').textContent = result;
    lastResult = result;

    if (result === 6) {
        // If the player rolls a 6, they get another turn
        // No need to change turns, just allow re-roll
        console.log("Rolled a 6, roll again!");
    } else {
        // If the roll is not a 6, move to the next player
        switchPlayer(); // Function to switch to the next player
    }
};

// PLAYER TURNS //////
let playerOneTurn = false;
let playerTwoTurn = false;
let playerFourTurn = false;
let playerThreeTurn = false;

// Function to randomly select a player and indicate it's their turn
function selectRandomPlayer() {
    const players = ['playerOneTurn', 'playerTwoTurn', 'playerFourTurn', 'playerThreeTurn'];
    const randomIndex = Math.floor(Math.random() * players.length);
    
    // Reset all players' turns to false initially
    playerOneTurn = playerTwoTurn = playerFourTurn = playerThreeTurn = false;

    // Correctly set the random player's turn to true
    switch (players[randomIndex]) {
        case 'playerOneTurn':
            playerOneTurn = true;
            break;
        case 'playerTwoTurn':
            playerTwoTurn = true;
            break;
        case 'playerFourTurn':
            playerFourTurn = true;
            break;
        case 'playerThreeTurn':
            playerThreeTurn = true;
            break;
    }

    updateTurnHighlight(); // Call to update the UI to reflect the current player's turn
}

function switchPlayer() {
    // Move to the next player in the fixed order: 1 -> 2 -> 4 -> 3
    if (playerOneTurn) {
        playerOneTurn = false;
        playerTwoTurn = true;
    } else if (playerTwoTurn) {
        playerTwoTurn = false;
        playerFourTurn = true;
    } else if (playerFourTurn) {
        playerFourTurn = false;
        playerThreeTurn = true;
    } else if (playerThreeTurn) {
        playerThreeTurn = false;
        playerOneTurn = true;
    }
    updateTurnHighlight(); // Update the UI to reflect who's turn it is now
}

function updateTurnHighlight() {
    document.getElementById('player-one').classList.toggle('active-turn', playerOneTurn);
    document.getElementById('player-two').classList.toggle('active-turn', playerTwoTurn);
    document.getElementById('player-four').classList.toggle('active-turn', playerFourTurn);
    document.getElementById('player-three').classList.toggle('active-turn', playerThreeTurn);
}

document.addEventListener('DOMContentLoaded', function() {
    selectRandomPlayer();
});

