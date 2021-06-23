import React from 'react';
import CSS from 'csstype';

const beforeStyle: CSS.Properties = {
    background: 'black',
    width: '90%',
    height: '90%',
    position: 'absolute',
    borderRadius: '50%',
}

const afterStyle: CSS.Properties = {
    background: 'var(--mid-blue)',
    width: '70%',
    height: '70%',
    position: 'absolute',
    borderRadius: '50%',
}

const O: React.FC = () => { 
    return (
        <>
            <div className="before" style={beforeStyle}></div>
            <div className="after" style={afterStyle}></div>
        </>
    );
}

export default O;
