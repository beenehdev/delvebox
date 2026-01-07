const canvas = document.getElementById("canvasMain");
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function bounceLogic() {
    if (y + dy < 0 || y + dy > canvas.height) {
        dy = -dy;
    }

    if (x + dx < 0 || x + dx > canvas.width) {
        dx = -dx;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    bounceLogic();
    x += dx;
    y += dy;
}

function startGame() {
    setInterval(draw, 10);
}

const runButton = document.getElementById("runButton");
runButton.addEventListener("click", () => {
    startGame();
    runButton.disabled = true;
})