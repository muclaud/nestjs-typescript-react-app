import React from 'react';
import X from './X'
import O from './O'

interface IconProp {
    onClick: any;
    value: string;
    player: string;
    end: boolean;
    id: number;
    turn: boolean;
}

const Icon: React.FC<IconProp> = (props: IconProp) => {

    switch (props.value){
        case 'X':
            return <X />
        case 'O':
            return <O />
        default:
            if (props.end || !props.turn){
                return <div></div>
            }else{
                switch (props.player){
                    case 'X':
                        return <div className='placeHolder'><X /></div>
                    case 'O':
                        return <div className='placeHolder'><O /></div>
                    default:
                        return <div></div>
                }   
            }
    }
}

export default Icon;
