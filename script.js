const character = document.getElementById("character");
const block = document.getElementById("block");

function jump() {
  if (character.classList != "jump") {
    character.classList.add("jump");
    setTimeout(function () {
      character.classList.remove("jump");
    }, 500);
  }
}

document.addEventListener("keydown", function (event) {
  jump();
});

let checkDead = setInterval(function () {
  let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

  if (blockLeft < 100 && blockLeft > 0 && characterTop >= 130) {
    alert("Konec hry! Zkus to znovu.");
  }
}, 10);