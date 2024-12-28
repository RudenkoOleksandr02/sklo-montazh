import React, {FC} from 'react';
import {ReactComponent as MenuWhite} from './../../../../assets/images/menu_white.svg';
import {ReactComponent as MenuDark} from './../../../../assets/images/menu_dark.svg';
import cl from './MenuButton.module.css';


export enum MenuVariant {
    white = 'white',
    dark = 'dark'
}

interface MenuProps {
    variant: MenuVariant;
    onClick: () => void;
}

const MenuButton: FC<MenuProps> = ({variant, onClick}) => {
    return (
        <button className={cl.button} onClick={onClick}>
            {variant === MenuVariant.white && <MenuWhite/>}
            {variant === MenuVariant.dark && <MenuDark/>}
        </button>
    );
};

export default MenuButton;