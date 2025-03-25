import { Fruit } from "./fruit";

/**
 * @typedef {{xPos: number, yPos: number, theta: number, len: number}} State
 */

/**
 * @type {State}
 */
let state = {
  xPos: 0,
  yPos: 0,
  theta: 0,
  len: 0,
};

/**
 * @type {State[]}
 */
const prevStates = [];

/**
 * @type {Fruit[]}
 */
const fruit = [];

//prettier-ignore
const transformations = {
  "L": "L",
  "R": "R",
  "{": "{R",
  "}": "}LB",
  "A": "ABA",
  "B": "BRB",
};

//prettier-ignore
const rules = {
  "L": () => {
    state.theta -= 30;
  },
  "R": () => {
    state.theta += 30;
  },
  "{": () => {
    prevStates.push(state);
  },
  "}": () => {
    state = prevStates.pop();
  },
  "A": () => {
    fruit.push(new Fruit(state.xPos, state.yPos));
  },
  "B": () => {
    state.xPos += state.len * cos(state.theta);
    state.yPos += state.len * sin(state.theta);

    if (state.xPos < 0) state.xPos = width;
    if (state.xPos > width) state.xPos = 0;
    if (state.yPos < 0) state.yPos = height;
    if (state.yPos > height) state.yPos = 0;
  }
};

const SEED = "AB{ALB}A";
const NUM_GENERATIONS = 6;

let axiom;

const init = () => {
  // createCanvas(windowWidth, windowHeight);
  background(255);

  fruit.length = 0;
  prevStates.length = 0;

  state = {
    xPos: width / 2,
    yPos: height / 2,
    theta: 135,
    len: 15,
  };

  axiom = `${SEED}`;

  for (let i = 0; i < NUM_GENERATIONS; i++) {
    let newString = "";
    for (let j = 0; j < axiom.length; j++) {
      newString += transformations[axiom[j]] || axiom[j];
    }
    axiom = `${newString}`;
  }

  for (let i = 0; i < axiom.length; i++) {
    rules[axiom[i]]();
  }
};

function setup() {
  angleMode(DEGREES);
  init();
}

function draw() {
  background(255);

  for (let i = 0; i < fruit.length; i++) {
    fruit[i].draw();
  }
}

function windowResized() {
  init();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
