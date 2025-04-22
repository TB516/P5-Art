import { Sphere } from "../utils/Sphere.js";

export class FloatingSphere {
  /**
   * @type {Sphere}
   */
  sphere;

  /**
   * @type {number}
   */
  speed;

  /**
   * @type {number}
   */
  spacerX;

  /**
   * @type {number}
   */
  spacerY;

  /**
   * Creates a sphere stamp.
   * @param {number} startingX Starting x pos.
   * @param {number} startingY Starting y pos.
   * @param {number} startingZ Starting z pos.
   * @param {number} size Size of sphere.
   * @param {number} spacerX Min offset from mouse centerX.
   * @param {number} spacerY Min offset from mouse centerY.
   * @param {number} speed Speed sphere moves over a frame.
   */
  constructor(
    startingX,
    startingY,
    startingZ,
    size,
    spacerX,
    spacerY,
    speed = 0.5
  ) {
    this.sphere = new Sphere(startingX, startingY, startingZ, size);

    this.spacerX = spacerX;
    this.spacerY = spacerY;
    this.speed = speed;
  }

  /**
   * Moves sphere towards mouse pos.
   * @param {number} mouseX Mouse X pos.
   * @param {number} mouseY Mouse Y pos.
   * @param {number} dt Deltatime.
   */
  update(mouseX, mouseY, dt) {
    const targetX = mouseX + this.spacerX;
    const targetY = mouseY + this.spacerY;

    const directionX = targetX - this.sphere.position.x;
    const directionY = targetY - this.sphere.position.y;

    const distance = Math.sqrt(directionX ** 2 + directionY ** 2);

    if (distance > 0) {
      const moveX = (directionX / distance) * this.speed * dt;
      const moveY = (directionY / distance) * this.speed * dt;

      this.sphere.position.x +=
        Math.abs(moveX) < Math.abs(directionX) ? moveX : directionX;
      this.sphere.position.y +=
        Math.abs(moveY) < Math.abs(directionY) ? moveY : directionY;
    }
  }

  draw() {
    push();
    translate(
      this.sphere.position.x,
      this.sphere.position.y,
      this.sphere.position.z
    );

    sphere(this.sphere.size);
    pop();
  }
}
