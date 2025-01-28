import { Snake } from "./Snake.js";

const WINDOW_SKETCH = false;

let canvasWidth, canvasHeight;
let snake = new Snake(0, 0, 1);

const init = () => {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;

  if (WINDOW_SKETCH) {
    canvasWidth = 390;
    canvasHeight = 1215;
  }

  snake = new Snake(canvasWidth / 2, canvasHeight / 2, 15);

  createCanvas(canvasWidth, canvasHeight);
  background(255);
  colorMode(HSB, 360, 100, 100);
};

function setup() {
  init();
}

function draw() {
  snake.update(frameCount, canvasWidth, canvasHeight);
  snake.draw(frameCount);
}

function windowResized() {
  init();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
