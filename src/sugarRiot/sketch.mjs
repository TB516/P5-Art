import { FloatingSphere } from "./FloatingSphere.js";

/**
 * @type {FloatingSphere[]}
 */
const orbs = [];
const orbCount = 100;
const offsetMultiplier = 100;
const orbSize = 20;

const init = () => {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // noStroke();
  colorMode(HSB);
  background(0);

  orbs.length = 0;

  for (let i = 0; i < orbCount; ++i) {
    const offsetX = random(
      -orbSize * offsetMultiplier,
      orbSize * offsetMultiplier
    );
    const offsetY = random(
      -orbSize * offsetMultiplier,
      orbSize * offsetMultiplier
    );

    orbs.push(
      new FloatingSphere(
        width / 2 + offsetX,
        height / 2 + offsetY,
        -i * orbSize * 3,
        orbSize,
        offsetX,
        offsetY
      )
    );
  }
};

function setup() {
  init();
}

function draw() {
  translate(-width / 2, -height / 2);
  filter(BLUR);

  for (let i = 0; i < orbCount; ++i) {
    orbs[i].update(mouseX, mouseY, deltaTime);
  }

  for (let i = 0; i < orbCount; ++i) {
    fill(color(frameCount % 360, 100, 100));
    orbs[i].draw();
  }
}

function windowResized() {
  init();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
