import React, {FC} from 'react';
import cl from './InputText.module.css';
import {v4 as uuidv4} from 'uuid';

interface InputProps {
    value: string | number;
    handleChange: (value: string) => void;
    title: string;
    isError?: boolean;
    type?: string;
    disabled?: boolean;
    autoComplete?: boolean;
    handleBlur?: () => void;
    handleFocus?: () => void;
    onlyText?: boolean;
}

const InputText: FC<InputProps> = ({
                                       value,
                                       handleChange,
                                       title,
                                       isError,
                                       type = 'text',
                                       disabled = false,
                                       autoComplete = true,
                                       handleBlur = () => {
                                       },
                                       handleFocus = () => {
                                       },
                                       onlyText = true,
                                   }) => {
    const id = uuidv4();

    const handleInputOnlyTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^[a-zA-Zа-яА-ЯёЁїЇіІєЄґҐ\s]*$/.test(newValue)) {
            handleChange(newValue);
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e.target.value)
    }


    return (
        <div className={`${cl.wrapper} ${isError ? cl.error : ''}`}>
            <label htmlFor={id}>
                <span>{title}</span>
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onlyText ? handleInputOnlyTextChange : handleInputChange}
                autoComplete={autoComplete ? 'on' : 'off'}
                disabled={disabled}
                onBlur={handleBlur}
                onFocus={handleFocus}
            />
        </div>
    );
};

export default InputText;