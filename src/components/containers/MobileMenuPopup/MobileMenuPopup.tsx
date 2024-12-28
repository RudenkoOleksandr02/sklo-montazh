import React, {FC, useEffect, useState} from 'react';
import cl from './MobileMenuPopup.module.css';
import {ReactComponent as Close} from './../../../assets/images/close.svg';
import {Link} from "react-router-dom";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    linksData: { path: string, title: string }[];
}

const MobileMenuPopup: FC<MobileMenuProps> = ({isOpen, onClose, linksData}) => {
    const [isClosing, setIsClosing] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsClosing(false);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 200)
    }

    return (
        <div className={`${cl.modal} ${isOpen ? cl.isOpen : ''}`} onClick={handleClose}>
            <div onClick={e => e.stopPropagation()}
                 className={`${cl.modal_content} ${isOpen ? cl.isOpen : ''} ${isClosing ? cl.isClosing : ''}`}>
                <button className={cl.button} onClick={handleClose}>
                    <Close/>
                </button>
                <div className={cl.links}>
                    {linksData.map(link => (
                        <Link key={link.path} to={link.path} onClick={() => onClose()}>{link.title}</Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MobileMenuPopup;