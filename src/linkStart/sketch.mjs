import { Snake } from "./Snake.js";

const depth = 500;

/**
 * @type {Snake[]}
 */
const snakes = [];

/**
 * @type {number}
 */
let snakeCount;

const init = () => {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(255);
  colorMode(HSB, 360, 100, 100);

  strokeWeight(2);

  snakeCount = depth / 25;
  snakes.length = 0;

  for (let i = 0; i < snakeCount; ++i) {
    snakes.push(new Snake(width / 2, height / 2, i * 10, 15, (i + 1) * 10, 15));
  }
};

function setup() {
  init();
}

function draw() {
  translate(-width / 2, -height / 2);

  for (let i = 0; i < snakeCount; ++i) {
    snakes[i].update(width, height, depth);
    snakes[i].draw();
  }
}

function windowResized() {
  init();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
