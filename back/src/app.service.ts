import { Injectable } from '@nestjs/common';

import { BoardService as Board } from './Board/board.service';

const randRoom = () => {
  const result = Math.floor(Math.random() * 10000).toString();
  return result;
};

const randPiece = () => {
  return Math.random() > 0.5 ? 'X' : 'O';
};

const rooms = new Map();

@Injectable()
export class AppService {
  getHello = () => {
    return 'hello';
  };

  makeRoom = (resolve) => {
    let newRoom = randRoom();
    while (rooms.has(newRoom)) {
      newRoom = randRoom();
    }
    rooms.set(newRoom, { roomId: newRoom, players: [], board: null });
    resolve(newRoom);
  };

  joinRoom = (player, room) => {
    const currentRoom = rooms.get(room);
    const updatedPlayerList = currentRoom.players.push(player);
    return { ...currentRoom, players: updatedPlayerList };
  };

  kick = (room) => {
    const currentRoom = rooms.get(room);
    return currentRoom.players.pop();
  };

  getRoomPlayersNum = (room) => {
    return rooms.get(room).players.length;
  };

  pieceAssignment = (room) => {
    const firstPiece = randPiece();
    const lastPiece = firstPiece === 'X' ? 'O' : 'X';

    const currentRoom = rooms.get(room);
    currentRoom.players[0].piece = firstPiece;
    currentRoom.players[1].piece = lastPiece;
  };

  newGame = (room) => {
    const currentRoom = rooms.get(room);
    const board = new Board();
    currentRoom.board = board;
  };
}
