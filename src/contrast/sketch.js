/**
 * P5 color type
 * @typedef {import("p5").Color} Color
 */

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
  backgroundColor = color(200, 170, 220);
  maxCircles = (windowWidth + windowHeight) * 2;
  numCircles = 0;
  drawingStep = addDots;

  createCanvas(windowWidth, windowHeight);
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

export {};
