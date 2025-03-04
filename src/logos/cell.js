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
   * Current state of cell.
   * @type {number}
   */
  state;

  /**
   * Age of the cell. Ranges from 0 to 255.
   * @type {number}
   */
  age = 0;

  /**
   * Whether the cell is currently aging.
   * @type {boolean}
   */
  aging = false;

  /**
   * Color of the cell when alive.
   * @type {import('p5').Color}
   */
  aliveColor;

  /**
   * Color values of the cell when dead.
   * @type {{r: number, g: number, b: number}}
   */
  deadColor;

  /**
   * Amount to increase the age by each frame.
   * @type {number}
   */
  deltaAge = 24;

  /**
   * Creates a new cell with entered data.
   * @param {number} x X position of the cell.
   * @param {number} y Y position of the cell.
   * @param {number} width Width of the cell.
   * @param {number} height Height of the cell.
   * @param {number} state Starting state of the cell.
   * @param {import('p5').Color} aliveColor Color of the cell when alive.
   * @param {{r: number, g: number, b: number}} deadColor Color of the cell when dead.
   */
  constructor(x, y, width, height, state, aliveColor, deadColor) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.state = state;
    this.age = 0;
    this.aging = false;
    this.aliveColor = aliveColor;
    this.deadColor = deadColor;
  }

  /**
   * Updates the cell's logic. Runs game of life rules and starts aging when it dies.
   * @param {Cell[]} neighbors List of neighboring cells.
   */
  update(neighbors) {
    const aliveNeighbors = neighbors.filter(
      (neighbor) => neighbor.state === 1
    ).length;

    if (this.state === 1) {
      if (aliveNeighbors < 2 || aliveNeighbors > 3) {
        this.state = 0;
        this.age = 0;
        this.aging = true;
      }
    } else {
      if (aliveNeighbors === 3) {
        this.state = 1;
        this.aging = false;
      }
    }

    if (this.aging) {
      this.age += this.deltaAge;
      if (this.age >= 255) {
        this.aging = false;
      }
    }
  }

  /**
   * Draws the cell to the screen. Draws alive color when alive, otherwise the dead color subtracted by age to fade to black.
   */
  draw() {
    let currentColor;

    if (this.state === 1) {
      currentColor = color(this.aliveColor);
    } else {
      currentColor = color(
        this.deadColor.r - this.age,
        this.deadColor.g - this.age,
        this.deadColor.b - this.age
      );
    }

    fill(currentColor);

    rect(this.x, this.y, this.width, this.height);
  }
}
