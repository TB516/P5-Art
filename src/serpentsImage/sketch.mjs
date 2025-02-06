import { Snake } from "./Snake.js";

/**
 * @type {import("p5").Image[]}
 */
const images = [];

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
const duration = 180;

/**
 * Number of snakes in the sketch.
 * @type {number}
 */
let snakeCount;

/**
 * Index of image to render.
 * @type {number}
 */
let imageIndex = 0;

/**
 * Initializes the sketch variables and sets canvas size with the currently selected image.
 */
const init = () => {
  createCanvas(windowWidth, windowHeight);
  background(0);

  frameCount = 0;
  frameRate(framerate);

  snakeCount = 20;
  snakes.length = 0;

  for (let i = 0; i < snakeCount; ++i) {
    snakes.push(
      new Snake(
        images[imageIndex],
        width / 2,
        height / 2,
        15,
        20,
        2,
        1,
        (duration * framerate) / 15
      )
    );
  }

  noStroke();
};

const reSeededInit = () => {
  randomSeed(Date.now());
  noiseSeed(Date.now());

  let newIndex = Math.trunc(random(images.length));

  while (imageIndex === newIndex) {
    newIndex = Math.trunc(random(images.length));
  }

  imageIndex = newIndex;

  init();
};

function preload() {
  //Amh Araeng
  images.push(loadImage("https://i.imgur.com/kjFVmJL.jpeg"));
  //Lakeland
  images.push(loadImage("https://i.imgur.com/j8r6kQt.jpeg"));
  //Amaurot
  images.push(loadImage("https://i.imgur.com/U7S4PZg.jpeg"));
  //Ishgard
  images.push(loadImage("https://i.imgur.com/3jK1dJv.jpeg"));
  //Lochs
  images.push(loadImage("https://i.imgur.com/Bfda37i.jpeg"));
}

/**
 * Setup function called when page is first loaded.
 */
function setup() {
  imageIndex = Math.trunc(random(images.length));
  init();
}

/**
 * Updates and draws one frame of the sketch.
 */
function draw() {
  for (let i = 0; i < snakeCount; ++i) {
    snakes[i].update(frameCount, width, height);
    snakes[i].draw(width, height);
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

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
