import React, {FC} from 'react';
import cl from './Footer.module.css';
import {ReactComponent as Logo} from "../../../assets/images/logo_orange.svg";
import {ReactComponent as Instagram} from "../../../assets/images/instagram.svg";
import {ReactComponent as Whatsapp} from "../../../assets/images/whatsapp.svg";
import {ReactComponent as Viber} from "../../../assets/images/viber.svg";
import {ReactComponent as Telegram} from "../../../assets/images/telegram.svg";
import linksToSocials from '../../../data/linksToSocials.json';
import linksToPages from '../../../data/linksToPages.json';
import LinkAnimaUnderline, {colorVariant} from "../../ui/LinkAnimaUnderline/LinkAnimaUnderline";
import Feedback from "../Feedback/Feedback";

const Footer: FC = () => {
    return (
        <footer className={cl.wrapper}>
            <div className={cl.header}>
                <div className={cl.pages}>
                    <h4>Сторінки</h4>
                    {linksToPages.map(item => (
                        <LinkAnimaUnderline
                            path={item.path}
                            key={item.path}
                            variant={colorVariant.dark}
                            fontSize='16px'
                        >
                            {item.title}
                        </LinkAnimaUnderline>
                    ))}
                </div>
                <div className={cl.contacts}>
                    <h4>Контакти</h4>
                    <a href="tel:+380673843181">+38 (067) 384 31 81</a>
                    <p>sklomontag@gmail.com</p>
                    <p>Офіс: м.Київ вул. Івана Франка, 3, Київ, 01030</p>
                    <p>Склад: м.Київ вул. Бориспільська 9</p>
                </div>
                <div className={cl.feedback}>
                    <Feedback/>
                </div>
            </div>
            <div className={cl.footer}>
                <div className={cl.logo}><Logo/></div>
                <div className={cl.socials}>
                    <a href={linksToSocials[0].path}><Instagram/></a>
                    <a href={linksToSocials[1].path}><Whatsapp/></a>
                    <a href={linksToSocials[2].path}><Viber/></a>
                    <a href={linksToSocials[3].path}><Telegram/></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;