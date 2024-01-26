export class Tetromino {
    shape !: number[][];
    color !: string;
    row!: number;
    col!: number;

    constructor(shape: number[][], color: string, row: number, col: number ) {
        this.shape = shape;
        this.color = color;
        this.row = row;
        this.col = col;
    }
  }