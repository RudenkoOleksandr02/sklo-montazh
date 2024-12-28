import React, {FC} from 'react';
import cl from './InputSelect2.module.css';
import {v4 as uuidv4} from 'uuid';
import {IOption} from "../../containers/Calculator/Calculator";

interface InputSelect2Props {
    label: string;
    options: {id: number, option: string}[];
    value: IOption;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect2: FC<InputSelect2Props> = ({label, options, value, handleChange}) => {
    const id = uuidv4();

    return (
        <div className={cl.wrapper}>
            <label htmlFor={id}>{label}</label>
            <select id={id} value={value.option} onChange={handleChange}>
                {options.map(option => (
                    <option key={option.id} value={option.option}>{option.option}</option>
                ))}
            </select>
        </div>
    );
};

export default InputSelect2;