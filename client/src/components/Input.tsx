import React from 'react';

interface InputProp {
    name: string;
    placeholder: string;
    value: string;
    setProp: any;
}

const Input: React.FC<InputProp> = (props:InputProp) => {
    const { name, placeholder, value, setProp } = props
    return (
        <input autoComplete='off' type="text" name={name} id={name} placeholder={placeholder} value={value} onChange={(e) => setProp(e.target.value)} />
    );
}

export default Input;
