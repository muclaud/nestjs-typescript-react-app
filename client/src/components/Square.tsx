import React from 'react';
import Icon from './Icon';

interface SquareProp {
    onClick: any;
    value: string;
    player: string;
    end: boolean;
    id : number;
    turn: boolean;
}

const Square: React.FC<SquareProp> = (props: SquareProp) => {
    const { onClick, id } = props
    return (
        <div className="square" onClick={onClick(id)}>
            <Icon {...props} />
        </div>
    );
}

export default Square;
