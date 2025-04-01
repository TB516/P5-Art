import { Cell } from "./cell.js";

const framerate = 24;

//#region Cell fields
/**
 * Number of cells along the X axis.
 * @type {number}
 */
const xCount = 150;

/**
 * Number of cells along the Y Axis.
 * @type {number}
 */
const yCount = 150;

/**
 * 2D Array of Cells.
 * @type {Cell[][]}
 */
const cells = [];
//#endregion

/**
 * Gets list of neighbors to requested cell.
 * @param {number} i X coordinate in array.
 * @param {number} j Y coordinate in array.
 * @returns {Cell[]} Array of neighbors
 */
const getNeighbors = (i, j) => {
  const neighbors = [];

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
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

const init = () => {
  createCanvas(windowWidth, windowHeight);
  frameRate(framerate);
  background(0);
  noStroke();

  const cellWidth = windowWidth / xCount;
  const cellHeight = windowHeight / yCount;

  cells.length = 0;

  for (let i = 0; i < xCount; ++i) {
    cells.push([]);
    for (let j = 0; j < yCount; ++j) {
      const x = i * cellWidth;
      const y = j * cellHeight;

      cells[i].push(
        new Cell(
          x,
          y,
          cellWidth,
          cellHeight,
          Math.trunc(random(0, 100)) <= 5 ? 1 : 0,
          color(182, 0, 178),
          {
            r: 128,
            g: 23,
            b: 152,
          }
        )
      );
    }
  }

  for (let i = 0; i < xCount; ++i) {
    for (let j = 0; j < yCount; ++j) {
      const x = i * cellWidth;
      const y = j * cellHeight;

      cells[i][j].setNeighbors(getNeighbors(i, j));
    }
  }
};

function setup() {
  init();
}

function draw() {
  for (let i = 0; i < xCount; ++i) {
    for (let j = 0; j < yCount; ++j) {
      cells[i][j].update();
    }
  }

  for (let i = 0; i < xCount; ++i) {
    for (let j = 0; j < yCount; ++j) {
      cells[i][j].draw();
    }
  }
}

function windowResized() {
  init();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
