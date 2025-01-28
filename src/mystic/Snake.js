import { Position } from "./Position.js";

const noiseScale = 100;
const gaussianMean = 0;
const gaussianSd = 10;
const hueScale = 360;

export class Snake {
  body;
  bodyLength = 0;

  constructor(startingX, startingY, bodyLength) {
    this.bodyLength = bodyLength;
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
        this.body[0].x / noiseScale,
        this.body[0].y / noiseScale,
        frameCount
      ) +
      1 * randomGaussian(gaussianMean, gaussianSd);

    this.body[0].y +=
      noise(
        this.body[0].x / noiseScale,
        this.body[0].y / noiseScale,
        frameCount * 1000
      ) +
      1 * randomGaussian(gaussianMean, gaussianSd);

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
        noise(this.body[i].x / noiseScale, this.body[i].y / noiseScale) *
          hueScale,
        100,
        100
      );

      square(
        this.body[i].x,
        this.body[i].y,
        noise(
          this.body[i].x / noiseScale,
          this.body[i].y / noiseScale,
          frameCount
        ) * 25
      );
    }
  }
}
