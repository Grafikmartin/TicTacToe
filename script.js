const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let isXTurn = true;
let boardState = Array(9).fill(null);
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (boardState[index] !== null || checkWinner()) return;

    boardState[index] = isXTurn ? 'X' : 'O';
    cell.innerHTML = `<img src="assets/${isXTurn ? 'kreuz' : 'kreis'}.png" alt="${isXTurn ? 'X' : 'O'}">`;

    if (checkWinner()) {
        statusText.textContent = `${isXTurn ? 'Kreuz' : 'Kreis'} gewinnt!`;
    } else if (boardState.every(cell => cell !== null)) {
        statusText.textContent = 'Unentschieden!';
    } else {
        isXTurn = !isXTurn;
        statusText.textContent = `${isXTurn ? 'Kreuz' : 'Kreis'} ist am Zug`;
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function resetGame() {
    boardState = Array(9).fill(null);
    cells.forEach(cell => cell.innerHTML = '');
    isXTurn = true;
    statusText.textContent = 'Kreuz ist am Zug';
}
