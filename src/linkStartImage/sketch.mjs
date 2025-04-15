import { Snake } from "./Snake.js";

const depth = 500;

/**
 * @type {import("p5").Image}
 */
let image;

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
  noStroke();

  snakeCount = depth / 25;
  snakes.length = 0;

  for (let i = 0; i < snakeCount; ++i) {
    snakes.push(
      new Snake(
        image,
        width / 2,
        height / 2,
        i * 10,
        5,
        (i + 1) * 10,
        5,
        0.25,
        0.25,
        0.25,
        0.2,
        1,
        0.2,
        (60 * 60) / 15
      )
    );
  }
};

function preload() {
  image = loadImage("https://i.imgur.com/j8r6kQt.jpeg");
}

function setup() {
  init();
}

function draw() {
  translate(-width / 2, -height / 2);

  for (let i = 0; i < snakeCount; ++i) {
    snakes[i].update(width, height, depth);
    snakes[i].draw(width, height);
  }
}

function windowResized() {
  init();
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
