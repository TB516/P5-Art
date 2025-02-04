import { Position } from "../utils/Position.js";

/**
 * @typedef {import("p5").Image} Image
 */

export class Snake {
  /**
   * Image containing colors of snake.
   * @type {Image}
   * @readonly
   */
  background;
  /**
   * List of snake body positions.
   * @type {Position[]}
   * @readonly
   */
  body;
  /**
   * Number of body cells in the snake.
   * @type {number}
   * @readonly
   */
  bodyLength;
  /**
   * Current size of the body.
   * @type {number}
   */
  bodySize;
  /**
   * Minimum size of the snake.
   * @type {number}
   * @readonly
   */
  minSize;
  /**
   * Size to change the snake by.
   * @type {number}
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
   * Value to scale non color perlin noise by.
   * @type {number}
   * @readonly
   */
  noiseScale;
  /**
   * Mean value for gaussian random.
   * @type {number}
   * @readonly
   */
  gaussianMean;
  /**
   * Standard deviation for gaussian random.
   * @type {number}
   * @readonly
   */
  gaussianSd;
  /**
   * Value to scale the color perlin noise by.
   * @type {number}
   * @readonly
   */
  hueScale;

  /**
   * Creates a new snake with the requested parameters.
   * @param {Image} image Image containing background colors.
   * @param {number} startingX Starting X position of snake.
   * @param {number} startingY Starting Y position if snake.
   * @param {number} bodyLength Number of body pieces snake will have.
   * @param {number} [startingSize] Size of snake body pieces when program starts. Default of 25.
   * @param {number} [minSize] Minimum size of the snake if shrinking is active. Default of 2.
   * @param {number} [deltaSize] Change in snake size after shrink time has elapsed. Default of 0.
   * @param {number} [shrinkTime] Number of frames it takes for the body to shrink one size. Default of 60.
   * @param {number} [noiseScale] Scale value for perlin noise. Default of 100.
   * @param {number} [gaussianMean] Mean of gausian random. Default of 0.
   * @param {number} [gaussianSd] Standard deviation of gausian random. Default of 10.
   * @param {number} [hueScale] Value hue is scaled by. Default of 360.
   */
  constructor(
    image,
    startingX,
    startingY,
    bodyLength,
    startingSize = 25,
    minSize = 2,
    deltaSize = 0,
    shrinkTime = 60,
    noiseScale = 100,
    gaussianMean = 0,
    gaussianSd = 10,
    hueScale = 360
  ) {
    this.background = image;
    this.bodyLength = bodyLength;
    this.bodySize = startingSize;
    this.deltaSize = deltaSize;
    this.minSize = minSize;
    this.shrinkTime = shrinkTime;
    this.noiseScale = noiseScale;
    this.gaussianMean = gaussianMean;
    this.gaussianSd = gaussianSd;
    this.hueScale = hueScale;

    this.body = [];

    for (let i = 0; i < bodyLength; ++i) {
      this.body.push(new Position(startingX, startingY));
    }
  }

  /**
   * Updates snake position.
   * @param {number} frameCount Current frame count of sketch.
   * @param {number} canvasWidth Width of canvas.
   * @param {number} canvasHeight Height of canvas.
   */
  update(frameCount, canvasWidth, canvasHeight) {
    let posStorage = new Position(this.body[0].x, this.body[0].y);

    //#region Head
    this.body[0].x +=
      noise(
        this.body[0].x / this.noiseScale,
        this.body[0].y / this.noiseScale,
        frameCount
      ) +
      1 * randomGaussian(this.gaussianMean, this.gaussianSd);

    this.body[0].y +=
      noise(
        this.body[0].x / this.noiseScale,
        this.body[0].y / this.noiseScale,
        frameCount * 1000
      ) +
      1 * randomGaussian(this.gaussianMean, this.gaussianSd);

    if (this.body[0].x > canvasWidth) this.body[0].x -= canvasWidth;
    if (this.body[0].x < 0) this.body[0].x += canvasWidth;
    if (this.body[0].y > canvasHeight) this.body[0].y -= canvasHeight;
    if (this.body[0].y < 0) this.body[0].y += canvasHeight;
    //#endregion

    //#region Update tail position
    for (let i = 1; i < this.bodyLength; ++i) {
      const posStorage2 = new Position(this.body[i].x, this.body[i].y);

      this.body[i].x =
        posStorage.x + randomGaussian(this.gaussianMean, this.gaussianSd);
      this.body[i].y =
        posStorage.y + randomGaussian(this.gaussianMean, this.gaussianSd);

      posStorage.x = posStorage2.x;
      posStorage.y = posStorage2.y;
    }
    //#endregion

    //Shrink snake
    if (
      frameCount % this.shrinkTime === 0 &&
      this.bodySize - this.deltaSize >= this.minSize
    ) {
      this.bodySize -= this.deltaSize;
    }
  }

  /**
   * Draws the snake to the screen.
   * @param {number} canvasWidth Width of canvas.
   * @param {number} canvasHeight Height of canvas.
   */
  draw(canvasWidth, canvasHeight) {
    for (let i = 0; i < this.bodyLength; ++i) {
      const mappedX = map(
        this.body[i].x,
        0,
        canvasWidth,
        0,
        this.background.width
      );
      const mappedY = map(
        this.body[i].y,
        0,
        canvasHeight,
        0,
        this.background.height
      );

      fill(this.background.get(mappedX, mappedY));

      square(this.body[i].x, this.body[i].y, this.bodySize);
    }
  }
}
