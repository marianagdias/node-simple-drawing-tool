#!/usr/bin/env node

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let consoleInput = [];

const dash = "-";
const space = " ";
const dot = "x";
let canvas = [];

function createCanvas() {
  consoleInput.forEach((inputs, index) => {
    if (inputs[0] === "C" && index === 0) {
      let upperCanvas = dash.repeat(Number(inputs[1]) + 2);

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
  consoleInput.forEach((inputs, index) => {
    //IF CANVAS IS CREATED
    if (index >= 1 && consoleInput[0][0] === "C") {
      //LINES
      if (inputs[0] === "L") {
        //HORIZONTAL LINE
        if (inputs[2] === inputs[4]) {
          canvas[inputs[2]].splice(
            inputs[1],
            inputs[3] - inputs[1] + 1,
            dot.repeat(inputs[3] - inputs[1] + 1)
          );

          let joinCanvas = canvas[inputs[2]].join("");
          canvas[inputs[2]] = joinCanvas;
          canvas[inputs[2]] = canvas[inputs[2]].split("");

          canvas.forEach((outputs) => {
            console.log(outputs.join(""));
          });
        }

        //VERTICAL LINE
        if (inputs[1] === inputs[3]) {
          for (let i = inputs[2]; i <= inputs[4]; i++) {
            canvas[i].splice(inputs[1], 1, "x");
          }

          canvas.forEach((outputs) => {
            console.log(outputs.join(""));
          });
        }
      }

      //RECTANGLE
      if (inputs[0] === "R") {
        canvas[inputs[2]].splice(
          inputs[1],
          inputs[3] - inputs[1] + 1,
          "x".repeat(inputs[3] - inputs[1] + 1)
        );

        let joinCanvas = canvas[inputs[2]].join("");
        canvas[Number(inputs[2])] = joinCanvas;
        canvas[Number(inputs[2])] = canvas[inputs[2]].split("");

        for (let i = Number(inputs[2]) + 1; i < Number(inputs[4]); i++) {
          canvas[i].splice(Number(inputs[1]), 1, "x");
        }

        for (let i = Number(inputs[2]) + 1; i < Number(inputs[4]); i++) {
          canvas[i].splice(Number(inputs[3]), 1, "x");
        }

        canvas[inputs[4]].splice(
          inputs[1],
          inputs[3] - inputs[1] + 1,
          "x".repeat(inputs[3] - inputs[1] + 1)
        );

        let joinCanvas2 = canvas[inputs[4]].join("");
        canvas[inputs[4]] = joinCanvas2;
        canvas[inputs[4]] = canvas[inputs[4]].split("");

        canvas.forEach((outputs) => {
          console.log(outputs.join(""));
        });
      }

      //BUCKET FILL
      if (inputs[0] === "B") {
        function bucketFill(x, y, oldColor, newColor) {
          if (x < 0 || x >= canvas[y].length || y < 0 || y >= canvas.length)
            return;
          if (canvas[y][x] !== oldColor) return;

          canvas[y][x] = newColor;

          bucketFill(x + 1, y, oldColor, newColor);
          bucketFill(x - 1, y, oldColor, newColor);
          bucketFill(x, y + 1, oldColor, newColor);
          bucketFill(x, y - 1, oldColor, newColor);
        }

        bucketFill(
          Number(inputs[1]),
          Number(inputs[2]),
          canvas[inputs[2]][inputs[1]],
          inputs[3]
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
    draw();
    readline.question("Type another input or Q to finish \n", takeInput);
  }
}

readline.question(`Type the input to create a canvas \n`, (canvasInput) => {
  consoleInput.push(canvasInput.split(" "));
  createCanvas();
  readline.question("Type another input or Q to finish \n", takeInput);

  return;
});
