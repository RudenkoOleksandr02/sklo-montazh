import React, {FC} from 'react';
import cl from './Checkbox.module.css';
import {v4 as uuidv4} from 'uuid'

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
}

const Checkbox: FC<CheckboxProps> = ({label, checked, onChange}) => {
    const id = uuidv4();

    return (
        <div className={cl.wrapper}>
            <input id={id} type='checkbox' checked={checked} onChange={onChange}/>
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default Checkbox;