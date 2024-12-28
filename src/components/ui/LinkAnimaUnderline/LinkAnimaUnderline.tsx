import React, {FC} from 'react';
import {Link} from "react-router-dom";
import cl from './LinkAnimaUnderline.module.css';

export enum colorVariant {
    white = 'white',
    dark = 'dark'
}

interface LinkAnimaUnderlineProps {
    path: string;
    children: React.ReactNode;
    variant: colorVariant;
    fontSize?: string;
}

const LinkAnimaUnderline: FC<LinkAnimaUnderlineProps> = ({path, children, variant, fontSize}) => {
    return <>
        {variant === colorVariant.white && (
            <Link to={path} className={cl.link + ' ' + cl.white} style={{fontSize}}>
                {children}
            </Link>
        )}
        {variant === colorVariant.dark && (
            <Link to={path} className={cl.link + ' ' + cl.dark} style={{fontSize}}>
                {children}
            </Link>
        )}
    </>;
};

export default LinkAnimaUnderline;