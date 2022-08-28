#!/usr/bin/env node

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let consoleInput = [];

console.log(consoleInput);

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
  consoleInput.forEach((inputs, index) => {
    if (inputs[0] === "C" && index === 0) {
      let upperCanvas = dash.repeat(inputs[1] + 2);
      let splitUpperCanvas = upperCanvas.split("");
      canvas.push(splitUpperCanvas);

      if (inputs[2] >= 0) {
        for (let i = 0; i < inputs[2]; i++) {
          let middleCanvas = "|" + space.repeat(inputs[1]) + "|";
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
      if (inputs.command === "B") {
        function bucketFill(x, y, oldColor, newColor) {
          if (x < 0 || x >= canvas[y].length || y < 0 || y >= canvas.length)
            return;
          if (canvas[y][x] !== oldColor) return;

          // set the color of node to newColor

          canvas[y][x] = newColor;

          //look for neighboring cell
          bucketFill(x + 1, y, oldColor, newColor);
          bucketFill(x - 1, y, oldColor, newColor);
          bucketFill(x, y + 1, oldColor, newColor);
          bucketFill(x, y - 1, oldColor, newColor);
        }

        bucketFill(
          inputs.x,
          inputs.y,
          canvas[inputs.y][inputs.x],
          inputs.color
        );

        canvas.forEach((outputs) => {
          console.log(outputs.join(""));
        });
      }
    }
  });
}

function takeInput(input) {
  if (input === "Q") {
    readline.close();
    return;
  } else {
    consoleInput.push(input.split(" "));
    readline.question("Type another input or Q to finish \n", takeInput);
  }
}

readline.question(`Type the input to create a canvas \n`, (canvasInput) => {
  consoleInput.push(canvasInput.split(" "));
  createCanvas();
  readline.question("Type another input or Q to finish \n", takeInput);

  return;
});

// createCanvas();
// draw();
