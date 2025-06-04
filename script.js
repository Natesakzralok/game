const dog = document.getElementById("dog");
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
  dog.classList.add("jump");
  setTimeout(() => {
    dog.classList.remove("jump");
    jumping = false;
  }, 500);
}

setInterval(() => {
  let dogBottom = parseInt(window.getComputedStyle(dog).getPropertyValue("bottom"));
  let obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

  if (obstacleRight > 550 && obstacleRight < 600 && dogBottom <= 30) {
    alert("💥 Čenda narazil! Tvoje skóre: " + score);
    score = 0;
  } else {
    score++;
  }

  scoreDisplay.textContent = score;
}, 100);