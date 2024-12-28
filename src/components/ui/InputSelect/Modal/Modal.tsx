import React, {FC} from 'react';
import classes from './Modal.module.css';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={classes.modal} onClick={onClose}>
            <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;