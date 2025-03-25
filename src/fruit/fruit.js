/**
 * @typedef {import("p5").Color} Color
 */

export class Fruit {
  x;
  y;
  size;
  color;

  /**
   * Creates new fruit object
   * @param {number} x X pos
   * @param {number} y Y pos
   * @param {Color} fruitColor color of fruit
   */
  constructor(x, y, fruitColor = color(255, 0, 0)) {
    this.x = x;
    this.y = y;
    this.size = 25;
    this.color = fruitColor;
  }

  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
