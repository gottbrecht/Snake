"use strict";

class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    getItems() {
        return this.items;
    }
}

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

const snakeQueue = new Queue(); 
let foodPosition = { row: 0, col: 0 };

const controls = { left: false, right: false };
let direction = "right";

function start() {
    console.log(`Javascript kører`);

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    //start ticking
    tick();
}

function keyDown(event) {
    switch (event.key) {
        case "a":
        case "ArrowLeft":
            controls.left = true;
            controls.right = false; //ensure only one direction is active
            break;
        case "d":
        case "ArrowRight":
            controls.right = true;
            controls.left = false;
            break;
    }
}

function keyUp(event) {
}

function tick() {
    setTimeout(tick, 500);
    
    clearGrid();
    moveSnake();
    displayBoard();
    checkCollision();
}

function moveSnake() {
    const front = snakeQueue.front();
    
    if(front === null) {
        return;
    }

    const head = {
        row: front().row,
        col: front().col,
    };

    //handle controls
    if (controls.left) {
        direction = "left";
    } else if (controls.right) {
        direction = "right";
    }

    //move the head based on the direction
    switch (direction) {
        case "left":
            head.col--;
            if (head.col < 0) {
                head.col = GRID_WIDTH - 1;
            }
            break;
        case "right":
            head.col++;
            if (head.col >= GRID_WIDTH) {
                head.col = 0;
            }
            break;
    }

    //check if the head collides with the body or hits the wall
    if (checkCollision(head.row, head.col)) {
        alert('Game Over! Your score: ' + snakeQueue.size());
        resetGame();
        return;
    }

    //check if the head eats food
    if (head.row === foodPosition.row && head.col === foodPosition.col) {
        snakeQueue.unshift({ row: head.row, col: head.col });
        generateFood();
    } else {
        snakeQueue.push({ row: head.row, col: head.col });
        snakeQueue.shift();
    }
}

function checkCollision(row, col) {
    if (row < 0 || row >= GRID_HEIGHT || col < 0 || col >= GRID_WIDTH) {
        return true;
    }

    const snakeQueueItems = snakeQueue.getItems();


    for (const part of snakeQueueItems) {
        if (part.row === row && part.col === col) {
            return true;
        }
    }

    return false;
}

function writeToCell(row, col, value) {
}

function createEmptyBoard() {
    const board = [];

    for (let row = 0; row < GRID_HEIGHT; row++) {
        const rowArray = [];
        for (let col = 0; col < GRID_WIDTH; col++) {
            rowArray.push(0);
        }
        board.push(rowArray);
    }

    return board;
}

function displayBoard() {
    const board = createEmptyBoard();

    // Draw snake on the board
    for (const part of snakeQueue.getItems()) {
        board[part.row][part.col] = 'S';
    }

    // Draw food on the board
    board[foodPosition.row][foodPosition.col] = 'F';

    // Print the board to the console
    for (let row = 0; row < GRID_HEIGHT; row++) {
        let rowStr = '';
        for (let col = 0; col < GRID_WIDTH; col++) {
            rowStr += board[row][col] + ' ';
        }
        console.log(rowStr);
    }
}


function generateFood() {
    foodPosition = {
        row: Math.floor(Math.random() * GRID_HEIGHT),
        col: Math.floor(Math.random() * GRID_WIDTH),
    };

    const snakeQueueItems = snakeQueue.getItems();

    for (const part of snakeQueueItems) {
        if (foodPosition.row === part.row && foodPosition.col === part.col) {
            generateFood();
            return;
        }
    }
    writeToCell(foodPosition.row, foodPosition.col, 2);

}

function clearGrid() {
    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            writeToCell(row, col, 0);
        }
    }
}

//initialize the game
function initializeGame() {
    snakeQueue.enqueue({ row: 5, col: 5 });
    snakeQueue.enqueue({ row: 5, col: 6 });
    snakeQueue.enqueue({ row: 5, col: 7 });
    generateFood();
}

function resetGame() {
    snakeQueue.getItems().length = 0;
    initializeGame();
}

start();

