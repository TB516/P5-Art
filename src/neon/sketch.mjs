let state = {
  xPos: width / 2,
  yPos: height / 2,
  theta: 60,
  len: 25,
};

const prevStates = [];

//prettier-ignore
const transformations = {
  "L": "ALB",
  "R": "BARR",
  "Y": "Y",
  "X": "X",
  "A": "ARRBALLABRARA",
  "B": "BRB"
};

//prettier-ignore
const rules = {
  "L": () => {
    state.theta -= 60;
  },
  "R": () => {
    state.theta += 60;
  },
  "Y": () => {
    state = JSON.parse(prevStates.pop());
  },
  "X": () => {
    rules.L();
    rules.A();
    prevStates.push(JSON.stringify(state));
  },
  "A": () => {
    state.xPos += state.len * cos(state.theta);
    state.yPos += state.len * sin(state.theta);

    const halfLen = state.len / 2;
    const h = (1.73205080757 / 2) * state.len;
    const halfH = h / 2;

    if (state.xPos + halfLen > width) state.xPos -= width;
    if (state.xPos - halfLen < 0) state.xPos += width;
    if (state.yPos + halfH > height) state.yPos -= height;
    if (state.yPos - (2 / 3) * h < 0) state.yPos += height;

    const x1 = state.xPos;
    const y1 = state.yPos - (2 / 3) * h;
    const x2 = state.xPos - state.len / 2;
    const y2 = state.yPos + (1 / 3) * h;
    const x3 = state.xPos + state.len / 2;
    const y3 = state.yPos + (1 / 3) * h;

    triangle(x1, y1, x2, y2, x3, y3);
  },
  "B": () => {
    state.xPos += state.len * cos(state.theta);
    state.yPos += state.len * sin(state.theta);
  }
};

const SEED = "AXABBLLAY";
const NUM_GENERATIONS = 1;

let axiom;

const init = () => {
  createCanvas(windowWidth, windowHeight);
  background(0);

  fill(0);

  axiom = `${SEED}`;

  for (let i = 0; i < NUM_GENERATIONS; i++) {
    let newString = "";
    for (let j = 0; j < axiom.length; j++) {
      newString += transformations[axiom[j]] || axiom[j];
    }
    axiom = `${newString}`;
  }
};

function setup() {
  colorMode(HSB);
  angleMode(DEGREES);
  strokeWeight(10);
  init();
}

function draw() {
  stroke((frameCount * 10) % 360, 100, 100);
  rules[axiom[frameCount % axiom.length]]();
}

function windowResized() {
  init();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
