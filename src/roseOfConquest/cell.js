export class Cell {
  /**
   * X position of the cell.
   * @type {number}
   * @readonly
   */
  x;

  /**
   * Y position of the cell.
   * @type {number}
   * @readonly
   */
  y;

  /**
   * Width of the cell.
   * @type {number}
   * @readonly
   */
  width;

  /**
   * Height of the cell.
   * @type {number}
   * @readonly
   */
  height;

  /**
   * Current state (team) the cell is in.
   * @type {number}
   */
  state;

  /**
   * Creates a new cell with entered data.
   * @param {number} x X position of the cell.
   * @param {number} y Y position of the cell.
   * @param {number} width Width of the cell.
   * @param {number} height Height of the cell.
   * @param {number} state Starting alignment of the cell.
   */
  constructor(x, y, width, height, state) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.state = state;
  }

  /**
   * Updates the cell's state based on neighbors.
   * @param {Cell[]} neighbors List of neighboring cells.
   */
  update(neighbors) {
    let count1 = 0;
    let count0 = 0;

    for (let i = 0; i < neighbors.length; ++i) {
      if (neighbors[i].state === 1) {
        count1++;
      } else {
        count0++;
      }
    }

    const ratio1 = count1 / neighbors.length;
    const ratio0 = count0 / neighbors.length;

    const frontlineThreshold = 0.3;

    if (this.state === 1) {
      if (ratio0 > frontlineThreshold && random() < 0.2 + ratio0 * 0.3) {
        this.state = 0;
      }
    } else {
      if (ratio1 > frontlineThreshold && random() < 0.2 + ratio1 * 0.3) {
        this.state = 1;
      }
    }

    if (random() < 0.1 && ratio1 > ratio0 && this.state === 0) {
      this.state = 1;
    } else if (random() < 0.1 && ratio1 < ratio0 && this.state === 1) {
      this.state = 0;
    }
  }

  /**
   * Draws the cell to the screen.
   * @param {import("p5").Color} colorT Top color to draw.
   * @param {import("p5").Color} colorB Bottom color to draw.
   */
  draw(colorT, colorB) {
    fill(this.state === 1 ? colorT : colorB);
    rect(this.x, this.y, this.width, this.height);
  }
}
