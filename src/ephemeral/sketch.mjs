import { FloatingCube } from "./FloatingCube.js";

/**
 * @type {FloatingCube[][]}
 */
const grid = [];

const gridWidth = 1;
const gridHeight = 1;

/**
 * @type {number}
 */
let xSize;
/**
 * @type {number}
 */
let ySize;
/**
 * @type {number}
 */
let zSize;

const init = () => {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(255, 0, 0);

  xSize = width / gridWidth;
  ySize = height / gridHeight;
  zSize = 100;

  let x = -width / 2;
  let y = -height / 2;

  for (let i = 0; i < gridWidth; ++i) {
    grid.push([]);
    for (let j = 0; j < gridHeight; ++j) {
      grid[i].push(new FloatingCube(x, y, 0, xSize, zSize, ySize));
      y += ySize;
    }
    x += xSize;
  }
};

function setup() {
  init();
}

function draw() {
  point(0, 0);

  for (let i = 0; i < gridWidth; ++i) {
    for (let j = 0; j < gridHeight; ++j) {
      grid[i][j].draw();
    }
  }
}

function windowResized() {
  init();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
