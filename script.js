const board = document.querySelector(".gameboard");
let xTurn = true;

// Create gameboard grid
for (let i = 0; i < 3; i++) {
    for (let i = 0; i < 3; i ++) {
        const square = document.createElement("div");
        
        square.classList.add("square");
        board.appendChild(square);
        square.addEventListener("click", playerTurn)
    }
}

const Gameboard = ((player, choice) => {
    const gameboard = ["x", "o", "o", "x", "o", "x", "x", "o", "x"];

    function displayGameboard(array) {
        const boardCells = Array.from(document.querySelectorAll(".square"));
        
        for (let i = 0; i < 9; i++) {
            boardCells[i].textContent = array[i];

            boardCells[i].classList.add(i);
        }
    }

    return {
        display: function () {
            displayGameboard(gameboard)
        }
    };
})();

Gameboard.display();

function playerTurn(e) {
    if(xTurn == true) {
        e.target.textContent = "X"
        xTurn = false;
    } else {
        e.target.textContent = "O"
        xTurn = true;
    }
 }

