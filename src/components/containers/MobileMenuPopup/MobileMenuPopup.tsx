import React, {FC, useEffect, useState} from 'react';
import cl from './MobileMenuPopup.module.css';
import {ReactComponent as Close} from './../../../assets/images/close.svg';
import {Link} from "react-router-dom";
import linksToServices from "../../../data/linksToServices.json";
import DropDownListForLink from "../../ui/DropDownListForLink/DropDownListForLink";
import linksToPages from "../../../data/linksToPages.json";
import {ReactComponent as Logo} from './../../../assets/images/logo_white.svg';

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
                <div className={cl.inner}>
                    <button className={cl.button} onClick={handleClose}>
                        <Close/>
                    </button>
                    <div className={cl.links}>
                        <DropDownListForLink title='Послуги' mainLink='/services' handleLinkClick={() => onClose()}>
                            {linksToServices.map(link => (
                                <Link to={link.path} key={link.path} onClick={() => onClose()}>{link.title}</Link>
                            ))}
                        </DropDownListForLink>
                        <Link to={linksToPages[1].path} onClick={() => onClose()}>{linksToPages[1].title}</Link>
                        <Link to={linksToPages[2].path} onClick={() => onClose()}>{linksToPages[2].title}</Link>
                        <Link to={linksToPages[3].path} onClick={() => onClose()}>{linksToPages[3].title}</Link>
                    </div>
                </div>
                <div className={cl.bottom}>
                    <a href="tel:+380673843181">+38 (067) 384 31 81</a>
                    <Logo/>
                </div>
            </div>
        </div>
    );
};

export default MobileMenuPopup;