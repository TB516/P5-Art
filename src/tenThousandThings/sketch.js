const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const MAX_CIRCLES = 10000;
const BACKGROUND_COLOR = color(200, 170, 220);
const BLACK = color(0, 0, 0);

let numCircles = 0;
let drawingStep = stepForward;

const drawRandCircle = () => {
  const diameter = random(25, 51);

  circle(
    random(diameter / 2, CANVAS_WIDTH - diameter / 2 + 1),
    random(diameter / 2, CANVAS_HEIGHT - diameter / 2 + 1),
    diameter
  );
};

function stepForward() {
  fill(random(0, 255));
  stroke(BLACK);

  numCircles += 1;
  drawRandCircle();

  if (numCircles === MAX_CIRCLES) {
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
