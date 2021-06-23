import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload, client.id);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}

//   @SubscribeMessage('newGame')
//   await AppService.makeRoom(client: Socket) => {
//   this.server.emit('newGameCreated', (room: string))
// })

// @SubscribeMessage('joining')
// new Promise(makeRoom).then((room) => {
//   this.server.emit('newGameCreated', room)
// })

//   socket.on('joining', ({ room }) => {
//     if (rooms.has(room)) {
//       socket.emit('joinConfirmed')
//     } else {
//       socket.emit('errorMessage', 'No room with that id found')
//     }
//   })

//   socket.on('newRoomJoin', ({ room, name }) => {

//     if (room === '' || name === '') {
//       io.to(socket.id).emit('joinError')
//     }

//     socket.join(room)
//     const id = socket.id
//     const newPlayer = new Player(name, room, id)
//     joinRoom(newPlayer, room)

//     const peopleInRoom = getRoomPlayersNum(room)

//     if (peopleInRoom === 1) {
//       io.to(room).emit('waiting')
//     }

//     if (peopleInRoom === 2) {

//       pieceAssignment(room)
//       currentPlayers = rooms.get(room).players
//       for (const player of currentPlayers) {
//         io.to(player.id).emit('pieceAssignment', { piece: player.piece, id: player.id })
//       }
//       newGame(room)

//       const currentRoom = rooms.get(room)
//       const gameState = currentRoom.board.game
//       const turn = currentRoom.board.turn
//       const players = currentRoom.players.map((player) => [player.id, player.name])
//       io.to(room).emit('starting', { gameState, players, turn })
//     }

//     if (peopleInRoom === 3) {
//       socket.leave(room)
//       kick(room)
//       io.to(socket.id).emit('joinError')
//     }
//   })

//   socket.on('move', ({ room, piece, index }) => {
//     currentBoard = rooms.get(room).board
//     currentBoard.move(index, piece)

//     if (currentBoard.checkWinner(piece)) {
//       io.to(room).emit('winner', { gameState: currentBoard.game, id: socket.id })
//     } else if (currentBoard.checkDraw()) {
//       io.to(room).emit('draw', { gameState: currentBoard.game })
//     } else {
//       currentBoard.switchTurn()
//       io.to(room).emit('update', { gameState: currentBoard.game, turn: currentBoard.turn })
//     }
//   })

//   socket.on('playAgainRequest', (room) => {
//     currentRoom = rooms.get(room)
//     currentRoom.board.reset()

//     pieceAssignment(room)
//     currentPlayers = currentRoom.players
//     for (const player of currentPlayers) {
//       io.to(player.id).emit('pieceAssignment', { piece: player.piece, id: player.id })
//     }

//     io.to(room).emit('restart', { gameState: currentRoom.board.game, turn: currentRoom.board.turn })
//   })

//   socket.on('disconnecting', () => {

//     const currentRooms = Object.keys(socket.rooms)

//     if (currentRooms.length === 2) {

//       const room = currentRooms[1]
//       const num = getRoomPlayersNum(room)

//       if (num === 1) {
//         rooms.delete(room)
//       }

//       if (num === 2) {
//         currentRoom = rooms.get(room)
//         currentRoom.players = currentRoom.players.filter((player) => player.id !== socket.id)
//         io.to(room).emit('waiting')
//       }
//     }
//   })
//   })
