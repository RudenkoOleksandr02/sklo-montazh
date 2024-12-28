import React, {FC} from 'react';
import cl from './InputNumber.module.css';
import {v4 as uuidv4} from 'uuid';

interface InputNumberProps {
    label: string;
    value: number | string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputNumber: FC<InputNumberProps> = ({label, value, onChange, onBlur}) => {
    const id = uuidv4();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (["e", "E", "+", "-"].includes(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <div className={cl.wrapper}>
            <label htmlFor={id}>{label}</label>
            <input id={id} type='number' value={value} onChange={onChange} onBlur={onBlur} onKeyDown={handleKeyDown}/>
        </div>
    );
};

export default InputNumber;