// INITIALIZE PATHS //////
const playerOnePath =    [20, 21, 22, 23, 24, 16, 13, 10, 7 , 4 , 1 , 2 , 3 , 6 , 9 , 12, 15, 18, 28, 29, 30, 31, 32, 33, 48, 63, 62, 61, 60, 59, 58, 66, 69, 72, 75, 78, 81, 80, 79, 76, 73, 70, 67, 64, 54, 53, 52, 51, 50, 49, 34, 35, 36, 37, 38, 39, 40];
const playerTwoPath =   [6 , 9 , 12, 15, 18, 28, 29, 30, 31, 32, 33, 48, 63, 62, 61, 60, 59, 58, 66, 69, 72, 75, 78, 81, 80, 79, 76, 73, 70, 67, 64, 54, 53, 52, 51, 50, 49, 34, 19, 20, 21, 22, 23, 24, 16, 13, 10, 7 , 4 , 1 , 2 , 5 , 8 , 11, 14, 17, 26];
const playerThreePath = [62, 61, 60, 59, 58, 66, 69, 72, 75, 78, 81, 80, 79, 76, 73, 70, 67, 64, 54, 53, 52, 51, 50, 49, 34, 19, 20, 21, 22, 23, 24, 16, 13, 10, 7 , 4 , 1 , 2 , 3 , 6 , 9 , 12, 15, 18, 28, 29, 30, 31, 32, 33, 48, 47, 46, 45, 44, 43, 42];
const playerFourPath =  [76, 73, 70, 67, 64, 54, 53, 52, 51, 50, 49, 34, 19, 20, 21, 22, 23, 24, 16, 13, 10, 7 , 4 , 1 , 2 , 3 , 6 , 9 , 12, 15, 18, 28, 29, 30, 31, 32, 33, 48, 63, 62, 61, 60, 59, 58, 66, 69, 72, 75, 78, 81, 80, 77, 74, 71, 68, 65, 56];

const safeSpaces = [20, 7, 6, 31, 62, 75, 76, 51];

let socket = io("http://localhost:3000");
socket.on('yourId', (id) => {
    myId = id;
});

// Globally initialize player turns
let playerOneTurn = false;
let playerTwoTurn = false;
let playerThreeTurn = false;
let playerFourTurn = false;
// Randomly select a player to start
function selectRandomPlayer() {
    const players = ['playerOneTurn', 'playerTwoTurn', 'playerThreeTurn', 'playerFourTurn'];
    const randomIndex = Math.floor(Math.random() * players.length);

    playerOneTurn = playerTwoTurn = playerThreeTurn = playerFourTurn = false;

    switch (players[randomIndex]) {
        case 'playerOneTurn':
            playerOneTurn = true;
            break;
        case 'playerTwoTurn':
            playerTwoTurn = true;
            break;
        case 'playerThreeTurn':
            playerThreeTurn = true;
            break;
        case 'playerFourTurn':
            playerFourTurn = true;
            break;
    }
    updateTurnHighlight();
}
document.addEventListener('DOMContentLoaded', function() {
    selectRandomPlayer();
});