import { Tetromino } from "../models/tetromino.model";

export class TetrominoesService {
    tetrominoes: any[] = [
        {
            shape: [
                [1, 1],
                [1, 1],
            ],
            color: "#ffd800",
        },
        {
            shape: [
                [0, 2, 0],
                [2, 2, 2],
            ],
            color: "#7925DD",
        },
        {
            shape: [
                [0, 3, 3],
                [3, 3, 0],
            ],
            color: "orange",
        },
        {
            shape: [
                [4, 4, 0],
                [0, 4, 4],
            ],
            color: "red",
        },
        {
            shape: [
                [5, 0, 0],
                [5, 5, 5],
            ],
            color: "green",
        },
        {
            shape: [
                [0, 0, 6],
                [6, 6, 6],
            ],
            color: "#ff6400 ",
        },
        {
            shape: [
                [7, 7, 7, 7]
            ],
            color: "#00b5ff"
        }
    ];

    randomTetromino(boardWidth : number) {
        const index = Math.floor(Math.random() * this.tetrominoes.length);
        const tetromino = this.tetrominoes[index];
        return new Tetromino(
            tetromino.shape,
            tetromino.color,
            0,
            Math.floor(Math.random() * (boardWidth - tetromino.shape[0].length + 1))
        );
    }
}