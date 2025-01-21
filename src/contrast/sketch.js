const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const MAX_CIRCLES = 1000;
const BLACK = color(0, 0, 0);

let BACKGROUND_COLOR = color(200, 170, 220);
let numCircles = 0;
let drawingStep = stepForward;

const drawRandCircle = () => {
  const diameter = random(25, 51);

  circle(random(0, CANVAS_WIDTH + 1), random(0, CANVAS_HEIGHT + 1), diameter);
};

function stepForward() {
  fill(random(0, 255));
  stroke(BLACK);

  numCircles += 1;
  drawRandCircle();

  if (numCircles === MAX_CIRCLES) {
    BACKGROUND_COLOR = color(random(0, 255), random(0, 255), random(0, 255));
    drawingStep = stepBackward;
  }
}

function stepBackward() {
  fill(BACKGROUND_COLOR);
  stroke(BACKGROUND_COLOR);

  numCircles -= 1;
  drawRandCircle();

  if (numCircles === 0) {
    drawingStep = stepForward;
  }
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(BACKGROUND_COLOR);
}

function draw() {
  drawingStep();
}

setup();
draw();
