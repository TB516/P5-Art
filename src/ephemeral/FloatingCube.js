import { Cube } from "../utils/Cube.js";
import { Vector3 } from "../utils/Vector3.js";

export class FloatingCube {
  /**
   * @type {Cube}
   */
  cube;

  /**
   * @type {number}
   */
  baseWidth;

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
    this.baseWidth = 1;
    this.cube = new Cube(x, y, z, length, width, height);
  }

  /**
   * Updates the height of the cube based on proximity to the light.
   * @param {Vector3[]} lights Light source positions
   */
  update(lights) {
    let totalWidth = this.baseWidth;

    for (const light of lights) {
      totalWidth += this.calculateWidthContribution(light);
    }

    this.cube.width = totalWidth;
  }

  /**
   * Calculates the width contribution of a single light source.
   * @param {Vector3} light Position of the light source
   * @returns {number} Width contribution from the light
   */
  calculateWidthContribution(light) {
    const distance = dist(
      this.cube.position.x,
      this.cube.position.y,
      light.x,
      light.y
    );

    const maxDist = light.z;
    const t = constrain(1 - distance / maxDist, 0, 1);
    return lerp(this.baseWidth, light.z, t);
  }

  draw() {
    push();
    translate(
      this.cube.position.x + this.cube.length / 2,
      this.cube.position.y + this.cube.height / 2,
      this.cube.position.z
    );
    box(this.cube.length, this.cube.height, this.cube.width);
    pop();
  }
}
