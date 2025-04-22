import { Vector3 } from "./Vector3.js";

export class Sphere {
  /**
   * @type {Vector3}
   */
  position;

  /**
   * @type {number}
   */
  size;

  /**
   * Creates a sphere.
   * @param {number} startingX Starting x pos.
   * @param {number} startingY Starting y pos.
   * @param {number} startingZ Starting z pos.
   * @param {number} size Size of the sphere.
   */
  constructor(startingX, startingY, startingZ, size) {
    this.position = new Vector3(startingX, startingY, startingZ);
    this.size = size;
  }
}
