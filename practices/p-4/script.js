const border = 5;
const size = 15;
const radius = size / 2;

const areaElm = document.getElementById("area");

const startX = areaElm.offsetLeft + radius + border;
const startY = areaElm.offsetTop + radius + border;
const endX = areaElm.offsetLeft + areaElm.offsetWidth - radius - border;
const endY = areaElm.offsetTop + areaElm.offsetHeight - radius - border;

const areaWidth = endX - startX;
const areaHeight = endY - startY;

const colorInput = document.getElementById("color");
const addButton = document.getElementById("add");
const clearButton = document.getElementById("clear");
const balls = document.getElementById("balls");

addButton.addEventListener("click", () => {
  createBalls(10, colorInput.value);
});

clearButton.addEventListener("click", () => {
  while (balls.children.length !== 0) {
    balls.children[0].remove();
  }
});

createBalls(10, "red");
createBalls(10, "blue");
createBalls(10, "yellow");

function createBalls(limit, color) {
  for (let count = 1; count <= limit; count = count + 1) {
    const ball = [
      Math.round(Math.random() * areaWidth),
      Math.round(Math.random() * areaHeight),
      color,
    ];

    createBall(ball);
  }
}

let movingBall = null;

function createBall(ball) {
  const x = ball[0];
  const y = ball[1];
  const color = ball[2];

  const ballElm = document.createElement("div");
  ballElm.classList.add("box");

  ballElm.style.left = startX + x + "px";
  ballElm.style.top = startY + y + "px";
  ballElm.style.background = color;

  balls.appendChild(ballElm);

  ballElm.addEventListener("mousedown", (e) => {
    ballElm.classList.add("active");

    document.body.style.cursor = "none";
    ballElm.style.cursor = "none";

    movingBall = ballElm;
  });
}

document.addEventListener("mousemove", (e) => {
  if (movingBall != null) {
    movingBall.style.top = clamp(endY, e.pageY, startY) + "px";
    movingBall.style.left = clamp(endX, e.pageX, startX) + "px";
  }
});

document.addEventListener("mouseup", () => {
  if (movingBall == null) return;

  movingBall.classList.remove("active");

  document.body.style.cursor = "default";
  movingBall.style.cursor = "pointer";

  movingBall = null;
});

function clamp(max, val, min) {
  return Math.max(Math.min(max, val), min);
}
