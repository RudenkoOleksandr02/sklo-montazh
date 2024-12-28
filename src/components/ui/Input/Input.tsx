import React, {FC} from 'react';
import cl from './Input.module.css';
import {v4 as uuidv4} from 'uuid';

interface InputProps {
    value: string | number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    title: string;
    isError?: boolean;
    type?: string;
    disabled?: boolean;
    autoComplete?: boolean;
    handleBlur?: () => void;
    handleFocus?: () => void;
}

const Input: FC<InputProps> = ({
                                   value,
                                   handleChange,
                                   title,
                                   isError,
                                   type = 'text',
                                   disabled = false,
                                   autoComplete = true,
                                   handleBlur = () => {},
                                   handleFocus = () => {}
                               }) => {
    const id = uuidv4();

    return (
        <div className={`${cl.wrapper} ${isError ? cl.error : ''}`}>
            <label htmlFor={id}>
                <span>{title}</span>
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={handleChange}
                autoComplete={autoComplete ? 'on' : 'off'}
                disabled={disabled}
                onBlur={handleBlur}
                onFocus={handleFocus}
            />
        </div>
    );
};

export default Input;