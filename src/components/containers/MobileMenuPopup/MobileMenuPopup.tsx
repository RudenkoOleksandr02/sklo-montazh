import React, {FC} from 'react';
import MenuButton from "../../ui/buttons/MenuButton/MenuButton";

enum VariantMenuButton {
    white = 'white',
    dark = 'dark'
}

interface MobileMenuProps {
    variantButton: VariantMenuButton;
}

const MobileMenu: FC<MobileMenuProps> = ({variantButton}) => {
    return (
        <div>
            <MenuButton variant={}/>
        </div>
    );
};

export default MobileMenu;