import { Position } from "../utils/Position.js";

export class Snake {
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
   * Maximum value of random function for offsetting the body from the head.
   * @type {number}
   * @readonly
   */
  bodyOffsetMin;
  /**
   * Minimum value of random function for offsetting the body from the head.
   * @type {number}
   * @readonly
   */
  bodyOffsetMax;
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
   * @param {number} startingX Starting X position of snake.
   * @param {number} startingY Starting Y position if snake.
   * @param {number} bodyLength Number of body pieces snake will have.
   * @param {number} [startingSize] Size of snake body pieces when program starts. Default of 25.
   * @param {number} [bodyPosOffsetMax] Max range of random offset to snake body. Default of 1.
   * @param {number} [bodyPosOffsetMin] Min range of random offset to snake body. Default of -1.
   * @param {number} [minSize] Minimum size of the snake if shrinking is active. Default of 2.
   * @param {number} [deltaSize] Change in snake size after shrink time has elapsed. Default of 0.
   * @param {number} [shrinkTime] Number of frames it takes for the body to shrink one size. Default of 60.
   * @param {number} [noiseScale] Scale value for perlin noise. Default of 100.
   * @param {number} [gaussianMean] Mean of gausian random. Default of 0.
   * @param {number} [gaussianSd] Standard deviation of gausian random. Default of 10.
   * @param {number} [hueScale] Value hue is scaled by. Default of 360.
   */
  constructor(
    startingX,
    startingY,
    bodyLength,
    startingSize = 25,
    bodyPosOffsetMax = 1,
    bodyPosOffsetMin = -1,
    minSize = 2,
    deltaSize = 0,
    shrinkTime = 60,
    noiseScale = 100,
    gaussianMean = 0,
    gaussianSd = 10,
    hueScale = 360
  ) {
    this.bodyLength = bodyLength;
    this.bodySize = startingSize;
    this.bodyOffsetMax = bodyPosOffsetMax;
    this.bodyOffsetMin = bodyPosOffsetMin;
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
        posStorage.x + random(this.bodyOffsetMin, this.bodyOffsetMax + 1);
      this.body[i].y =
        posStorage.y + random(this.bodyOffsetMin, this.bodyOffsetMax + 1);

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
   */
  draw() {
    for (let i = 0; i < this.bodyLength; ++i) {
      fill(
        noise(
          this.body[i].x / this.noiseScale,
          this.body[i].y / this.noiseScale
        ) * this.hueScale,
        100,
        100
      );

      square(this.body[i].x, this.body[i].y, this.bodySize);
    }
  }
}
