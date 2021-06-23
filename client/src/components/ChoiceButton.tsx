import React from 'react';

interface ChoiceButtonProp {
    type: string;
    label: any;
    onSubmit: any;
}

const ChoiceButton: React.FC<ChoiceButtonProp> = (props: ChoiceButtonProp) => {
    const { type, label, onSubmit } = props
    return (
        <div className={`btn btn-${type}`} onSubmit={onSubmit}>{label}</div>
    );
}

export default ChoiceButton;
