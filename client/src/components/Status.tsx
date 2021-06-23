import React from 'react';

interface StatusProp {
    message: string;
}

const Status: React.FC<StatusProp> = (props: StatusProp ) => {
    return (
        <div className='status'>
            <h1 className="status-message">{props.message}</h1>
        </div>
    )
}

export default Status;