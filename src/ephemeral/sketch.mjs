import { FloatingCube } from "./FloatingCube.js";

/**
 * @type {FloatingCube[][]}
 */
const grid = [];

const gridWidth = 2;
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

  translate(-width / 2, -height / 2);

  xSize = width / gridWidth;
  ySize = height / gridHeight;
  zSize = 100;

  let x = 0;
  let y = 0;

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
  background(255, 0, 0);

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
