import { Vector3 } from "./Vector3.js";

export class Cube {
  /**
   * @type {Vector3}
   */
  position;

  /**
   * @type {number}
   */
  length;

  /**
   * @type {number}
   */
  width;

  /**
   * @type {number}
   */
  height;

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
    this.position = new Vector3(x, y, z);
    this.length = length;
    this.width = width;
    this.height = height;
  }
}
