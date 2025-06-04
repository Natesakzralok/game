const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
  x: 50,
  y: 300,
  width: 30,
  height: 30,
  color: "#ff66b2",
  velocityY: 0,
  jumpForce: 12,
  grounded: false
};

let gravity = 0.5;
let obstacles = [];
let frame = 0;

function drawHeart(x, y) {
  ctx.fillStyle = "#ff4da6";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y - 10, x - 15, y - 10, x - 15, y);
  ctx.bezierCurveTo(x - 15, y + 10, x, y + 20, x, y + 30);
  ctx.bezierCurveTo(x, y + 20, x + 15, y + 10, x + 15, y);
  ctx.bezierCurveTo(x + 15, y - 10, x, y - 10, x, y);
  ctx.fill();
}

function updatePlayer() {
  player.velocityY += gravity;
  player.y += player.velocityY;

  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    player.velocityY = 0;
    player.grounded = true;
  } else {
    player.grounded = false;
  }
}

function createObstacle() {
  let width = 30;
  let height = 30;
  let x = canvas.width;
  let y = canvas.height - height;
  obstacles.push({ x, y, width, height });
}

function updateObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 5;

    if (
      player.x < obstacles[i].x + obstacles[i].width &&
      player.x + player.width > obstacles[i].x &&
      player.y < obstacles[i].y + obstacles[i].height &&
      player.y + player.height > obstacles[i].y
    ) {
      alert("Prohrála jsi! Obnov stránku pro novou hru.");
      document.location.reload();
    }
  }

  obstacles = obstacles.filter(obs => obs.x + obs.width > 0);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  for (let i = 0; i < obstacles.length; i++) {
    drawHeart(obstacles[i].x + 5, obstacles[i].y);
  }
}

function gameLoop() {
  frame++;
  if (frame % 100 === 0) {
    createObstacle();
  }

  updatePlayer();
  updateObstacles();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && player.grounded) {
    player.velocityY = -player.jumpForce;
  }
});

gameLoop();