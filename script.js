const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let score = 0;
let jumping = false;

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !jumping) {
    jump();
  }
});

function jump() {
  jumping = true;
  player.classList.add("jump");
  setTimeout(() => {
    player.classList.remove("jump");
    jumping = false;
  }, 400);
}

setInterval(() => {
  let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
  let obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

  if (obstacleRight > 500 && obstacleRight < 530 && playerBottom <= 30) {
    alert("💥 Čenda narazil! Tvoje skóre: " + score);
    score = 0;
  } else {
    score++;
  }

  scoreDisplay.textContent = score;
}, 100);
