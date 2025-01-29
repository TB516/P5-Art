/**
 * P5 color type
 * @typedef {import("p5").Color} Color
 */

/**
 * If the program is running on windowsketch.art
 * @type {boolean}
 */
const WINDOW_SKETCH = false;

/**
 * P5 Black color
 * @type {Color}
 */
let BLACK;

/**
 * Max number of circles allowed on the screen
 * @type {number}
 */
let maxCircles;

/**
 * Current number of circles on the screen
 * @type {number}
 */
let numCircles = 0;

/**
 * P5js value for the current background color
 * @type {Color}
 */
let backgroundColor;

/**
 * Current drawing step to add a circle
 * @type {() => void}
 */
let drawingStep;

const drawRandCircle = () => {
  const diameter = random(25, 51);

  circle(random(0, width + 1), random(0, height + 1), diameter);
};

const addDots = () => {
  fill(random(0, 255));
  stroke(BLACK);

  numCircles += 1;
  drawRandCircle();

  if (numCircles === maxCircles) {
    backgroundColor = color(random(0, 255), random(0, 255), random(0, 255));
    drawingStep = coverDots;
  }
};

const coverDots = () => {
  fill(backgroundColor);
  stroke(backgroundColor);

  numCircles -= 1;
  drawRandCircle();

  if (numCircles === 0) {
    drawingStep = addDots;
  }
};

const init = () => {
  let canvasWidth = windowWidth;
  let canvasHeight = windowHeight;

  if (WINDOW_SKETCH) {
    canvasWidth = 390;
    canvasHeight = 1215;
  }

  backgroundColor = color(200, 170, 220);
  maxCircles = (canvasWidth + canvasHeight) * 2;
  numCircles = 0;
  drawingStep = addDots;

  createCanvas(canvasWidth, canvasHeight);
  background(backgroundColor);
};

function setup() {
  BLACK = color(0, 0, 0);
  init();
}

function draw() {
  drawingStep();
}

function windowResized() {
  init();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
