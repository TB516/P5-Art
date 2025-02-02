import { Position } from "../utils/Position.js";

export class Snake {
  /**
   * @type {Position[]}
   * @readonly
   */
  body;
  /**
   * @type {number}
   * @readonly
   */
  bodyLength;
  /**
   * @type {number}
   */
  bodySize;
  /**
   * @type {number}
   * @readonly
   */
  minSize;
  /**
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
   * @type {number}
   * @readonly
   */
  hueScale;

  /**
   * @param {number} startingX
   * @param {number} startingY
   * @param {number} bodyLength
   * @param {number} [startingSize=50]
   * @param {number} [minSize=2]
   * @param {number} [shrinkTime=60]
   * @param {number} [noiseScale=100]
   * @param {number} [gaussianMean=0]
   * @param {number} [gaussianSd=10]
   * @param {number} [hueScale=360]
   */
  constructor(
    startingX,
    startingY,
    bodyLength,
    startingSize = 25,
    minSize = 2,
    shrinkTime = 60,
    noiseScale = 100,
    gaussianMean = 0,
    gaussianSd = 10,
    hueScale = 360
  ) {
    this.bodyLength = bodyLength;
    this.bodySize = startingSize;
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
   * @param {number} frameCount
   * @param {number} canvasWidth
   * @param {number} canvasHeight
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

    //Update tail
    for (let i = 1; i < this.bodyLength; ++i) {
      const posStorage2 = new Position(this.body[i].x, this.body[i].y);

      this.body[i].x =
        posStorage.x + randomGaussian(this.gaussianMean, this.gaussianSd);
      this.body[i].y =
        posStorage.y + randomGaussian(this.gaussianMean, this.gaussianSd);

      posStorage.x = posStorage2.x;
      posStorage.y = posStorage2.y;
    }

    if (frameCount % this.shrinkTime === 0 && this.bodySize > this.minSize) {
      this.bodySize -= this.minSize;
    }
  }

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
