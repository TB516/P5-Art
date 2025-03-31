import { Fruit } from "./fruit.js";

/**
 * @type {Fruit[]}
 */
const fruit = [];

const drawLSystem = () => {
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

  let colorCounter = 0;

  /**
   * @type {State[]}
   */
  const prevStates = [];

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
    fruit.push(new Fruit(state.xPos, state.yPos, color(colorCounter * 12 % 360, 100, 100)));
    colorCounter += random(0, 10);
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

  const SEED = "A{B{ALB}A}A";
  const NUM_GENERATIONS = 10;

  let axiom;

  fruit.length = 0;
  prevStates.length = 0;
  colorCounter = 0;

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

const drawHitomezashiGrid = () => {
  strokeWeight(3);

  const spacing = 5;

  let axiomLeft = "";
  let axiomTop = "";

  let xOffset = Math.round((width % spacing) / 2);
  let yOffset = Math.round((height % spacing) / 2);

  for (let x = -xOffset; x < width + xOffset; x += spacing) {
    axiomTop += `${random() > 0.3 ? 0 : 1}`;
  }

  for (let y = -yOffset; y < height + yOffset; y += spacing) {
    axiomLeft += `${random() > 0.7 ? 0 : 1}`;
  }

  const setStrokeColor = (x, y) => {
    let fruitAtPosition = null;

    for (let k = 0; k < fruit.length; k++) {
      const f = fruit[k];
      const fruitX = f.x;
      const fruitY = f.y;
      const fruitRadius = f.size;

      const lineStartX = x;
      const lineStartY = y;
      const lineEndX = x + spacing;
      const lineEndY = y;

      const distToStart = dist(fruitX, fruitY, lineStartX, lineStartY);
      const distToEnd = dist(fruitX, fruitY, lineEndX, lineEndY);
      const lineLength = dist(lineStartX, lineStartY, lineEndX, lineEndY);

      if (
        distToStart <= fruitRadius ||
        distToEnd <= fruitRadius ||
        distToStart + distToEnd <= lineLength + fruitRadius
      ) {
        fruitAtPosition = f;
        break;
      }
    }

    if (fruitAtPosition) {
      stroke(fruitAtPosition.color);
    } else {
      stroke(0);
    }
  };

  for (let i = 0; i < axiomLeft.length; i++) {
    let drawLine = axiomLeft[i] === "0";
    let y = i * spacing - yOffset;
    for (let x = -xOffset; x < width + xOffset; x += spacing) {
      if (drawLine) {
        setStrokeColor(x, y);

        line(x, y, x + spacing, y);
      }
      drawLine = !drawLine;
    }
  }

  for (let i = 0; i < axiomTop.length; i++) {
    let drawLine = axiomTop[i] === "0";
    let x = i * spacing - xOffset;
    for (let y = -yOffset; y < height + yOffset; y += spacing) {
      if (drawLine) {
        setStrokeColor(x, y);

        line(x, y, x, y + spacing);
      }
      drawLine = !drawLine;
    }
  }
};

const init = () => {
  // createCanvas(windowWidth, windowHeight);
  background(255);

  drawLSystem();
  drawHitomezashiGrid();
};

function setup() {
  colorMode(HSB);
  angleMode(DEGREES);
  init();
}

function windowResized() {
  init();
}

window.setup = setup;
window.windowResized = windowResized;
