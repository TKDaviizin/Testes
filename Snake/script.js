const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restartButton');
const reverseButton = document.getElementById('reverseButton');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = [];
let snakeLength = 1;
let direction = 'RIGHT';
let food = { x: 0, y: 0 };
let score = 0;
let level = 1;
let speed = 100; // Initial speed (ms per frame)
let gameInterval;

function setup() {
    snake[0] = { x: Math.floor(columns / 2), y: Math.floor(rows / 2) };
    placeFood();
    updateScore();
    updateLevel();
    gameInterval = setInterval(update, speed);
}

function restartGame() {
    clearInterval(gameInterval);
    snake = [];
    snakeLength = 1;
    direction = 'RIGHT';
    score = 0;
    level = 1;
    speed = 100;
    placeFood();
    updateScore();
    updateLevel();
    setup();
}

function update() {
    moveSnake();
    checkCollision();
    checkFoodCollision();
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw borders
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = '#4CAF50'; // Snake color
    ctx.strokeStyle = '#388E3C'; // Snake border color
    ctx.lineWidth = 2; // Border width
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * scale, snake[i].y * scale, scale, scale);
        ctx.strokeRect(snake[i].x * scale, snake[i].y * scale, scale, scale);
    }

    // Draw food
    ctx.fillStyle = '#FFC107'; // Food color
    ctx.strokeStyle = '#FFA000'; // Food border color
    ctx.lineWidth = 2; // Border width
    ctx.beginPath();
    ctx.arc((food.x * scale) + scale / 2, (food.y * scale) + scale / 2, scale / 2, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
}

function moveSnake() {
    let head = { ...snake[0] };

    // Move the snake in the current direction
    switch (direction) {
        case 'UP':
            head.y--;
            break;
        case 'DOWN':
            head.y++;
            break;
        case 'LEFT':
            head.x--;
            break;
        case 'RIGHT':
            head.x++;
            break;
    }

    // Wrap around the screen
    if (head.x >= columns) head.x = 0;
    if (head.x < 0) head.x = columns - 1;
    if (head.y >= rows) head.y = 0;
    if (head.y < 0) head.y = rows - 1;

    snake.unshift(head);
    if (snake.length > snakeLength) {
        snake.pop();
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * columns);
    food.y = Math.floor(Math.random() * rows);
}

function checkCollision() {
    const head = snake[0];

    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function checkFoodCollision() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        snakeLength++;
        score++;
        if (score % 5 === 0) { // Increase level every 5 points
            level++;
            speed = Math.max(50, speed - 10); // Increase speed (decrease time)
            clearInterval(gameInterval);
            gameInterval = setInterval(update, speed);
        }
        updateScore();
        updateLevel();
        placeFood();
    }
}

function changeDirection(event) {
    const key = event.keyCode;
    switch (key) {
        case 37: // Left arrow
            if (direction !== 'RIGHT') direction = 'LEFT';
            break;
        case 38: // Up arrow
            if (direction !== 'DOWN') direction = 'UP';
            break;
        case 39: // Right arrow
            if (direction !== 'LEFT') direction = 'RIGHT';
            break;
        case 40: // Down arrow
            if (direction !== 'UP') direction = 'DOWN';
            break;
    }
}

function reverseDirection() {
    switch (direction) {
        case 'UP':
            direction = 'DOWN';
            break;
        case 'DOWN':
            direction = 'UP';
            break;
        case 'LEFT':
            direction = 'RIGHT';
            break;
        case 'RIGHT':
            direction = 'LEFT';
            break;
    }
}

function gameOver() {
    clearInterval(gameInterval);
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
}

function updateScore() {
    scoreDisplay.textContent = `Pontuação: ${score}`;
}

function updateLevel() {
    levelDisplay.textContent = `Nível: ${level}`;
}

function handleKeyPress(event) {
    const key = event.keyCode;
    if (key === 82) { // 'R' key
        restartGame();
    } else if (key === 32) { // Space key
        reverseDirection();
    } else {
        changeDirection(event); // Process arrow keys
    }
}

document.addEventListener('keydown', handleKeyPress);
restartButton.addEventListener('click', restartGame);
reverseButton.addEventListener('click', reverseDirection);

setup();
