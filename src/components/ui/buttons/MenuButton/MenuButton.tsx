import React, {FC} from 'react';

export enum MenuVariant {
    white = 'white',
    dark = 'dark'
}

interface MenuProps {
    variant: MenuVariant;
}

const Menu: FC<MenuProps> = ({variant}) => {
    return (
        <div>
            
        </div>
    );
};

export default Menu;