import { Snake } from "./Snake.js";

/**
 * @type {Snake}
 */
let snake = new Snake(0, 0, 1);

const init = () => {
  snake = new Snake(windowWidth / 2, windowHeight / 2, 15);

  createCanvas(windowWidth, windowHeight);
  background(255);
  colorMode(HSB, 360, 100, 100);
};

function setup() {
  init();
}

function draw() {
  snake.update(frameCount, width, height);
  snake.draw(frameCount);
}

function windowResized() {
  init();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
