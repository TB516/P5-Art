export class Fruit {
  x;
  y;
  size;
  isCollected;

  /**
   * Creates new fruit object
   * @param {number} x X pos
   * @param {number} y Y pos
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.isBeingCarried = false;
    this.isCollected = false;
  }

  collectedTrigger() {
    this.isCollected = true;

    setTimeout(() => {
      this.isCollected = false;
    }, 10000);
  }

  draw() {
    if (this.isCollected) return;

    fill(255, 0, 0);
    circle(this.x, this.y, this.size);
  }
}
