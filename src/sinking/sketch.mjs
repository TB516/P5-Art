let shaderProgram;
let vertexShader;
let fragmentShader;
let position = { x: 0, y: 0 };
let xOffset = 1;
let yOffset = 1;

const init = () => {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
  strokeWeight(0.5);

  position.x = width / 2;
  position.y = height / 2;
  xOffset = random(-1, 1);
  yOffset = random(-1, 1);

  shaderProgram = createShader(
    vertexShader.join("\n"),
    fragmentShader.join("\n")
  );
};

/**
 * Re-randomizes seeds then calls init.
 */
const reSeededInit = () => {
  randomSeed(Date.now());
  noiseSeed(Date.now());

  init();
};

function preload() {
  vertexShader = loadStrings("shaders/shader.vert");
  fragmentShader = loadStrings("shaders/shader.frag");
}

function setup() {
  init();
}

function windowResized() {
  reSeededInit();
}

function draw() {
  const frameNoiseValue = noise(position.x, position.y, frameCount);
  translate(-width / 2, -height / 2);

  position.x += cos(2 * frameNoiseValue) * xOffset;
  position.y += sin(-2 * frameNoiseValue) * yOffset;

  if (position.x > width) {
    position.x = 0;

    setTimeout(() => {
      yOffset = random(-4, 1);
    }, 5000);
  }
  if (position.x < 0) {
    position.x = width;

    setTimeout(() => {
      yOffset = random(-1, 4);
    }, 5000);
  }
  if (position.y > height) {
    position.y = 0;

    setTimeout(() => {
      xOffset = random(-1, 4);
    }, 5000);
  }
  if (position.y < 0) {
    position.y = height;

    setTimeout(() => {
      xOffset = random(-4, 1);
    }, 5000);
  }

  shader(shaderProgram);
  shaderProgram.setUniform("u_time", frameCount);
  shaderProgram.setUniform("u_frameNoiseVal", frameNoiseValue);
  strokeWeight(frameNoiseValue * 1.3);
  ellipse(position.x, position.y, 100, 50);
}

window.preload = preload;
window.setup = setup;
window.windowResized = windowResized;
window.draw = draw;
