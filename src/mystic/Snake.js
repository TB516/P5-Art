import { Position } from "./Position.js";

export class Snake {
  body;
  bodyLength;
  bodeSizeScale;
  noiseScale;
  gaussianMean;
  gaussianSd;
  hueScale;

  constructor(
    startingX,
    startingY,
    bodyLength,
    bodeSizeScale = 25,
    noiseScale = 100,
    gaussianMean = 0,
    gaussianSd = 10,
    hueScale = 360
  ) {
    this.bodyLength = bodyLength;
    this.bodeSizeScale = bodeSizeScale;
    this.noiseScale = noiseScale;
    this.gaussianMean = gaussianMean;
    this.gaussianSd = gaussianSd;
    this.hueScale = hueScale;

    this.body = [];

    for (let i = 0; i < bodyLength; ++i) {
      this.body.push(new Position(startingX, startingY));
    }
  }

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

      this.body[i].x = posStorage.x;
      this.body[i].y = posStorage.y;

      posStorage.x = posStorage2.x;
      posStorage.y = posStorage2.y;
    }
  }

  draw(frameCount) {
    for (let i = 0; i < this.bodyLength; ++i) {
      fill(
        noise(
          this.body[i].x / this.noiseScale,
          this.body[i].y / this.noiseScale
        ) * this.hueScale,
        100,
        100
      );

      square(
        this.body[i].x,
        this.body[i].y,
        noise(
          this.body[i].x / this.noiseScale,
          this.body[i].y / this.noiseScale,
          frameCount
        ) * this.bodeSizeScale
      );
    }
  }
}
