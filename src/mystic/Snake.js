import { Position } from "./Position.js";

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
      noise(this.body[0].x, this.body[0].y, frameCount) +
      1 * randomGaussian(0, 10);

    this.body[0].y +=
      noise(this.body[0].x, this.body[0].y, frameCount * 1000) +
      1 * randomGaussian(0, 10);

    if (this.body[0].x > canvasWidth) this.body[0].x -= canvasWidth;
    if (this.body[0].x < 0) this.body[0].x += canvasWidth;
    if (this.body[0].y > canvasHeight) this.body[0].y -= canvasHeight;
    if (this.body[0].y < 0) this.body[0].y += canvasHeight;
    //#endregion

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
      fill(noise(this.body[i].x, this.body[i].y, frameCount) * 360, 100, 100);

      square(
        this.body[i].x,
        this.body[i].y,
        noise(this.body[i].x, this.body[i].y, frameCount) * 25
      );
    }
  }
}
