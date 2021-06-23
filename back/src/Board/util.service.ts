import { Injectable } from '@nestjs/common';

@Injectable()
export class Player {
  name: string;
  room: Map<any, any>;
  id: number;
  piece: string;

  constructor(name, room, id, piece = '') {
    this.name = name;
    this.room = room;
    this.id = id;
    this.piece = piece;
  }
}
