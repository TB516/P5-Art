export class Cell {
  /**
   * X position of cell.
   * @type {number}
   */
  x;

  /**
   * Y position of cell.
   * @type {number}
   */
  y;

  /**
   * Width of cell.
   * @type {number}
   */
  width;

  /**
   * Height of cell.
   * @type {number}
   */
  height;

  /**
   * State of cell.
   * @type {number}
   */
  state;

  /**
   * Color of the cell.
   * @type {import("p5").Color}
   */
  color;

  /**
   * Creates a new cell with the entered position.
   * @param {number} x X position of cell.
   * @param {number} y Y position of cell.
   * @param {number} width Width of cell.
   * @param {number} height Height of cell.
   * @param {number} state Starting state of the cell.
   */
  constructor(x, y, width, height, state) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.state = state;
  }

  /**
   * Runs cell update logic.
   * @param {number[] | null} neighbors List of states of neighboring cells.
   * @param {import("p5").Color} colorT Top half color.
   * @param {import("p5").Color} colorB Bottom half color.
   */
  update(neighbors, colorT, colorB) {
    if (neighbors) {
    }

    this.color = lerpColor(colorT, colorB, this.state);
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, width, height);
  }
}
