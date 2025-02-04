import { Position } from "../utils/Position.js";

/**
 * @type {import("p5").Image}
 */
let sketchBackground;

/**
 * @type {number[][]}
 */
let field = [];

/**
 * @type {number}
 */
let cellCount;

/**
 * @type {number}
 */
let xGap;

/**
 * @type {number}
 */
let yGap;

/**
 * @type {Position[]}
 */
let grains = [];

/**
 * @type {Number}
 */
const grainCount = 4000;

const init = () => {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  //#region Flow Field
  field.length = 0;
  cellCount = 100;
  xGap = width / cellCount;
  yGap = height / cellCount;

  for (let x = 0, i = 0; x < width; x += xGap) {
    field.push([]);
    for (let y = 0; y < height; y += yGap) {
      const angle = noise(x, y) * cos(width + x) * sin(height + y) * random(90);
      field[i].push(angle);
    }
    i++;
  }
  //#endregion

  //#region Grain setup
  grains.length = 0;
  for (let i = 0; i < grainCount; ++i) {
    grains.push(new Position(random(0, width + 1), random(0, height + 1)));
  }
  //#endregion

  noStroke();
};

function preload() {
  sketchBackground = loadImage("https://i.imgur.com/H3oshrE.jpeg");
}

function setup() {
  init();
}

function draw() {
  background(0, 75 / 6);

  for (let i = 0; i < grainCount; ++i) {
    const mappedX = map(grains[i].x, 0, width, 0, sketchBackground.width);
    const mappedY = map(grains[i].y, 0, height, 0, sketchBackground.height);

    fill(sketchBackground.get(mappedX, mappedY));

    square(grains[i].x, grains[i].y, 1);

    const angle =
      field[Math.trunc(grains[i].x) % cellCount][
        Math.trunc(grains[i].y) % cellCount
      ];

    grains[i].x += cos(angle);
    grains[i].y += sin(angle);

    if (grains[i].x > width) grains[i].x -= width;
    if (grains[i].x < 0) grains[i].x += width;
    if (grains[i].y > height) grains[i].y -= height;
    if (grains[i].y < 0) grains[i].y += height;
  }
}

function windowResized() {
  init();
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
