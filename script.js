const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
  x: 50,
  y: 300,
  width: 30,
  height: 30,
  velocityY: 0,
  jumpForce: 12,
  grounded: false
};

let gravity = 0.5;
let obstacles = [];
let frame = 0;
let score = 0;
let gameOvered = false;

// Zvuk skoku
const jumpSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_841174d841.mp3?filename=jump-144026.mp3");

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
  obstacles.push({ x, y, width, height, passed: false });
}

function updateObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    let obs = obstacles[i];
    obs.x -= 5;

    if (
      player.x < obs.x + obs.width &&
      player.x + player.width > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + player.height > obs.y
    ) {
      triggerGameOver();
    }

    if (!obs.passed && obs.x + obs.width < player.x) {
      obs.passed = true;
      score++;
    }
  }

  obstacles = obstacles.filter(obs => obs.x + obs.width > 0);
}

function drawScore() {
  ctx.fillStyle = "#ff1493";
  ctx.font = "24px Comic Sans MS";
  ctx.fillText("Skóre: " + score, 20, 40);
}

function drawPlayer() {
  // Emoji hráče
  ctx.font = "30px Arial";
  ctx.fillText("🧁", player.x, player.y + 25);

  // Třpytky (náhodně kolem)
  for (let i = 0; i < 3; i++) {
    let sparkleX = player.x + Math.random() * 30;
    let sparkleY = player.y + Math.random() * 30;
    ctx.fillStyle = "#ffccff";
    ctx.fillRect(sparkleX, sparkleY, 2, 2);
  }
}

function drawGameOverScreen() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = "40px Comic Sans MS";
  ctx.fillText("Prohrála jsi 💔", 270, 180);
  ctx.font = "24px Comic Sans MS";
  ctx.fillText("Skóre: " + score, 340, 220);
  ctx.fillText("Obnov stránku pro novou hru", 240, 260);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();

  for (let i = 0; i < obstacles.length; i++) {
    drawHeart(obstacles[i].x + 5, obstacles[i].y);
  }

  drawScore();

  if (gameOvered) {
    drawGameOverScreen();
  }
}

let gameLoopId;
function gameLoop() {
  if (!gameOvered) {
    frame++;
    if (frame % 100 === 0) {
      createObstacle();
    }

    updatePlayer();
    updateObstacles();
    draw();
    gameLoopId = requestAnimationFrame(gameLoop);
  }
}

function triggerGameOver() {
  gameOvered = true;
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && player.grounded) {
    player.velocityY = -player.jumpForce;
    jumpSound.play();
  }
});

gameLoop();