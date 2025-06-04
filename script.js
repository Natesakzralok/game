const character = document.getElementById("character");
const blocks = [
  document.getElementById("block1"),
  document.getElementById("block2"),
  document.getElementById("block3")
];

function jump() {
  if (!character.classList.contains("jump")) {
    character.classList.add("jump");
    setTimeout(() => {
      character.classList.remove("jump");
    }, 500);
  }
}

document.addEventListener("keydown", jump);

setInterval(() => {
  const characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));

  blocks.forEach(block => {
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    const blockWidth = parseInt(window.getComputedStyle(block).getPropertyValue("width"));
    const blockHeight = parseInt(window.getComputedStyle(block).getPropertyValue("height"));

    if (blockLeft < 120 && blockLeft + blockWidth > 80 && characterBottom < blockHeight) {
      alert("💥 Konec hry! Narazila jsi do srdíčka.");
    }
  });
}, 10);