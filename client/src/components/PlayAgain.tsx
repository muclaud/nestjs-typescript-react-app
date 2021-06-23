import React from 'react'


interface PlayAgainProp {
    end: boolean;
    onClick: any;
}

const PlayAgain: React.FC<PlayAgainProp> = (props: PlayAgainProp) => {

    const { onClick, end } = props;
    return (
        <div className='again-container'>
            <button className='again-button' onClick={onClick} style={{ visibility: end ? 'visible' : 'hidden', opacity: end ? '1' : '0' }}>Play Again</button>
        </div>
    )
}
export default PlayAgain;