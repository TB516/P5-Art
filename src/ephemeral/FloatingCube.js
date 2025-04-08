import { Cube } from "../utils/Cube.js";

export class FloatingCube {
  /**
   * @type {Cube}
   */
  cube;

  /**
   * Creates a new cube with the given values.
   * @param {number} x X position.
   * @param {number} y Y position.
   * @param {number} z Z position.
   * @param {number} length Length of cube (X axis).
   * @param {number} width Width of cube (Z axis).
   * @param {number} height Height of cube (Y axis).
   */
  constructor(x, y, z, length, width, height) {
    this.cube = new Cube(x, y, z, length, width, height);
  }

  draw() {
    push();
    fill(0);
    translate(
      this.cube.position.x + this.cube.length / 2,
      this.cube.position.y + this.cube.height / 2,
      this.cube.position.z
    );
    box(this.cube.length, this.cube.height, this.cube.width);
    pop();
  }
}
