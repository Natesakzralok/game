const character = document.getElementById("character");
const blocks = [document.getElementById("block1"), document.getElementById("block2"), document.getElementById("block3")];

function jump() {
  if (!character.classList.contains("jump")) {
    character.classList.add("jump");
    setTimeout(() => {
      character.classList.remove("jump");
    }, 500);
  }
}

document.addEventListener("keydown", () => {
  jump();
});

setInterval(() => {
  blocks.forEach(block => {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    if (blockLeft < 75 && blockLeft > 25 && characterTop >= 130) {
      alert("Konec hry! Narazila jsi do překážky.");
    }
  });
}, 10);
