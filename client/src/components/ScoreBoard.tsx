import React from 'react';
import Score from './Score';


interface ScoreBoardProp {
    player1: [string, number];
    player2: [string, number];
}

const ScoreBoard: React.FC<ScoreBoardProp> = (props: ScoreBoardProp) => {

    const player1 = props.player1;
    const player2 = props.player2;
    return (
        <div className='score-board'>
            <h1 className="score-title">Score Board</h1>
            <Score name={player1[0]} score={player1[1]} />
            <Score name={player2[0]} score={player2[1]} />
        </div>
    )
}
export default ScoreBoard