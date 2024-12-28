import React, {FC} from 'react';
import cl from './PrimaryButton.module.css';

interface PrimaryButtonProps {
    width: string;
    minWidth?: string;
    height: string;
    padding: string;
    children: React.ReactNode;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({width, height, padding, children, minWidth}) => {
    return (
        <button style={{width, height, padding, minWidth: minWidth ? minWidth : 'auto'}} className={cl.button}>
            {children}
        </button>
    );
};

export default PrimaryButton;