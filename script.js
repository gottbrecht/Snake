"use strict";

window.addEventListener("load", start);

// ******** CONTROLLER ********

function start() {
    console.log(`Javascript kører`);

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    // start ticking
    tick();
}

const controls = { left: false, right: false };

function keyDown(event) {
    switch (event.key) {
        case "a":
        case "ArrowLeft":
            controls.left = true;
            break;
        case "d":
        case "ArrowRight":
            controls.right = true;
            break;
    }
}

function keyUp(event) {
    switch (event.key) {
        case "a":
        case "ArrowLeft":
            controls.left = false;
            break;
        case "d":
        case "ArrowRight":
            controls.right = false;
            break;
    }
}

function tick() {
    // setup next tick
    setTimeout(tick, 500);

    for (const part of queue) {
        writeToCell(part.row, part.col, 0);
    }

    if (controls.left) {
        direction = "left";
    } else if (controls.right) {
        direction = "right";
    }

    // lav nyt head
    const head = {
        row: queue[queue.length - 1].row,
        col: queue[queue.length - 1].col,
    };

    queue.push(head);

    writeToCell(queue[0].row, queue[0].col, 0);

    switch (direction) {
        case "left":
            head.col--;
            if (head.col < 0) {
                head.col = 9;
            }
            break;
        case "right":
            head.col++;
            if (head.col > 9) {
                head.col = 0;
            }
            break;
    }

    // Check if the head collides with the body
    for (let i = 1; i < queue.length; i++) {
        if (head.row === queue[i].row && head.col === queue[i].col) {
            alert('Game Over! Your score: ' + (queue.length - 1));
            resetGame();
            return;
        }
    }

    writeToCell(head.row, head.col, 1);

    // Remove the tail if the snake hasn't grown
    if (queue.length > 1) {
        queue.shift();
    }

    // display the model in full
    displayBoard();
}

// Existing Snake model
let direction;
const queue = [
    { row: 5, col: 5 },
    { row: 5, col: 6 },
    { row: 5, col: 7 },
];

// Existing Board model
const model = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// Existing View function
function writeToCell(row, col, value) {
    model[row][col] = value;
}

function readFromCell(row, col) {
    return model[row][col];
}

function displayBoard() {
    const cells = document.querySelectorAll("#grid .cell");
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const index = row * 10 + col;

            switch (readFromCell(row, col)) {
                case 0:
                    cells
            }
        }
    }
}