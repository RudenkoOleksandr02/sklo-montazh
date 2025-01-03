import React, {FC} from 'react';
import cl from './Checkbox.module.css';
import {ReactComponent as CheckIco} from './../../../assets/images/checkIcon.svg';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({label, checked, onChange}) => {
    return (
        <div className={cl.wrapper} onClick={() => onChange(!checked)}>
            <span className={`${cl.checkbox} ${checked ? cl.cheched : ''}`}>{checked && <CheckIco/>}</span>
            <span className={cl.label}>{label}</span>
        </div>
    );
};

export default Checkbox;