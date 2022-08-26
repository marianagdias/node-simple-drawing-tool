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

function draw() {
  input.forEach((inputs, index) => {
    if (index >= 1 && input[0].command === "C") {
      if (inputs.command === "L") {
        if (inputs.y1 === inputs.y2) {
          console.log(dash.repeat(input[0].width + 2));

          for (let i = 1; i < inputs.y1; i++) {
            console.log("|" + space.repeat(input[0].width) + "|");
          }

          let horizontalLine =
            "|" +
            space.repeat(inputs.x1 - 1) +
            dot.repeat(inputs.x2 - inputs.x1 + 1) +
            space.repeat(input[0].width - inputs.x2) +
            "|";
          console.log(horizontalLine);

          for (let i = inputs.y1; i < input[0].heigth; i++) {
            console.log("|" + space.repeat(input[0].width) + "|");
          }
          //   for (let i = 0; i < input[0].heigth; i++) {
          //     console.log("|" + space.repeat(input[0].width) + "|");
          //   }

          //   if (inputs.heigth >= 0) {
          //     for (var i = 0; i < inputs.heigth; i++) {
          //       console.log("|" + space.repeat(input[0].width) + "|");
          //     }
          //   }
          console.log(dash.repeat(input[0].width + 2));
        }

        if (inputs.x1 === inputs.x2) {
          console.log(dash.repeat(input[0].width + 2));

          for (let i = 1; i < inputs.y1; i++) {
            console.log("|" + space.repeat(input[0].width) + "|");
          }

          for (i = inputs.y1; i <= inputs.y2; i++) {
            console.log(
              "|" +
                space.repeat(inputs.x1 - 1) +
                dot +
                space.repeat(input[0].width - inputs.x2) +
                "|"
            );
          }

          for (let i = inputs.y2 + 1; i < input[0].heigth; i++) {
            console.log("|" + space.repeat(input[0].width) + "|");
          }

          console.log(dash.repeat(input[0].width + 2));
        }
      }

      if (inputs.command === "R") {
      }

      if (inputs.command === "B") {
      }
    }
  });
}

draw();
