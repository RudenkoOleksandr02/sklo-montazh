import React, {FC, useState} from 'react';
import cl from "./InputMobile.module.css";
import {PatternFormat} from "react-number-format";

interface InputMobileProps {
    phone: string;
    isErrorPhone: boolean;
    changePhoneHandler: (value: string) => void;
}

const InputMobile: FC<InputMobileProps> = ({changePhoneHandler, phone, isErrorPhone}) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleValueChange = (values: any) => {
        const {value} = values;
        changePhoneHandler('+38' + value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };


    return (
        <div className={`${cl.mobileContainer} ${isErrorPhone ? cl.error : ''}`}>
            <label htmlFor='phone'>
                <span>Номер</span>
            </label>
            <PatternFormat
                id='phone'
                format="+38 (###) ### ## ##"
                mask="_"
                value={phone.replace(/^\+38/, '')}
                onValueChange={handleValueChange}
                allowEmptyFormatting={isFocused}
                type="tel"
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    );
};

export default InputMobile;