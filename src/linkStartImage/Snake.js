import { Cube } from "../utils/Cube.js";
import { Vector3 } from "../utils/Vector3.js";

export class Snake {
  /**
   * @type {import("p5").Image}
   * @readonly
   */
  image;
  /**
   * @type {Cube}
   * @readonly
   */
  body;
  /**
   * Minimum size of the snake.
   * @type {Vector3}
   * @readonly
   */
  minSize;
  /**
   * Size to change the snake by.
   * @type {Vector3}
   * @readonly
   */
  deltaSize;
  /**
   * Time to shrink the snake by delta size.
   * @type {number}
   * @readonly
   */
  shrinkTime;
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
   * Creates a new snake with the entered parameters.
   * @param {import("p5").Image} image Image for background
   * @param {number} startingX Starting X position.
   * @param {number} startingY Starting Y position.
   * @param {number} startingZ Starting Z position.
   * @param {number} bodyLength Length of the snake head.
   * @param {number} bodyWidth Width of the snake head.
   * @param {number} bodyHeight Height of the snake head.
   * @param {number} minBodyLength Min length.
   * @param {number} minBodyWidth Min width.
   * @param {number} minBodyHeight Min height.
   * @param {number} deltaBodyLength Delta length.
   * @param {number} deltaBodyWidth Delta width.
   * @param {number} deltaBodyHeight Delta height.
   * @param {number} [shrinkTime] Number of frames it takes for the body to shrink one size. Default of 60.
   * @param {number} [noiseScale] Noise scale.
   * @param {number} [gaussianMean] Most common random offset value.
   * @param {number} [gaussianSd] Common range of random offset value.
   */
  constructor(
    image,
    startingX,
    startingY,
    startingZ,
    bodyLength,
    bodyWidth,
    bodyHeight,
    minBodyLength,
    minBodyWidth,
    minBodyHeight,
    deltaBodyLength,
    deltaBodyWidth,
    deltaBodyHeight,
    shrinkTime,
    noiseScale = 100,
    gaussianMean = 0,
    gaussianSd = 10
  ) {
    this.image = image;

    this.body = new Cube(
      startingX,
      startingY,
      startingZ,
      bodyLength,
      bodyWidth,
      bodyHeight
    );

    this.minSize = new Vector3(minBodyLength, minBodyWidth, minBodyHeight);
    this.deltaSize = new Vector3(
      deltaBodyLength,
      deltaBodyWidth,
      deltaBodyHeight
    );

    this.shrinkTime = shrinkTime;

    this.noiseScale = noiseScale;
    this.gaussianMean = gaussianMean;
    this.gaussianSd = gaussianSd;
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

    if (
      frameCount % this.shrinkTime === 0 &&
      this.body.length - this.deltaSize.x >= this.minSize.x
    ) {
      this.body.length -= this.deltaSize.x;
    }

    if (
      frameCount % this.shrinkTime === 0 &&
      this.body.width - this.deltaSize.z >= this.minSize.z
    ) {
      this.body.width -= this.deltaSize.z;
    }

    if (
      frameCount % this.shrinkTime === 0 &&
      this.body.height - this.deltaSize.y >= this.minSize.y
    ) {
      this.body.height -= this.deltaSize.y;
    }
  }

  /**
   * Draws the snake.
   * @param {number} canvasWidth Width of the canvas.
   * @param {number} canvasHeight Height of the canvas.
   */
  draw(canvasWidth, canvasHeight) {
    push();
    const mappedX = map(
      this.body.position.x,
      0,
      canvasWidth,
      0,
      this.image.width
    );
    const mappedY = map(
      this.body.position.y,
      0,
      canvasHeight,
      0,
      this.image.height
    );

    fill(this.image.get(mappedX, mappedY));

    translate(
      this.body.position.x + this.body.length / 2,
      this.body.position.y + this.body.height / 2,
      this.body.position.z + this.body.width / 2
    );

    box(this.body.length, this.body.height, this.body.width);
    pop();
  }
}
