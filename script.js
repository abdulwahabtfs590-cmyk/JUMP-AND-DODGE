const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

let isJumping = false;
let playerBottom = 40;
let velocity = 0;

const gravity = 0.8;
const jumpPower = 15;

let obstacleRight = -50;
let obstacleSpeed = 6;

let score = 0;
let gameRunning = true;

function jump() {
    if (!isJumping && gameRunning) {
        isJumping = true;
        velocity = jumpPower;
    }
}

function updatePlayer() {
    if (isJumping) {
        playerBottom += velocity;
        velocity -= gravity;

        if (playerBottom <= 40) {
            playerBottom = 40;
            velocity = 0;
            isJumping = false;
        }

        player.style.bottom = playerBottom + "px";
    }
}

function updateObstacle() {
    obstacleRight += obstacleSpeed;

    if (obstacleRight > 1000) {
        obstacleRight = -50;
        score++;
        scoreDisplay.textContent = score;
    }

    obstacle.style.right = obstacleRight + "px";
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top
    ) {
        endGame();
    }
}

function endGame() {
    gameRunning = false;
    finalScore.textContent = score;
    gameOverScreen.style.display = "block";
}

function gameLoop() {
    if (gameRunning) {
        updatePlayer();
        updateObstacle();
        checkCollision();

        requestAnimationFrame(gameLoop);
    }
}

function restartGame() {
    isJumping = false;
    playerBottom = 40;
    velocity = 0;
    obstacleRight = -50;
    score = 0;
    scoreDisplay.textContent = score;
    gameRunning = true;

    gameOverScreen.style.display = "none";

    player.style.bottom = playerBottom + "px";
    obstacle.style.right = obstacleRight + "px";

    gameLoop();
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        event.preventDefault();
        jump();
    }
});

restartButton.addEventListener("click", function(event) {
    event.stopPropagation();
    restartGame();
});

gameLoop();
