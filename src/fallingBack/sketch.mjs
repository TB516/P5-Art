/**
 * @type {number}
 */
const maxDepth = 15;

/**
 * @type {{x: number, y: number, radius: number}[][]}
 */
let circles;

let drawingDepth = 0;

const init = () => {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
  frameRate(1);

  drawingDepth = 0;

  circles = Array.from({ length: maxDepth }, () => []);

  calcCircles(width / 2, height / 2, height / 2, 0);
};

const calcCircles = (
  /** @type {number} */ x,
  /** @type {number} */ y,
  /** @type {number} */ radius,
  /** @type {number} */ depth
) => {
  if (depth == maxDepth) return;

  circles[depth].push({ x, y, radius });

  const scale = 0.5;
  const newRadius = radius * scale;

  calcCircles(x + newRadius, y, newRadius, depth + 1);
  calcCircles(x - newRadius, y, newRadius, depth + 1);
  calcCircles(x, y - newRadius, newRadius, depth + 1);
};

function setup() {
  init();
}

function windowResized() {
  init();
}

function draw() {
  translate(-width / 2, -height / 2);

  fill(
    color(
      255,
      ((drawingDepth + 1) / maxDepth) * 128,
      random(128, 255),
      ((drawingDepth + 1) / maxDepth) * 255
    )
  );

  const circleToDraw = circles[drawingDepth].splice(
    random(0, circles[drawingDepth].length),
    1
  )[0];

  circle(circleToDraw.x, circleToDraw.y, circleToDraw.radius * 2);

  if (circles[drawingDepth].length == 0) {
    ++drawingDepth;
  }

  if (drawingDepth == maxDepth) {
    noLoop();
  }
}

window.setup = setup;
window.windowResized = windowResized;
window.draw = draw;
