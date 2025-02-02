import { Snake } from "./Snake.js";

/**
 * List of snakes in the sketch.
 * @type {Snake[]}
 */
const snakes = [];

/**
 * Target framerate of sketch.
 * @type {number}
 */
const framerate = 60;

/**
 * Time in seconds until reset.
 * @type {number}
 */
const duration = 60;

/**
 * Number of snakes in the sketch.
 * @type {number}
 */
let snakeCount;

/**
 * Initializes the sketch variables and sets canvas size.
 */
const init = () => {
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(HSB, 360, 100, 100);

  frameCount = 0;
  frameRate(framerate);

  snakeCount = 100;
  snakes.length = 0;

  for (let i = 0; i < snakeCount; ++i) {
    snakes.push(
      new Snake(
        width / 2,
        height / 2,
        15,
        8,
        1,
        -1,
        1,
        1,
        duration * framerate * (3 / 5)
      )
    );
  }

  noStroke();
};

/**
 * Re-randomizes seeds then calls init.
 */
const reSeededInit = () => {
  randomSeed(Date.now());
  noiseSeed(Date.now());

  init();
};

/**
 * Setup function called when page is first loaded.
 */
function setup() {
  init();
}

/**
 * Updates and draws one frame of the sketch.
 */
function draw() {
  for (let i = 0; i < snakeCount; ++i) {
    snakes[i].update(frameCount, width, height);
    snakes[i].draw();
  }

  if (frameCount % (duration * framerate) == 0) {
    reSeededInit();
  }
}

/**
 * Re-initializes the sketch when the window is resized.
 */
function windowResized() {
  init();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
