#!/usr/bin/env node

const input = [
  { command: "C", width: 20, heigth: 4 },
  { command: "L", x1: 1, y1: 2, x2: 6, y2: 2 },
  { command: "L", x1: 6, y1: 3, x2: 6, y2: 4 },
  { command: "R", x1: 16, y1: 1, x2: 20, y2: 3 },
  { command: "B", x: 10, y: 3, color: "o" },
];

const dash = "-";
const space = " ";
const dot = "x";

function createCanvas() {
  input.forEach((inputs, index) => {
    if (inputs.command === "C" && index === 0) {
      console.log(dash.repeat(inputs.width + 2));

      if (inputs.heigth >= 0) {
        for (let i = 0; i < inputs.heigth; i++) {
          console.log("|" + space.repeat(inputs.width) + "|");
        }
      }
      console.log(dash.repeat(inputs.width + 2));
    }
  });
}

createCanvas();
