import React, {FC} from 'react';
import cl from './SecondaryButton.module.css';

interface SecondaryButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({children, onClick, disabled = false, active}) => {
    return (
        <button className={`${cl.btn} ${active ? cl.active : ''}`} onClick={onClick} disabled={disabled}>
            <span>{children}</span>
        </button>
    );
};

export default SecondaryButton;