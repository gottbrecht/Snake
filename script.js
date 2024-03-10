const boardSize = 20;
const speed = 200;
let snake = [{ x: 5, y: 5 }];
let direction = 'right';
let food = generateFood();
let intervalId;

function startGame() {
    createBoard();
    intervalId = setInterval(moveSnake, speed);
    document.addEventListener('keydown', changeDirection);
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameBoard.appendChild(cell);
    }
    drawSnake();
    drawFood();
}