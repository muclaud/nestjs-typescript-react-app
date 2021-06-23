export interface Player {
  id: number;
  name: string;
  room: number;
  piece: string;
}

export interface Room {
  id: number;
  players: Array<Player>;
}

export interface Cell {
  id: number;
  piece: null | string;
}
