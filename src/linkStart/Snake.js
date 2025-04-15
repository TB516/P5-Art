import { Cube } from "../utils/Cube.js";

export class Snake {
  /**
   * @type {Cube}
   * @readonly
   */
  body;
  /**
   * @type {number}
   * @readonly
   */
  noiseScale;
  /**
   * @type {number}
   * @readonly
   */
  gaussianMean;
  /**
   * @type {number}
   * @readonly
   */
  gaussianSd;
  /**
   * @type {number}
   * @readonly
   */
  hueScale;

  /**
   * Creates a new snake with the entered parameters.
   * @param {number} startingX Starting X position.
   * @param {number} startingY Starting Y position.
   * @param {number} startingZ Starting Z position.
   * @param {number} bodyLength Length of the snake head.
   * @param {number} bodyWidth Width of the snake head.
   * @param {number} bodyHeight Height of the snake head.
   * @param {number} [noiseScale=100] Noise scale.
   * @param {number} [gaussianMean=0] Most common random offset value.
   * @param {number} [gaussianSd=10] Common range of random offset value.
   * @param {number} [hueScale=360] Scale for the hue.
   */
  constructor(
    startingX,
    startingY,
    startingZ,
    bodyLength,
    bodyWidth,
    bodyHeight,
    noiseScale = 100,
    gaussianMean = 0,
    gaussianSd = 10,
    hueScale = 360
  ) {
    this.body = new Cube(
      startingX,
      startingY,
      startingZ,
      bodyLength,
      bodyWidth,
      bodyHeight
    );

    this.noiseScale = noiseScale;
    this.gaussianMean = gaussianMean;
    this.gaussianSd = gaussianSd;
    this.hueScale = hueScale;
  }

  /**
   * Updates snake's position.
   * @param {number} canvasWidth Width of canvas.
   * @param {number} canvasHeight Height of canvas.
   * @param {number} canvasDepth Depth of canvas.
   */
  update(canvasWidth, canvasHeight, canvasDepth) {
    this.body.position.x +=
      noise(
        this.body.position.x / this.noiseScale,
        this.body.position.y / this.noiseScale,
        this.body.position.z / this.noiseScale
      ) +
      1 * randomGaussian(this.gaussianMean, this.gaussianSd);

    this.body.position.y +=
      noise(
        this.body.position.x / this.noiseScale,
        this.body.position.y / this.noiseScale,
        this.body.position.z / this.noiseScale
      ) +
      1 * randomGaussian(this.gaussianMean, this.gaussianSd);

    if (this.body.position.x > canvasWidth) this.body.position.x -= canvasWidth;
    if (this.body.position.x < 0) this.body.position.x += canvasWidth;
    if (this.body.position.y > canvasHeight)
      this.body.position.y -= canvasHeight;
    if (this.body.position.y < 0) this.body.position.y += canvasHeight;
  }

  /**
   * Draws the snake.
   */
  draw() {
    push();
    fill(
      noise(
        this.body.position.x / this.noiseScale,
        this.body.position.y / this.noiseScale
      ) * this.hueScale,
      100,
      100
    );

    translate(
      this.body.position.x + this.body.length / 2,
      this.body.position.y + this.body.height / 2,
      this.body.position.z + this.body.width / 2
    );

    box(this.body.length, this.body.height, this.body.width);
    pop();
  }
}
