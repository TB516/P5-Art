import { Vector3 } from "../utils/Vector3.js";
import { FloatingCube } from "./FloatingCube.js";

/**
 * @type {FloatingCube[][]}
 */
const grid = [];

/**
 * @type {Vector3[]}
 */
const lights = [];

const lightHeight = 100;

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

  lights.length = 0;
  grid.length = 0;

  lights.push(new Vector3(0, 0, lightHeight));
  lights.push(new Vector3(-width, 0, lightHeight));
  lights.push(new Vector3(width, 0, lightHeight));
  lights.push(new Vector3(0, -height, lightHeight));
  lights.push(new Vector3(0, height, lightHeight));

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

const moveLights = () => {
  const lightDeltaX = cos(noise(lights[0].x, lights[0].y, frameCount));
  const lightDeltaY = sin(noise(lights[0].x, lights[0].y, frameCount));

  lights[0].x += lightDeltaX;
  lights[0].y += lightDeltaY;

  if (lights[0].x > width) lights[0].x -= width;
  if (lights[0].x < -width) lights[0].x += width;
  if (lights[0].y > height) lights[0].y -= height;
  if (lights[0].y < -height) lights[0].y += height;

  for (let i = 1; i < lights.length; ++i) {
    const mirrorX = lights[0].x;
    const mirrorY = lights[0].y;

    lights[i].x =
      i === 1 ? mirrorX - width : i === 2 ? mirrorX + width : mirrorX;
    lights[i].y =
      i === 3 ? mirrorY - height : i === 4 ? mirrorY + height : mirrorY;
  }
};

function setup() {
  init();
}

function draw() {
  background(0);

  lightFalloff(2.5, 0, 0);

  for (let i = 0; i < lights.length; ++i) {
    pointLight(
      0,
      255 - lerp(0, 230, sin(frameCount / 600)),
      0,
      lights[i].x - width / 2,
      lights[i].y - height / 2,
      lights[i].z
    );
  }

  moveLights();

  for (let i = 0; i < gridWidth; ++i) {
    for (let j = 0; j < gridHeight; ++j) {
      grid[i][j].update(lights);
    }
  }

  translate(-width / 2, -height / 2);

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
