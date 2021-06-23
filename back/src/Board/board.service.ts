import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  game: Array<null | string>;
  winStates: Array<Array<number>>;
  end: boolean;
  turn: string;
  switch: Map<string, string>;

  constructor() {
    this.game = new Array(9).fill(null);
    this.winStates = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this.end = false;
    this.turn = 'X';
    this.switch = new Map([
      ['X', 'O'],
      ['O', 'X'],
    ]);
  }

  move(index: number, piece: string): any {
    if (!this.game[index] && !this.end) {
      const newState = [...this.game];
      newState.splice(index, 1, piece);
      this.game = newState;
    }
  }

  switchTurn(): any {
    this.turn = this.switch.get(this.turn);
  }

  checkWinner(player) {
    return this.winStates.some((state) =>
      state.every((position) => this.game[position] === player),
    );
  }

  checkDraw() {
    return this.game.every((value) => value !== null);
  }

  reset() {
    this.game = new Array(9).fill(null);
    this.turn = 'X';
  }
}
