import React, { FC, useEffect, useState } from 'react';
import cl from './PrimaryButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface PrimaryButtonProps {
    width: string;
    minWidth?: string;
    onClick: () => void;
    height: string;
    padding: string;
    children: React.ReactNode;
    isSuccess?: boolean;
    resetSuccess?: () => void;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
                                                   width,
                                                   height,
                                                   padding,
                                                   children,
                                                   minWidth,
                                                   onClick,
                                                   isSuccess,
                                                   resetSuccess,
                                               }) => {
    const [buttonClass, setButtonClass] = useState<string>("");

    useEffect(() => {
        if (isSuccess) {
            setButtonClass("onClick");
            setTimeout(() => {
                setButtonClass("validate");
            }, 2250);

            // Сброс класса и успешного состояния
            const timer = setTimeout(() => {
                setButtonClass("");
                if (resetSuccess) {
                    resetSuccess();
                }
            }, 3500);

            return () => clearTimeout(timer);
        }
    }, [isSuccess]);

    return (
        <button
            style={{ width, height, padding, minWidth: minWidth || 'auto' }}
            className={`
                ${cl.button} 
                ${buttonClass === "validate" ? cl.validate : ''}
                ${buttonClass === "onClick" ? cl.onClick : ''}        
            `}
            onClick={onClick}
        >
            {buttonClass !== "onClick" && buttonClass !== "validate" && (
                <span className={cl.text}>{children}</span>
            )}
            {buttonClass === "validate" && <FontAwesomeIcon icon={faCheck} />}
        </button>
    );
};

export default PrimaryButton;
