import React, { useEffect, useState, useCallback} from 'react';
import io from 'socket.io-client';

import Square from '../../components/Square';
import Status from '../../components/Status';
import ScoreBoard from '../../components/ScoreBoard';
import PlayAgain from '../../components/PlayAgain';

const Game: React.FC = () => {

    const InitialState: {
        game: Array<any>;
        piece: string;
        turn: boolean;
        end: boolean;
        room: string;
        statusMessage: string;
        waiting: boolean;
        currentPlayerScore: number;
        opponentPlayer: Array<any>;
    } = {
        game: new Array(9).fill(null),
        piece: 'X',
        turn: true,
        end: false,
        room: '',
        statusMessage: '',
        waiting: false,
        currentPlayerScore: 0,
        opponentPlayer: [],
    };

    const [state, setState] = useState(InitialState);
    const [socketID, setsocketID] = useState('')
    
    const socket = io('http://localhost:5000/')

    const handleClick = (index: number) => {
        const { game, piece, end, turn, room } = state
        if (!game[index] && !end && turn) {
            socket.emit('move', { room, piece, index })
        }
    }

    const playAgainRequest = () => {
        socket.emit('playAgainRequest', state.room)
    }

    const setMessage = useCallback(
        () => {
            const message = state.turn ? 'Your Turn' : `${state.opponentPlayer[0]}'s Turn`
            setState({ ...state, statusMessage: message })
        },
        [state],
    )

    const setTurn = useCallback(
        (piece: string) => {
            if (state.piece === piece) {
                setState({ ...state, turn: true })
            } else {
                setState({ ...state, turn: false })
            }
        },
        [state],
    )

    const setBoard = useCallback(
        (gameState: any) => {
            setState({ ...state, game: gameState })
        },
        [state],
    )
    
    const gameStart = useCallback(
        (gameState: any, players: Array<[]>, piece: string) => {
            const opponent = 'opponent'
            setState({ ...state, opponentPlayer: [opponent, 0], end: false })
            setBoard(gameState)
            setTurn(piece)
            setMessage()
        },
        [setState, state, setBoard, setTurn, setMessage],
    )


    const handleUpdate = useCallback(
        (gameState: any, piece: string) => {
            setBoard(gameState)
            setTurn(piece)
            setMessage()
        },
        [setBoard, setTurn, setMessage],
    )

    const handleWin = useCallback(
        (id: string, gameState: any) => {
            setBoard(gameState)
            if (socketID === id) {
                const playerScore = state.currentPlayerScore + 1
                setState({ ...state, currentPlayerScore: playerScore, statusMessage: 'You Win' })
            } else {
                const opponentScore = state.opponentPlayer[1] + 1
                const opponent = state.opponentPlayer
                opponent[1] = opponentScore
                setState({ ...state, opponentPlayer: opponent, statusMessage: `${state.opponentPlayer[0]} Wins` })
            }
            setState({ ...state, end: true })
        },
        [setBoard, state, socketID,],
    )

    const handleDraw = useCallback(
        (gameState: any) => {
            setBoard(gameState)
            setState({ ...state, end: true, statusMessage: 'Draw' })
        },
        [setBoard, setState, state],
    )

    const handleRestart = useCallback(
        (gameState: any, piece: string) => {
            setBoard(gameState)
            setTurn(piece)
            setMessage()
            setState({ ...state, end: false })
        },
        [setBoard, setTurn, setMessage, setState, state],
    )

    useEffect(() => {
        socket.on('waiting', () => setState({ ...state, waiting: true, currentPlayerScore: 0, opponentPlayer: [] }))
        socket.on('starting', ({ gameState, players, turn }: { gameState: any; players: any; turn: any}) => {
            setState({ ...state, waiting: false })
            gameStart(gameState, players, turn)
        })
        socket.on('joinError', () => setState({ ...state }))


        socket.on('pieceAssignment', ({ piece, id }: { piece: string; id: string;}) => {
            setState({ ...state, piece: piece })
            setsocketID(id);
        })

        socket.on('update', ({ gameState, piece }: { gameState: any; piece:string }) => handleUpdate(gameState, piece))
        socket.on('winner', ({ gameState, id }: { gameState: any; id: string }) => handleWin(id, gameState))
        socket.on('draw', ({ gameState }: { gameState: any}) => handleDraw(gameState))

        socket.on('restart', ({ gameState, piece }: { gameState: any; piece: string }) => handleRestart(gameState, piece))
    }, [gameStart, handleDraw, handleRestart, handleUpdate, handleWin, state, socket])


    const renderSquare = (i:number) => {
        return (
            <Square key={i} value={state.game[i]}
                player={state.piece}
                end={state.end}
                id={i}
                onClick={handleClick}
                turn={state.turn} />
        )
    }
    
    let squareArray = []
    for (let i = 0; i < 9; i++) {
        const newSquare = renderSquare(i)
        squareArray.push(newSquare)
    }

    return (
            <>
                <Status message={state.statusMessage} />
                <div className="board">
                    {squareArray}
                </div>
            <ScoreBoard player1={['You', state.currentPlayerScore]} player2={[state.opponentPlayer[0], state.opponentPlayer[1]] } />
                <PlayAgain end={state.end} onClick={playAgainRequest} />
            </>
        
    );
}



export default Game;
