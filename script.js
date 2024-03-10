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

function moveSnake() {
    const head = Object.assign({}, snake[0]);

    switch (direction) {
        case 'up':
            head.y = (head.y - 1 + boardSize) % boardSize;
            break;
        case 'down':
            head.y = (head.y + 1) % boardSize;
            break;
        case 'left':
            head.x = (head.x - 1 + boardSize) % boardSize;
            break;
        case 'right':
            head.x = (head.x + 1) % boardSize;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }

    if (checkCollision()) {
        clearInterval(intervalId);
        alert('Game Over! Your score: ' + (snake.length - 1));
        resetGame();
    }

    drawSnake();
    drawFood();
    }

    