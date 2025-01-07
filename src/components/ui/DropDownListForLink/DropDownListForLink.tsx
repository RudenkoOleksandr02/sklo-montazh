import React, {FC, useRef, useState} from 'react';
import cl from './DropDownListForLink.module.css';
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import {ReactComponent as ArrowIco} from './../../../assets/images/arrowBottom2.svg';

interface DropDownListForLinkProps {
    children: React.ReactNode;
    title: string;
    mainLink: string;
    handleLinkClick: () => void;

}

const DropDownListForLink: FC<DropDownListForLinkProps> = ({mainLink, handleLinkClick, children, title}) => {
    const [showDropDownList, setShowDropDownList] = useState<boolean>(false);
    const dropDownListRef = useRef<HTMLDivElement>(null);
    const toggleShowCategories = () => {
        setShowDropDownList(!showDropDownList)
    };
    const handleMouseEnter = () => {
        setShowDropDownList(true);
    };

    const handleMouseLeave = () => {
        setShowDropDownList(false);
    };

    return (
        <div
            className={cl.container}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={cl.mainLink}>
                <Link onClick={handleLinkClick} to={mainLink}>{title}</Link>
                <div className={cl.rowWrap} onClick={toggleShowCategories}>
                    <ArrowIco
                        className={`${cl.row} ${showDropDownList ? cl.rotated : ''}`}
                    />
                </div>
            </div>
            <CSSTransition
                nodeRef={dropDownListRef}
                in={showDropDownList}
                timeout={300}
                classNames={{
                    enter: cl['my-dropDownList-enter'],
                    enterActive: cl['my-dropDownList-enter-active'],
                    exit: cl['my-dropDownList-exit'],
                    exitActive: cl['my-dropDownList-exit-active']
                }}
                unmountOnExit
            >
                <div className={cl.dropDownList} ref={dropDownListRef}>
                    {children}
                </div>
            </CSSTransition>
        </div>
    );
};

export default DropDownListForLink;