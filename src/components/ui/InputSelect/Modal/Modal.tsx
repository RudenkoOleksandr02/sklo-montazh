import React, {FC} from 'react';
import classes from './Modal.module.css';

interface ModalProps {
    show: boolean;
    children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ show, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={classes.modal}>
            <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;