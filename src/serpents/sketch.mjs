import { Snake } from "./Snake.js";

/**
 * @type {Snake[]}
 */
const snakes = [];

/**
 * @type {number}
 */
let snakeCount;

const init = () => {
  createCanvas(windowWidth, windowHeight);
  background(255);
  colorMode(HSB, 360, 100, 100);

  strokeWeight(Math.min(width / 500, 1.6));

  snakeCount = Math.ceil(height / 150);
  snakes.length = 0;
  for (let i = 0; i < snakeCount; ++i) {
    snakes.push(new Snake(width / 2, height / 2, 15, Math.min(width / 30, 20)));
  }
};

function setup() {
  init();
}

function draw() {
  for (let i = 0; i < snakeCount; ++i) {
    snakes[i].update(frameCount, width, height);
    snakes[i].draw(frameCount);
  }
}

function windowResized() {
  init();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
