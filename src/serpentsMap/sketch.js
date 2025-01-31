import { Snake } from "./Snake.js";

/**
 * @type {Snake[]}
 */
const snakes = [];

/**
 * Framerate of sim
 * @type {number}
 */
const framerate = 60;

/**
 * Time in seconds until reset
 * @type {number}
 */
const duration = 180;

/**
 * @type {number}
 */
let snakeCount;

const init = () => {
  createCanvas(windowWidth, windowHeight);
  background(255);
  colorMode(HSB, 360, 100, 100);

  frameRate(framerate);

  snakeCount = 100;
  snakes.length = 0;
  for (let i = 0; i < snakeCount; ++i) {
    snakes.push(new Snake(width / 2, height / 2, 15, 26, 2, framerate * 10));
  }

  noStroke();
};

function setup() {
  init();
}

function draw() {
  for (let i = 0; i < snakeCount; ++i) {
    snakes[i].update(frameCount, width, height);
    snakes[i].draw();
  }

  if (frameCount % (duration * framerate) == 0) {
    init();
  }
}

function windowResized() {
  init();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
