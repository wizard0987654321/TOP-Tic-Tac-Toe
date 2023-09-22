const board = document.querySelector(".gameboard");
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
            xChoices.push(choiceIndex);
        } else {
            oChoices.push(choiceIndex);
        }
    }

    return { change, xChoices, oChoices };
})();

const Player = (choice) => {

    const getChoice = () => {
        return choice;
    }

    return {getChoice}
}

const game = (() => { 


const boardCells = Array.from(document.querySelectorAll(".square"));

    for (let i = 0; i < 9; i++) { 
        boardCells[i].setAttribute("data-cell-index", i); 
        boardCells[i].addEventListener("click", (e) => {
            if(e.target.textContent == "") {
                if(xTurn) {
                    e.target.textContent = "X";
                    xTurn = false;
                } else {
                    e.target.textContent = "O"
                    xTurn = true;
                }
                let turnIndex = e.target.getAttribute("data-cell-index");
                Gameboard.change(turnIndex, xTurn);
                console.log(Gameboard.xChoices);
                console.log(Gameboard.oChoices);
            }
        })
    }
    
})();






