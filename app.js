#!/usr/bin/env node

// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// readline.question(`Input?`, (input) => {
//   let consoleInput = input.split(" ");
//   readline.close();
// });

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
let canvas = [];
let upperLine = [];
let bottomLine = [];
let sides = [];

function createCanvas() {
  input.forEach((inputs, index) => {
    if (inputs.command === "C" && index === 0) {
      let upperCanvas = dash.repeat(inputs.width + 2);
      let splitUpperCanvas = upperCanvas.split("");
      canvas.push(splitUpperCanvas);

      if (inputs.heigth >= 0) {
        for (let i = 0; i < inputs.heigth; i++) {
          let middleCanvas = "|" + space.repeat(inputs.width) + "|";
          let splitMiddleCanvas = middleCanvas.split("");
          canvas.push(splitMiddleCanvas);
        }
      }
      canvas.push(splitUpperCanvas);

      canvas.forEach((outputs, index) => {
        console.log(outputs.join(""));
      });
    }
  });
}

function draw() {
  input.forEach((inputs, index) => {
    //IF CANVAS IS CREATED
    if (index >= 1 && input[0].command === "C") {
      //LINES
      if (inputs.command === "L") {
        //HORIZONTAL LINE
        if (inputs.y1 === inputs.y2) {
          canvas[inputs.y1].splice(
            inputs.x1,
            inputs.x2 - inputs.x1 + 1,
            dot.repeat(inputs.x2 - inputs.x1 + 1)
          );

          let joinCanvas = canvas[inputs.y1].join("");
          canvas[inputs.y1] = joinCanvas;
          canvas[inputs.y1] = canvas[inputs.y1].split("");

          // canvas[inputs.y1].split("");

          canvas.forEach((outputs) => {
            console.log(outputs.join(""));
          });
        }

        //VERTICAL LINE
        if (inputs.x1 === inputs.x2) {
          for (let i = inputs.y1; i <= inputs.y2; i++) {
            canvas[i].splice(inputs.x1, 1, "x");
          }

          canvas.forEach((outputs) => {
            console.log(outputs.join(""));
          });
        }
      }

      //RECTANGLE
      if (inputs.command === "R") {
        canvas[inputs.y1].splice(
          inputs.x1,
          inputs.x2 - inputs.x1 + 1,
          "x".repeat(inputs.x2 - inputs.x1 + 1)
        );

        let joinCanvas = canvas[inputs.y1].join("");
        canvas[inputs.y1] = joinCanvas;
        canvas[inputs.y1] = canvas[inputs.y1].split("");

        for (let i = inputs.y1 + 1; i < inputs.y2; i++) {
          canvas[i].splice(inputs.x1, 1, "x");
        }

        for (let i = inputs.y1 + 1; i < inputs.y2; i++) {
          canvas[i].splice(inputs.x2, 1, "x");
        }

        canvas[inputs.y2].splice(
          inputs.x1,
          inputs.x2 - inputs.x1 + 1,
          "x".repeat(inputs.x2 - inputs.x1 + 1)
        );

        let joinCanvas2 = canvas[inputs.y2].join("");
        canvas[inputs.y2] = joinCanvas2;
        canvas[inputs.y2] = canvas[inputs.y2].split("");

        canvas.forEach((outputs) => {
          console.log(outputs.join(""));
        });
      }

      //BUCKET FILL
      function bucketFill(i, j, oldColor, newColor) {
        let canvasLine = "";
        if (inputs.command === "B") {
          //SPLIT LINES INTO ARRAYS

          if (canvas[j] !== oldColor) return;
          // set the color of node to newColor
          canvas.forEach((element, index) => {
            for (let i = 0; i <= index; i++) {
              canvasLine = element;
              canvasLine[x] = newColor;
            }
          });

          bucketFill(i + 1, j, oldColor, newColor);
          bucketFill(i - 1, j, oldColor, newColor);
          bucketFill(i, j + 1, oldColor, newColor);
          bucketFill(i, j - 1, oldColor, newColor);
        }
      }
      bucketFill(inputs.x, inputs.y, " ", inputs.color);
    }
  });
}

createCanvas();
draw();
