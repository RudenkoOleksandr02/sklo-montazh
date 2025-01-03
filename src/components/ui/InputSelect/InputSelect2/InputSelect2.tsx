import React, {FC, useState} from 'react';
import cl from './InputSelect2.module.css';
import {IOption} from "../../../containers/Calculator/Calculator";
import Modal from "./../Modal/Modal";

interface InputSelect2Props {
    label: string;
    options: { id: number, option: string }[];
    value: IOption;
    onClick: (option: IOption) => void;
}

const InputSelect2: FC<InputSelect2Props> = ({label, options, value, onClick}) => {
    const [isShowed, setIsShowed] = useState<boolean>(false);

    const handleSelect = (option: IOption) => {
        setIsShowed(false);
        onClick(option);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsShowed(false);
        }
    };

    return (
        <div
            className={cl.wrapper}
            tabIndex={-1}
            onBlur={handleBlur}
        >
            <div className={cl.inner}>
                <span className={cl.label}>{label}</span>
                <div
                    className={cl.selectedWithArrow}
                    onClick={() => setIsShowed(!isShowed)}
                >
                    <div className={cl.selected}>
                        {options.find(option => option.id === value.id)?.option}
                    </div>
                    <div className={`${cl.arrow} ${isShowed ? cl.rotated : ''}`}>
                        <span/>
                        <span/>
                    </div>
                </div>
            </div>
            <Modal show={isShowed}>
                {options.map(option => (
                    <div
                        key={option.id}
                        className={cl.option}
                        onClick={() => handleSelect(option)}
                    >
                        {option.option}
                    </div>
                ))}
            </Modal>
        </div>
    );
};

export default InputSelect2;
