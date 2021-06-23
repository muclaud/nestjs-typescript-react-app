import React, { useEffect, useState} from 'react';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom'


import InputForm from '../../components/InputForm';




const Home: React.FC = () => {

    const InitialState: {
        newGame: any;
        serverConfirmed: boolean;
    } = {
        newGame: null,
        serverConfirmed: false,
    };

    const [state, setState] = useState(InitialState);
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')


    const socket = io('http://localhost:5000/')
    
    useEffect(() => {

        socket.on('newGameCreated', (room: string) => {
            setState({ ...state, serverConfirmed: true })
            setRoom(room)
        })
        socket.on('joinConfirmed', () => {
            setState({ ...state, serverConfirmed: true })
        })
        
        return () => {
            socket.disconnect()
        }

    }, [state, socket]);
    

    const onSubmit = () => {
            if (state.newGame) {
                socket.emit('newGame')
            } else {
                socket.emit('joining', { room: room })
            }
        }
    
    let render;
        if (state.serverConfirmed) {
            render = (
                <Redirect to={`/game?room=${room}&name=${name}`} />
            )
        } else {
            render = (
                <div>
                    <InputForm
                        onSubmit={onSubmit}
                        newGame={state.newGame}
                        name={name}
                        room={room}
                        setName={setName}
                        setRoom={setRoom} />
                </div>
            );
        }
    
        return (
    <div>{render}</div>
    )
};

export default Home;