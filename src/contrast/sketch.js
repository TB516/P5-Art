const WINDOW_SKETCH = false;
let BLACK;

let canvasWidth;
let canvasHeight;

let maxCircles;
let numCircles = 0;
let backgroundColor;
let drawingStep;

const drawRandCircle = () => {
  const diameter = random(25, 51);

  circle(random(0, canvasWidth + 1), random(0, canvasHeight + 1), diameter);
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
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;

  if (WINDOW_SKETCH) {
    canvasWidth = 390;
    canvasHeight = 1215;
  }

  backgroundColor = color(200, 170, 220);
  maxCircles = (windowWidth + windowHeight) * 2;
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
