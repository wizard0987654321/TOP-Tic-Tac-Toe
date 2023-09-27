// Declare global variables
const board = document.querySelector(".gameboard");
let winText = document.querySelector("h2");
let xTurn = true;

// Create gameboard grid
for (let i = 0; i < 3; i++) {
    for (let i = 0; i < 3; i ++) {
        const square = document.createElement("div");
        
        square.classList.add("square");
        board.appendChild(square);
    }
}

// Module pattern, that stores choice indexes of users in two different arrays and resets game
const Gameboard = (() => {
    const xChoices = [];
    const oChoices = [];

    const change = (choiceIndex, xTurn) => {
        if (xTurn) {
            oChoices.push(choiceIndex);
        } else {
            xChoices.push(choiceIndex);
        }
    }

    const reset = () => {
        xChoices.length = 0;
        oChoices.length = 0;
    }

    return { change, xChoices, oChoices, reset };
})();

// Module pattern, that controls the game flow

const game = (() => { 

// Variable that indicates, whether the game is over
let isOver = false;

// Combinations, that mean that the user won
const checkCombo = (combo, round) => {
    const winCombos = [
        [0, 1, 2],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Checking for every member of user choice arrays, whether they consist winning combination
    const isWon = winCombos.some(winCombo => {
        return winCombo.every(index => combo.includes(index));
    });

    // Updating the value of isOver variable, which indicates, that game is over
    isOver = (round == 9) ? true : false;

    // Ending game as a draw, if the game is over and there is no winner
    if(!isWon && isOver) {
        winText.textContent = "It's a draw!";
        isOver = true;
    }

    // Checking, in which round the games was won and declaring the winner
    if(isWon && (round % 2 != 0)) {
        winText.textContent = "Congratulations X, You won!"
        isOver = true;
    } else if (isWon && (round % 2 == 0)) {
        winText.textContent = "Congratulations O, You won!"
        isOver = true;
    }
}

// Creating an array of playing table cells
const boardCells = Array.from(document.querySelectorAll(".square"));
let roundCount = 0;

// Assigning onclick function to each of the cells, so user can update the playing table
for (let i = 0; i < 9; i++) { 
    boardCells[i].setAttribute("data-cell-index", i); 
    boardCells[i].addEventListener("click", (e) => {
        if(e.target.textContent == "" && !isOver) {
            if(xTurn) {
                e.target.textContent = "X";
                xTurn = false;
            } else {
                e.target.textContent = "O"
                xTurn = true;
            }
            let turnIndex = parseInt(e.target.getAttribute("data-cell-index"));
            roundCount++;
            Gameboard.change(turnIndex, xTurn);
            if(roundCount % 2 != 0) {
                checkCombo(Gameboard.xChoices, roundCount)
            } else {
                checkCombo(Gameboard.oChoices, roundCount);
            }
        }
    })
}

// Getting the value of reset button and assigning onclick function to it, so game can be resetted
const resetButton = document.querySelector("button");

resetButton.addEventListener("click", () => {
    boardCells.forEach(cell => cell.textContent = "");
    roundCount = 0;
    isOver = false;
    isWon = false;
    xTurn = true;
    Gameboard.reset();
    winText.textContent = "Player X Turn"
})
    
})();




