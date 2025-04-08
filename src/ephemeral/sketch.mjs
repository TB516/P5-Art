import { Vector3 } from "../utils/Vector3.js";
import { FloatingCube } from "./FloatingCube.js";

/**
 * @type {FloatingCube[][]}
 */
const grid = [];

/**
 * @type {Vector3}
 */
const lightPos = new Vector3(0, 0, 100);

const gridWidth = 50;
const gridHeight = 50;

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

  xSize = width / gridWidth;
  ySize = height / gridHeight;
  zSize = 100;

  let x = 0;
  let y = 0;

  for (let i = 0; i < gridWidth; ++i) {
    grid.push([]);
    for (let j = 0; j < gridHeight; ++j) {
      grid[i].push(new FloatingCube(x, y, 0, xSize, zSize, ySize));
      x += xSize;
    }
    x = 0;
    y += ySize;
  }
};

const moveLight = () => {};

function setup() {
  init();
}

function draw() {
  translate(-width / 2, -height / 2);

  pointLight(0, 255, 0, lightPos.x, lightPos.y, lightPos.z);

  moveLight();

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
