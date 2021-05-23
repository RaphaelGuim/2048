const LINES = 4;
const COLS = 4;

let GAME_OVER = false;
let MATRIX;

let size, paddingX, paddingY;

function setup() {
  strokeWeight(0.5);
  colorMode(HSB, 100);
  createCanvas(windowWidth, windowHeight);
  MATRIX = new Matrix();
  MATRIX.addRandom();
  noLoop();
  size = 150;
  paddingX = windowWidth / 2 - size * 2;
  paddingY = 100;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function slide(matrix, direction) {
  if (commands[direction]) {
    commands[direction](matrix);
    matrix.addRandom();
    GAME_OVER = matrix.gameOver();
    redraw();
  }
}

const commands = {
  37: (matrix) => matrix.commandLeft(), //left
  38: (matrix) => matrix.commandUp(), //up
  39: (matrix) => matrix.commandRight(), //right
  40: (matrix) => matrix.commandDown(), //down
};

function draw() {
  background("gray");
  rectMode(CORNER);
  MATRIX.matrix.forEach((line, i) => {
    line.forEach((col, j) => {
      if (col) {
        fill("white");
      } else {
        fill("darkgray");
      }
      square(
        paddingX + (size * 4 * j) / COLS,
        paddingY + (size * 4 * i) / LINES,
        size,
        20
      );
      if (col) {
        textAlign(CENTER, CENTER);
        fill(log(col) * 15, 80, 80);
        textSize(40);
        text(
          `${col}`,
          paddingX + (size * 4 * j) / COLS + size / 2,
          paddingY + (size * 4 * i) / LINES + size / 2
        );
      }
    });
  });
  fill("black");
  text("Points: " + MATRIX.points, windowWidth / 2, 50);
  if (GAME_OVER) {
    fill(100, 80, 80);
    text(`GAME OVER`, windowWidth / 2, size * 5);
  }
}

function keyPressed() {
  slide(MATRIX, keyCode);
}
