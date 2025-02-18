import { Cell } from "./cell";

//#region Cell fields
/**
 * Number of cells along the X axis.
 * @type {number}
 */
const xCount = 30;

/**
 * Number of cells along the Y Axis.
 * @type {number}
 */
const yCount = 30;

/**
 * 2D Array of Cells.
 * @type {Cell[][]}
 */
const cells = [];
//#endregion

//#region Color fields
const hueData = { min: 0, max: 360, offset: 90 };
const saturationData = { min: 55, max: 75, offset: 15 };
const lightnessData = { min: 55, max: 70, offset: 0 };

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
  const cellWidth = Math.trunc(windowWidth / xCount);
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
      cells[i][j].update(null, colorT, colorB);
    }
  }

  for (let i = 0; i < xCount; ++i) {
    for (let j = 0; j < yCount; ++j) {
      cells[i][j].draw();
    }
  }
  //#endregion
};

function setup() {
  init();
}

function draw() {
  if (frameCount % 20 === 0) {
    for (let i = 0; i < xCount; ++i) {
      for (let j = 0; j < yCount; ++j) {
        // cells[i][j].update(cells[i][j].state === 0 ? colorT : colorB);
      }
    }
  }

  if (frameCount % 60 === 0) {
    for (let i = 0; i < xCount; ++i) {
      for (let j = 0; j < yCount; ++j) {
        cells[i][j].draw();
      }
    }
  }
}

function windowResized() {
  init();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
