'use strict';

let player1 = true;
let grid = [
    ['.','.','.'], 
    ['.','.','.'], 
    ['.','.','.']
];

const gameHeading = document.getElementById("gameHeading");
const cellClick = document.querySelectorAll(".cell");
const playAgainClick = document.getElementById("playAgain");

// function for clicking cell
cellClick.forEach((item, index) => {
    item.addEventListener('click', function() {
        let r = Math.floor(index / 3);
        let c = index % 3;

        if (player1) {
            this.textContent = 'X';
            this.disabled = true;
            grid[r][c] = 'X';
            gameHeading.textContent = "Player 2's turn!";
        }
        else {
            this.textContent = 'O';
            this.disabled = true;
            grid[r][c] = 'O';
            gameHeading.textContent = "Player 1's turn!";
        }

        if (checkWinner(r, c)) { //if winner exists, call endgame
            endGame();
        }
        player1 = !player1;
    });
})

// check for winner
function checkWinner(r, c) {
    let winner = true;
    let curr = grid[r][c];
    let winningCells = [];

    for (let i = 0; i < 3; i++) {   // check row
        if (curr != grid[r][i])
            winner = false;
        else 
            winningCells.push(i + (r*3));
    }
    if (winner) {
        highlightWinner(winningCells);
        return winner;
    }

    winner = true;
    winningCells = [];
    for (let i = 0; i < 3; i++) {   // check col
        if (curr != grid[i][c])
            winner = false;
        else 
            winningCells.push(c + (i*3));
    }
    if (winner) {
        highlightWinner(winningCells);
        return winner;
    }

    winner = true;
    winningCells = [];
    for (let i = 0; i < 3; i++) {   // check left diag
        if (curr != grid[i][i])
            winner = false;
        else 
            winningCells.push(i + (i*3));
    }
    if (winner) {
        highlightWinner(winningCells);
        return winner;
    }

    winner = true;
    winningCells = [];
    let j = 2;
    for (let i = 0; i < 3; i++, j--) {   // check right diag
        if (curr != grid[i][j])
            winner = false;
        else 
            winningCells.push(j + (i*3));
    }
    if (winner) {
        highlightWinner(winningCells);
        return winner;
    }

    return false;
}

// highlight winner
function highlightWinner(winningCells) {
    winningCells.forEach(helper);

    function helper(winningIndex, i, winningCells) {
        cellClick.forEach((cell, j) => {
            if (winningIndex == j) {
                cell.className = "winningCell";
            }
        })
    }
}

// end game
function endGame() {
    // change heading to display winner
    if (player1)
        gameHeading.textContent = "Player 1 wins!";
    else 
        gameHeading.textContent = "Player 2 wins!";

    // display "Play again" button
    playAgainClick.classList.remove("inactive");

    // disable other cells
    cellClick.forEach((item, index) => {
        item.disabled = true;
    })
}

// play again
playAgainClick.addEventListener('click', function() {
    window.location.href = "../content/board.html";
});
