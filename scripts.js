const canvas = document.getElementById("canvasMain");
const ctx = canvas.getContext('2d');

let playerX = canvas.width / 2;
let playerY = canvas.height - 30;
let obstacleX = Math.min(Math.random() * canvas.width, canvas.width);
let obstacleY = canvas.height;
let dx = 0;
let dy = 0;
const playerRadius = 10;
const FRICTION = 0.96;

const keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    action: false,
};
const prevKeys = {
    left: false,
    right: false,
    up: false,
    down: false,
    action: false,
};

let isDashing = false;
let dashTimer = 0;
let dashCooldown = 0;

const DASH_SPEED = 10;
const DASH_DURATION = 10;
const DASH_FRICTION = 0.98;
const DASH_BRAKE = 0.7; 

function justPressed(key) {
    return keys[key] && !prevKeys[key];
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(playerX, playerY, playerRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawObstacle() {
    fillRect(obstacleX, obstacleY, 15, 50)
    color: black; 
}

function tryDash() {
    if (isDashing || dashCooldown > 0) return;

    if (keys.right) {
        dx = DASH_SPEED;
    } else if (keys.left) {
        dx = -DASH_SPEED;
    } else {
        return;
    }

    isDashing = true;
    dashTimer = DASH_DURATION;
    dashCooldown = 30;
}

function handleDashMovement() {
    dashTimer--;

    if (keys.left && dx > 0) {
        dx *= DASH_BRAKE;
    } else if (keys.right && dx < 0) {
        dx *= DASH_BRAKE;
    } else {
        dx *= DASH_FRICTION;
    }

    if (dashTimer <= 0) {
        isDashing = false;
    }
}

function playerMovement() {
    if (isDashing) {
        handleDashMovement();
        return;
    }

    if (keys.right) {
        dx = Math.min(dx + 0.25, 1.5);
    } else if (keys.left) {
        dx = Math.max(dx - 0.25, -1.5);
    }
    if (keys.up) {
        dy = Math.max(dy - 0.12, -1);   
    } else if (keys.down) {
        dy = Math.min(dy + 0.12, 1);
    }
}

function bounceLogic() {
    if (playerY + dy < playerRadius || playerY + dy > canvas.height - playerRadius) {
        dy = -dy;
    }

    if (playerX + dx < playerRadius || playerX + dx > canvas.width - playerRadius) {
        dx = -dx;
    }
}

function draw() {
    if (dashCooldown > 0) dashCooldown--;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawObstacle();
    if (justPressed("action")) {
        tryDash();
    }
    playerMovement();
    bounceLogic();
    playerX += dx;
    playerY += dy;

    if (!isDashing) {
        dx *= FRICTION;
        dy *= FRICTION;
    }

    if (Math.abs(dx) < 0.01) dx = 0;
    if (Math.abs(dy) < 0.01) dy = 0;

    Object.assign(prevKeys, keys);
}

document.addEventListener("keydown", e => setKey(e, true));
document.addEventListener("keyup", e => setKey(e, false));

function setKey(e, isDown) {
    switch (e.key) {
        case "Right":
        case "ArrowRight":
        case "d":
        case "D":
            keys.right = isDown;
            break;
        case "Left":
        case "ArrowLeft":
        case "a":
        case "A":
            keys.left = isDown;
            break;
        case "Up":
        case "ArrowUp":
        case "w":
        case "W":
            keys.up = isDown;
            break;
        case "Down":
        case "ArrowDown":
        case "s":
        case "S":
            keys.down = isDown;
            break;
        case " ":
            keys.action = isDown;
            break;
    }
}

const runButton = document.getElementById("runButton");
runButton.addEventListener("click", () => {
    startGame();
    runButton.disabled = true;
})

function startGame() {
    setInterval(draw, 10);
}