"use strict";

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

const snakeQueue = new Queue(); 
let foodPosition = { row: 0, col: 0 };

const controls = { left: false, right: false };
let direction;

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

    checkCollisions();

    displayBoard();
}

function moveSnake() {
    const head = {
        row: snakeQueue[snakeQueue.length - 1].row,
        col: snakeQueue[snakeQueue.length - 1].col,
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
        alert('Game Over! Your score: ' + snakeQueue.length);
        resetGame();
        return;
    }

    //check if the head eats food
    if (head.row === foodPosition.row && head.col === foodPosition.col) {
        snakeQueue.unshift({ row: head.row, col: head.col });
        generateFood();
    } else {
        // Move the snake by adding the new head and removing the tail
        snakeQueue.push({ row: head.row, col: head.col });
        snakeQueue.shift();
    }
}

function checkCollision(row, col) {
}

function generateFood() {

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
    
    snakeQueue.push({ row: 5, col: 5 }, { row: 5, col: 6 }, { row: 5, col: 7 });
    generateFood();
}

document.addEventListener("keydown", handleInput);

//start the game
initializeGame();
tick();
