import React, {FC} from 'react';
import {ReactComponent as LogoWhite} from './../../../assets/images/logo_white.svg';
import cl from './Header.module.css';
import {Link} from "react-router-dom";
import MenuButton, {MenuVariant} from "../../ui/buttons/MenuButton/MenuButton";
import LinkAnimaUnderline, {colorVariant} from "../../ui/LinkAnimaUnderline/LinkAnimaUnderline";
import linksToPages from '../../../data/linksToPages.json';
import BlockContent, {BlockContentVariant} from "../../ui/BlockContent/BlockContent";

export enum HeaderVariant {
    variant1 = 'variant1',
    variant2 = 'variant2',
    variant3 = 'variant3',
}

interface HeaderProps {
    variant: HeaderVariant;
    setIsOpenMobileMenu: () => void;
}

const Header: FC<HeaderProps> = ({variant, setIsOpenMobileMenu}) => {
    const linksJSX: React.JSX.Element = (
        <div className={cl.links}>
            {linksToPages.map(link => (
                <LinkAnimaUnderline key={link.path} path={link.path}
                                    variant={colorVariant.white}>{link.title}</LinkAnimaUnderline>
            ))}
        </div>
    );

    return (
        <header
            className={`
                ${cl.wrapper}
                ${variant === HeaderVariant.variant1 ? cl.variant1 : ''}
                ${variant === HeaderVariant.variant2 ? cl.variant2 : ''}
                ${variant === HeaderVariant.variant3 ? cl.variant3 : ''}
            `}
        >
            <BlockContent variant={
                variant === HeaderVariant.variant1 && BlockContentVariant.variant1 ||
                variant === HeaderVariant.variant2 && BlockContentVariant.variant2 ||
                variant === HeaderVariant.variant3 && BlockContentVariant.variant3 ||
                BlockContentVariant.variant1
            }>
                <div className={cl.inner}>
                    <div className={cl.logo}>
                        <Link to='/'><LogoWhite/></Link>
                    </div>
                    {linksJSX}
                    <div className={cl.menu_button}>
                        <MenuButton variant={
                            variant === HeaderVariant.variant1 && MenuVariant.white ||
                            variant === HeaderVariant.variant2 && MenuVariant.dark ||
                            variant === HeaderVariant.variant3 && MenuVariant.white ||
                            MenuVariant.white
                        } onClick={setIsOpenMobileMenu}/>
                    </div>
                </div>
            </BlockContent>
        </header>
    );
};

export default Header;