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


const game = (() => { 


let isOver = false;

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

    const isWon = winCombos.some(winCombo => {
        return winCombo.every(index => combo.includes(index));
    });

    isOver = (round == 9) ? true : false;

    if(!isWon && isOver) {
        winText.textContent = "It's a draw!";
        isOver = true;
    }

    if(isWon && (round % 2 != 0)) {
        winText.textContent = "Congratulations X, You won!"
        isOver = true;
    } else if (isWon && (round % 2 == 0)) {
        winText.textContent = "Congratulations O, You won!"
        isOver = true;
    }
}

const boardCells = Array.from(document.querySelectorAll(".square"));
let roundCount = 0;

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






