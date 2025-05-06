/**
 * @type {number}
 */
const maxDepth = 5;

let shaderProgram;
let vertexShader;
let fragmentShader;

const init = () => {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);

  shaderProgram = createShader(
    vertexShader.join("\n"),
    fragmentShader.join("\n")
  );

  drawCircleRecursively(width / 2, height / 2, 300, 0, 0);
};

const drawCircleRecursively = (
  /** @type {number} */ x,
  /** @type {number} */ y,
  /** @type {number} */ radius,
  /** @type {number} */ angle,
  /** @type {number} */ depth
) => {
  if (depth == maxDepth) return;

  push();
  translate(-width / 2, -height / 2);
  fill(255, (depth + 1) * 10);
  circle(x, y, radius * 2);
  pop();

  const scale = 0.6;
  const newRadius = radius * scale;
  const newAngle = angle + 60;

  drawCircleRecursively(
    x + radius * cos(-angle),
    y - radius * sin(angle),
    newRadius,
    newAngle,
    depth + 1
  );
  drawCircleRecursively(
    x - radius * cos(angle),
    y - radius * sin(-angle),
    newRadius,
    newAngle,
    depth + 1
  );
};

function preload() {
  vertexShader = loadStrings("shaders/shader.vert");
  fragmentShader = loadStrings("shaders/shader.frag");
}

function setup() {
  init();
}

function windowResized() {
  init();
}

function draw() {}

window.preload = preload;
window.setup = setup;
window.windowResized = windowResized;
window.draw = draw;
