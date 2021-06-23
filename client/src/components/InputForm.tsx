import React from 'react';
import Input from './Input';
import ChoiceButton from './ChoiceButton';

interface InputFormProp {
    onSubmit: any;
    name: string;
    room: string;
    setName: any;
    setRoom: any;
    newGame: string;
}

const InputForm: React.FC<InputFormProp> = (props: InputFormProp) => {

    const { onSubmit, setName, setRoom, newGame, name, room } = props


    if (newGame) {
        return (
            <div className="input-container">
                <Input
                    name='name'
                    placeholder='Your Name...'
                    value={name}
                    setProp={setName}
                    
                />
                <div className='nav-container'>
                    <ChoiceButton type='nav-forward' onSubmit={onSubmit} label="Let's Go" />
                </div>
            </div>
        );
    } else {
        return (
            <div className="input-container">
                <Input
                    name='name'
                    placeholder='Your Name...'
                    value={name}
                    setProp={setName}
                />
                <Input
                    name='room'
                    placeholder='Room ID...'
                    value={room}
                    setProp={setRoom}
                />
                <div className='nav-container'>
                    <ChoiceButton type='nav-forward' onSubmit={onSubmit} label="Let's Go" />

                </div>
            </div>
        );
    }
}



export default InputForm;