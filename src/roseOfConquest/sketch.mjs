import { Cell } from "./cell";

//#region Cell fields
/**
 * Number of cells along the X axis.
 * @type {number}
 */
const xCount = 100;

/**
 * Number of cells along the Y Axis.
 * @type {number}
 */
const yCount = 100;

/**
 * 2D Array of Cells.
 * @type {Cell[][]}
 */
const cells = [];

const neighborXRange = 2;

const neighborYRange = 6;
//#endregion

//#region Color fields
const hueData = { min: 0, max: 360, offset: 45 };
const saturationData = { min: 45, max: 75, offset: 10 };
const lightnessData = { min: 65, max: 70, offset: 15 };

/**
 * Top side color
 * @type {import("p5").Color}
 */
let colorT;

/**
 * Bottom side color
 * @type {import("p5").Color}
 */
let colorB;
//#endregion

const init = () => {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  colorMode(HSL);

  //#region Colors
  const hue = random(hueData.min, hueData.max);
  const saturation = random(saturationData.min, saturationData.max);
  const lightness = random(lightnessData.min, lightnessData.max);

  colorT = color(
    hue + hueData.offset,
    saturation + random(-saturationData.offset, saturationData.offset),
    lightness + random(-lightnessData.offset, lightnessData.offset)
  );
  colorB = color(
    hue - hueData.offset,
    saturation + random(-saturationData.offset, saturationData.offset),
    lightness + random(-lightnessData.offset, lightnessData.offset)
  );
  //#endregion

  //#region Cell code
  const cellWidth = windowWidth / xCount;
  const cellHeight = windowHeight / yCount;

  cells.length = 0;

  for (let i = 0; i < xCount; ++i) {
    cells.push([]);
    for (let j = 0; j < yCount; ++j) {
      const x = i * cellWidth;
      const y = j * cellHeight;

      cells[i].push(
        new Cell(x, y, cellWidth, cellHeight, y <= height / 2 ? 0 : 1)
      );
    }
  }

  for (let i = 0; i < xCount; ++i) {
    for (let j = 0; j < yCount; ++j) {
      cells[i][j].draw(colorT, colorB);
    }
  }
  //#endregion
};

/**
 * Gets list of neighbors to requested cell.
 * @param {number} i X coordinate in array.
 * @param {number} j Y coordinate in array.
 * @returns {Cell[]} Array of neighbors
 */
const getNeighbors = (i, j) => {
  const neighbors = [];

  for (let x = -neighborXRange; x <= neighborXRange; x++) {
    for (let y = -neighborYRange; y <= neighborYRange; y++) {
      if (x === 0 && y === 0) continue;
      const ni = i + x;
      const nj = j + y;
      if (ni >= 0 && ni < xCount && nj >= 0 && nj < yCount) {
        neighbors.push(cells[ni][nj]);
      }
    }
  }

  return neighbors;
};

function setup() {
  init();
}

function draw() {
  if (frameCount % 2 === 0) {
    for (let i = 0; i < xCount; ++i) {
      for (let j = 0; j < yCount; ++j) {
        cells[i][j].update(getNeighbors(i, j));
      }
    }
  }

  for (let i = 0; i < xCount; ++i) {
    for (let j = 0; j < yCount; ++j) {
      cells[i][j].draw(colorT, colorB);
    }
  }
}

function windowResized() {
  init();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
