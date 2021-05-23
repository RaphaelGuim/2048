class Matrix {
  constructor() {
    this.matrix = this.emptyMatrix();
    this.points = 0;
  }

  emptyMatrix() {
    let arr = new Array(LINES).fill([]).map(() => new Array(COLS).fill(0));
    return arr;
  }

  addRandom() {
    let places = [];
    this.matrix.forEach((line, i) => {
      line.forEach((col, j) => {
        if (col == 0) places.push([i, j]);
      });
    });
    if (!places.length) return this.matrix;
    let choice = floor(random() * places.length);
    let i, j;
    [i, j] = places[choice];
    this.matrix[i][j] = random() < 0.9 ? 2 : 4;
    return this.matrix;
  }

  mirror() {
    for (let i = 0; i < LINES; i++) {
      for (let j = 0; j < COLS / 2; j++) {
        let actual = this.matrix[i][j];
        this.matrix[i][j] = this.matrix[i][COLS - 1 - j];
        this.matrix[i][COLS - 1 - j] = actual;
      }
    }
  }

  slideRight() {
    for (let i = 0; i < LINES; i++) {
      for (let j = COLS - 1; j >= 0; j--) {
        if (this.matrix[i][j] == 0) {
          let k = j - 1;
          while (k >= 0) {
            if (this.matrix[i][k] != 0) {
              this.matrix[i][j] = this.matrix[i][k];
              this.matrix[i][k] = 0;
              k = -1;
            }
            k--;
          }
        }
      }
    }
  }

  addRight() {
    for (let i = 0; i < LINES; i++) {
      for (let j = COLS - 1; j > 0; j--) {
        if (this.matrix[i][j] == this.matrix[i][j - 1]) {
          this.matrix[i][j] *= 2;
          this.matrix[i][j - 1] = 0;
          this.points += this.matrix[i][j];
        }
      }
    }
  }

  rotateRight() {
    let rotated = [];
    for (let j = 0; j < COLS; j++) {
      let col = [];
      for (let i = 0; i < LINES; i++) {
        col.push(this.matrix[i][j]);
      }
      col.reverse();
      rotated.push(col);
    }
    this.matrix = rotated;
  }

  rotateLeft() {
    let rotated = [];
    for (let j = COLS - 1; j >= 0; j--) {
      let col = [];
      for (let i = 0; i < LINES; i++) {
        col.push(this.matrix[i][j]);
      }
      rotated.push(col);
    }
    this.matrix = rotated;
  }

  copy() {
    let newCopy = new Matrix();
    for (let i = 0; i < LINES; i++) {
      for (let j = 0; j < COLS; j++) {
        newCopy.matrix[i][j] = int(this.matrix[i][j]);
      }
    }
    return newCopy;
  }

  commandRight() {
    this.slideRight();
    this.addRight();
    this.slideRight();
  }

  commandLeft() {
    this.mirror();
    this.commandRight();
    this.mirror();
  }

  commandUp() {
    this.rotateRight();
    this.commandRight();
    this.rotateLeft();
  }

  commandDown() {
    this.rotateLeft();
    this.commandRight();
    this.rotateRight();
  }

  gameOver() {
    let checkMatrix = this.copy();
    Object.keys(commands).forEach((k) => commands[k](checkMatrix));
    return this.compare(checkMatrix);
  }

  compare(another) {
    for (let i = 0; i < LINES; i++) {
      for (let j = 0; j < COLS; j++) {
        if (this.matrix[i][j] != another.matrix[i][j]) return false;
      }
    }
    return true;
  }
}