import React, {FC} from 'react';
import {ReactComponent as LogoWhite} from './../../../assets/images/logo_white.svg';
import cl from './Header.module.css';
import {Link, useLocation} from "react-router-dom";
import MenuButton, {MenuVariant} from "../../ui/buttons/MenuButton/MenuButton";
import linksToPages from '../../../data/linksToPages.json';
import BlockContent, {BlockContentVariant} from "../../ui/BlockContent/BlockContent";
import DropDownListForLink from "../../ui/DropDownListForLink/DropDownListForLink";

import linksToServices from "../../../data/linksToServices.json";

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
    const location = useLocation();

    const linksJSX: React.JSX.Element = (
        <div className={cl.links}>
            <DropDownListForLink title='Послуги' mainLink='/services' handleLinkClick={() => {}}>
                {linksToServices.map(link => (
                    <Link to={link.path} key={link.path}>{link.title}</Link>
                ))}
            </DropDownListForLink>
            <Link to={linksToPages[1].path}>{linksToPages[1].title}</Link>
            <Link
                  onClick={(e) => {
                      if (`/${location.pathname.split('/')[1]}` === `/${linksToPages[2].path.split('/')[1]}`) {
                          e.preventDefault();
                      }
                  }}
                  to={linksToPages[2].path}
                  aria-disabled={`/${location.pathname.split('/')[1]}` === `/${linksToPages[2].path.split('/')[1]}`}
            >{linksToPages[2].title}
            </Link>
            <Link to={linksToPages[3].path}>{linksToPages[3].title}</Link>
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