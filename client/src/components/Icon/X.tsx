import React from 'react';
import CSS from 'csstype';

const beforeStyle: CSS.Properties = {
    background: 'black',
    width: '93%',
    height: '13%',
    position: 'absolute',
    transform: 'rotate(45deg)'
}

const afterStyle: CSS.Properties = {
    background: 'black',
    width: '93%',
    height: '13%',
    position: 'absolute',
    transform: 'rotate(-45deg)'
}

const X: React.FC = () => {
    return (
        <>
            <div className="before" style={beforeStyle}></div>
            <div className="after" style={afterStyle}></div>
        </>
    );
}

export default X;
