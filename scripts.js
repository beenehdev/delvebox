const canvas = document.getElementById("canvasMain");
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 0;
let dy = 0;
const playerRadius = 10;
const FRICTION = 0.97;
const keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    action: false
};

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, playerRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function playerMovement() {
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
    if (y + dy < playerRadius || y + dy > canvas.height - playerRadius) {
        dy = -dy;
    }

    if (x + dx < playerRadius || x + dx > canvas.width - playerRadius) {
        dx = -dx;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    playerMovement();
    bounceLogic();
    x += dx;
    y += dy;
    dx *= FRICTION;
    dy *= FRICTION;
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