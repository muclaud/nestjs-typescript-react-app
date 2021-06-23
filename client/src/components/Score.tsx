import React from 'react';

interface ScoreProp {
    name: string;
    score: number;
}

const Score: React.FC<ScoreProp> = (props: ScoreProp) => {

        const { name, score } = props;
    return (
        <div className='score-container'>
            <h1 className='name'>{name}</h1>
            <h1 className='score'>{score}</h1>
        </div>
    )
}

export default Score;