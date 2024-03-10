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

function drawSnake() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('snake'));

    snake.forEach(segment => {
        const index = segment.x + segment.y * boardSize;
        cells[index].classList.add('snake');
    });
}

function drawFood() {
    const cells = document.querySelectorAll('.cell');
    const index = food.x + food.y * boardSize;
    cells[index].classList.add('food');
}