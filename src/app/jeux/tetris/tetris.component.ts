import { Component, HostListener, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TetrominoesService } from '../../services/tetrominoes';
import { Tetromino } from '../../models/tetromino.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tetris',
  standalone: true,
  imports: [CommonModule],
  providers: [TetrominoesService],
  templateUrl: './tetris.component.html',
  styleUrl: './tetris.component.scss'
})
export class TetrisComponent implements AfterViewInit {
  BOARD_WIDTH: number = 10;
  BOARD_HEIGHT: number = 20;
  board: any[][] = [];
  rotatedShape!: number[][];
  currentTetromino!: Tetromino;
  nextTetromino!: Tetromino;
  currentGhostTetromino!: Tetromino;
  initialGameBoard!: string | undefined
  intervalId: any;
  level: number = 1;
  lines: number = 0;
  score: number = 0;
  gameOver!: boolean;
  firstGame: boolean = true;
  pause: boolean = false;


  constructor(private tetrominoesService: TetrominoesService, private el: ElementRef) { }

  ngAfterViewInit(): void {
    const buttons = this.el.nativeElement.getElementsByTagName('button');

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === ' ') {
          event.preventDefault();
        }
      });
    }
  }

  gameInit() {
    this.level = 1;
    this.score = 0;
    this.score = 0;
    this.pause = false;
    this.gameOver = false;
    this.firstGame = false;
    for (let row = 0; row < this.BOARD_HEIGHT; row++) {
      this.board[row] = Array(this.BOARD_WIDTH).fill(0);
    }
    this.currentTetromino = this.tetrominoesService.randomTetromino(this.BOARD_WIDTH);
    this.nextTetromino = this.tetrominoesService.randomTetromino(this.BOARD_WIDTH);
    this.clearGameBoard();
    this.eraseGhostTetromino()
    this.drawTetromino();
    this.drawNextTetromino();
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.moveTetromino("down"), 500 / this.level);
  }

  pauseGame() {
    this.pause = !this.pause;
    if (this.pause) {
      clearInterval(this.intervalId);
    } else {
      this.intervalId = setInterval(() => this.moveTetromino("down"), 500 / this.level);
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent): void {
    if (event.key.startsWith('Arrow')) {
      event.preventDefault();
    }
    if (event.key === 'ArrowLeft') {
      this.moveTetromino('left');
    } else if (event.key === 'ArrowRight') {
      this.moveTetromino('right');
    } else if (event.key === 'ArrowDown') {
      this.moveTetromino('down');
    } else if (event.key === 'ArrowUp') {
      this.rotateTetromino();
    } else if (event.key === ' ') {
      this.dropTetromino();
    }
  }

  clearGameBoard() {
    const gameBoard = document.getElementById('game_board');
    if (gameBoard) {
      const blocks = gameBoard.getElementsByClassName('block');
      while (blocks.length > 0) {
        gameBoard.removeChild(blocks[0]);
      }
      const ghosts = gameBoard.getElementsByClassName('ghost');
      while (blocks.length > 0) {
        gameBoard.removeChild(blocks[0]);
      }
    }
  }


  drawTetromino() {
    for (let r = 0; r < this.currentTetromino.shape.length; r++) {
      for (let c = 0; c < this.currentTetromino.shape[r].length; c++) {
        if (this.currentTetromino.shape[r][c]) {
          const block = document.createElement("div");
          block.classList.add("block");
          block.style.backgroundColor = this.currentTetromino.color;
          block.style.top = (this.currentTetromino.row + r) * 24 + "px";
          block.style.left = (this.currentTetromino.col + c) * 24 + "px";
          block.style.height = "24px";
          block.style.width = "24px";
          block.style.position = "absolute";
          block.style.border = "1px solid black";
          block.style.boxShadow = "inset 3px 3px 0 rgba(255, 255, 255, 0.5)";
          block.setAttribute("id", `block-${this.currentTetromino.row + r}-${this.currentTetromino.col + c}`);
          const gameBoard = document.getElementById("game_board")
          if (gameBoard) {
            gameBoard.appendChild(block);
          }
        }
      }
    }
  }

  drawNextTetromino() {
    const nextBlock = document.getElementById('next_block');
    if (nextBlock) {
      nextBlock.innerHTML = '';
      for (let r = 0; r < this.nextTetromino.shape.length; r++) {
        for (let c = 0; c < this.nextTetromino.shape[r].length; c++) {
          if (this.nextTetromino.shape[r][c]) {
            const block = document.createElement("div");
            block.classList.add("block");
            block.style.backgroundColor = this.nextTetromino.color;
            block.style.top = (r) * 24 + "px";
            block.style.left = (c) * 24 + "px";
            block.style.height = "24px";
            block.style.width = "24px";
            block.style.position = "absolute";
            block.style.border = "1px solid black";
            block.style.boxShadow = "inset 3px 3px 0 rgba(255, 255, 255, 0.5)";
            nextBlock.appendChild(block);
          }
        }
      }
    }
  }

  eraseTetromino() {
    for (let i = 0; i < this.currentTetromino.shape.length; i++) {
      for (let j = 0; j < this.currentTetromino.shape[i].length; j++) {
        if (this.currentTetromino.shape[i][j] !== 0) {
          let row = this.currentTetromino.row + i;
          let col = this.currentTetromino.col + j;
          let block = document.getElementById(`block-${row}-${col}`);
          const gameBoard = document.getElementById("game_board")
          if (block && gameBoard) {
            gameBoard.removeChild(block);
          }
        }
      }
    }
  }

  canTetrominoMove(rowOffset: number, colOffset: number) {
    for (let i = 0; i < this.currentTetromino.shape.length; i++) {
      for (let j = 0; j < this.currentTetromino.shape[i].length; j++) {
        if (this.currentTetromino.shape[i][j] !== 0) {
          let row = this.currentTetromino.row + i + rowOffset;
          let col = this.currentTetromino.col + j + colOffset;

          if (row >= this.BOARD_HEIGHT || col < 0 || col >= this.BOARD_WIDTH || (row >= 0 && this.board[row][col] !== 0)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  canTetrominoRotate() {
    for (let i = 0; i < this.rotatedShape.length; i++) {
      for (let j = 0; j < this.rotatedShape[i].length; j++) {
        if (this.rotatedShape[i][j] !== 0) {
          let row = this.currentTetromino.row + i;
          let col = this.currentTetromino.col + j;

          if (row >= this.BOARD_HEIGHT || col < 0 || col >= this.BOARD_WIDTH || (row >= 0 && this.board[row][col] !== 0)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  lockTetromino() {
    for (let i = 0; i < this.currentTetromino.shape.length; i++) {
      for (let j = 0; j < this.currentTetromino.shape[i].length; j++) {
        if (this.currentTetromino.shape[i][j] !== 0) {
          let row = this.currentTetromino.row + i;
          let col = this.currentTetromino.col + j;
          this.board[row][col] = this.currentTetromino.color;
        }
      }
    }
    let rowsCleared = this.clearRows();
    if (rowsCleared > 0) {
      this.lines += rowsCleared;
      const coefficients = [0, 40, 100, 300, 1200];
      this.score += this.level * coefficients[rowsCleared];
    }
    if (this.lines >= this.level * 10) {
      this.level++;
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => this.moveTetromino("down"), 500 / this.level);
    }
    
    if (this.isGameOver()) {
      this.endGame();
      return;
    }
    this.currentTetromino = this.nextTetromino;
    this.nextTetromino = this.tetrominoesService.randomTetromino(this.BOARD_WIDTH);
    this.drawNextTetromino()
  }

  isGameOver(): boolean {
    const gameOverThreshold = 1;

    for (let row = 0; row < gameOverThreshold; row++) {
      for (let col = 0; col < this.BOARD_WIDTH; col++) {
        if (this.board[row][col] !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  endGame() {
    this.drawTetromino();
    this.eraseGhostTetromino()
    this.gameOver = true;
    clearInterval(this.intervalId);
  }


  clearRows() {
    let rowsCleared = 0;

    for (let y = this.BOARD_HEIGHT - 1; y >= 0; y--) {
      let rowFilled = true;

      for (let x = 0; x < this.BOARD_WIDTH; x++) {
        if (this.board[y][x] === 0) {
          rowFilled = false;
          break;
        }
      }

      if (rowFilled) {
        rowsCleared++;
        for (let yy = y; yy > 0; yy--) {
          for (let x = 0; x < this.BOARD_WIDTH; x++) {
            this.board[yy][x] = this.board[yy - 1][x];
          }
        }

        for (let x = 0; x < this.BOARD_WIDTH; x++) {
          this.board[0][x] = 0;
        }
        const gameBoard = document.getElementById("game_board")
        if (gameBoard) {
          const blocks = gameBoard.getElementsByClassName('block');
          while (blocks.length > 0) {
            gameBoard.removeChild(blocks[0]);
          }
        }
        for (let row = 0; row < this.BOARD_HEIGHT; row++) {
          for (let col = 0; col < this.BOARD_WIDTH; col++) {
            if (this.board[row][col]) {
              const block = document.createElement("div");
              block.classList.add("block");
              block.style.backgroundColor = this.board[row][col];
              block.style.top = row * 24 + "px";
              block.style.left = col * 24 + "px";
              block.style.height = "24px";
              block.style.width = "24px";
              block.style.position = "absolute";
              block.style.border = "1px solid black";
              block.style.boxShadow = "inset 3px 3px 0 rgba(255, 255, 255, 0.5)";
              block.setAttribute("id", `block-${row}-${col}`);
              if (gameBoard) {
                gameBoard.appendChild(block);
              }
            }
          }
        }

        y++;
      }
    }

    return rowsCleared;
  }

  rotateTetromino() {
    if (this.pause || this.gameOver) {
      return;
    }
    this.rotatedShape = [];
    for (let i = 0; i < this.currentTetromino.shape[0].length; i++) {
      let row = [];
      for (let j = this.currentTetromino.shape.length - 1; j >= 0; j--) {
        row.push(this.currentTetromino.shape[j][i]);
      }
      this.rotatedShape.push(row);
    }
    if (this.canTetrominoRotate()) {
      this.eraseTetromino();
      this.currentTetromino.shape = this.rotatedShape;
      this.drawTetromino();
    }
    this.moveGhostTetromino();
  }

  moveTetromino(direction: string) {
    if (this.pause || this.gameOver) {
      return;
    }
    let row = this.currentTetromino.row;
    let col = this.currentTetromino.col;
    if (direction === "left") {
      if (this.canTetrominoMove(0, -1)) {
        this.eraseTetromino();
        col -= 1;
        this.currentTetromino.col = col;
        this.currentTetromino.row = row;
        this.drawTetromino();
      }
    } else if (direction === "right") {
      if (this.canTetrominoMove(0, 1)) {
        this.eraseTetromino();
        col += 1;

        this.currentTetromino.col = col;
        this.currentTetromino.row = row;
        this.drawTetromino();
      }
    } else {
      if (this.canTetrominoMove(1, 0)) {
        this.eraseTetromino();
        row++;
        this.currentTetromino.col = col;
        this.currentTetromino.row = row;
        this.drawTetromino();
      } else {
        this.lockTetromino();
      }
    }
    this.moveGhostTetromino();
  }

  dropTetromino() {
    if (this.pause || this.gameOver) {
      return;
    }
    let row = this.currentTetromino.row;
    let col = this.currentTetromino.col;
    this.eraseTetromino();
    while (this.canTetrominoMove(1, 0)) {
      row++;
      this.currentTetromino.col = col;
      this.currentTetromino.row = row;
    }
    this.drawTetromino();
    this.lockTetromino();
  }

  drawGhostTetromino() {
    const shape = this.currentGhostTetromino.shape;
    const color = "rgba(255,255,255,0.5)";
    const row = this.currentGhostTetromino.row;
    const col = this.currentGhostTetromino.col;

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const block = document.createElement("div");
          block.classList.add("ghost");
          block.style.backgroundColor = color;
          block.style.top = (row + r) * 24 + "px";
          block.style.left = (col + c) * 24 + "px";
          block.style.height = "24px";
          block.style.width = "24px";
          block.style.position = "absolute";
          block.style.border = "1px solid black";
          block.style.boxShadow = "inset 3px 3px 0 rgba(255, 255, 255, 0.5)";
          block.setAttribute("id", `ghost-${row + r}-${col + c}`);
          const gameBoard = document.getElementById("game_board")
          if (gameBoard) {
            gameBoard.appendChild(block);
          }
        }
      }
    }
  }

  eraseGhostTetromino() {
    const ghost = document.querySelectorAll(".ghost");
    for (let i = 0; i < ghost.length; i++) {
      ghost[i].remove();
    }
  }

  canGhostTetrominoMove(rowOffset: number, colOffset: number) {
    for (let i = 0; i < this.currentGhostTetromino.shape.length; i++) {
      for (let j = 0; j < this.currentGhostTetromino.shape[i].length; j++) {
        if (this.currentGhostTetromino.shape[i][j] !== 0) {
          let row = this.currentGhostTetromino.row + i + rowOffset;
          let col = this.currentGhostTetromino.col + j + colOffset;

          if (row >= this.BOARD_HEIGHT || col < 0 || col >= this.BOARD_WIDTH || (row >= 0 && this.board[row][col] !== 0)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  moveGhostTetromino() {
    this.eraseGhostTetromino();

    this.currentGhostTetromino = { ...this.currentTetromino };
    while (this.canGhostTetrominoMove(1, 0)) {
      this.currentGhostTetromino.row++;
    }

    this.drawGhostTetromino();
  }


}
