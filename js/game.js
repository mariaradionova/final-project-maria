document.body.addEventListener("htmx:afterSwap", (event) => {
  if (
    event.detail.target.id === "gameCanvas" ||
    event.detail.target.classList.contains("game-screen__canvas")
  ) {
    startGame();
  }
});

function startGame() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let bricksNeeded = 5;
  let bricksPlaced = 0;

  const tableHeight = 120;
  const brickWidth = 80;
  const brickHeight = 40;

  let movingBrick = null;
  let tower = [];
}
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let bricksNeeded = 5;
let bricksPlaced = 0;
const tableHeight = 120;
const brickWidth = 80;
const brickHeight = 40;
let movingBrick = null;
let tower = [];
function spawnBrick() {
  movingBrick = {
    x: canvas.width,
    y: canvas.height - tableHeight - brickHeight - 10,
    speed: 4,
    falling: false,
  };
}
function drawTable() {
  ctx.fillStyle = "var(--color-table)";
  ctx.fillRect(0, canvas.height - tableHeight, canvas.width, tableHeight);
}
function drawBrick(brick) {
  ctx.fillStyle = "var(--color-brick)";
  ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight);
}
function drawTower() {
  tower.forEach((b) => drawBrick(b));
}
function updateBrick() {
  if (!movingBrick) return;
  if (!movingBrick.falling) {
    movingBrick.x -= movingBrick.speed;
    if (movingBrick.x < -brickWidth) {
      resetGame();
      return;
    }
  } else {
    movingBrick.y += 8;
    const targetY =
      canvas.height - tableHeight - brickHeight * (tower.length + 1);
    if (movingBrick.y >= targetY) {
      movingBrick.y = targetY;
      tower.push({ ...movingBrick });
      movingBrick = null;
      bricksPlaced++;
      updateCounter();
      if (bricksPlaced >= bricksNeeded) {
        alert("Перемога!");
        resetGame();
      } else {
        spawnBrick();
      }
    }
  }
}
window.addEventListener("click", () => {
  if (movingBrick && !movingBrick.falling) {
    movingBrick.falling = true;
  }
});
function updateCounter() {
  const el = document.getElementById("brickCounter");
  el.textContent = `${bricksNeeded - bricksPlaced}/${bricksNeeded}`;
}
function resetGame() {
  bricksPlaced = 0;
  tower = [];
  updateCounter();
  spawnBrick();
}
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawTable();
  drawTower();
  updateBrick();
  if (movingBrick) drawBrick(movingBrick);

  requestAnimationFrame(loop);
}
resetGame();
loop();
