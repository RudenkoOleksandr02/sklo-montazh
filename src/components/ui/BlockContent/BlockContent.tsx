import React, {FC} from 'react';
import cl from './BlockBlurredBackground.module.css';

interface BlockBlurredBackgroundProps {
    children: React.ReactNode;
    isClearStyle?: boolean;
}

const BlockBlurredBackground: FC<BlockBlurredBackgroundProps> = ({children, isClearStyle}) => {
    return (
        <div className={`${cl.wrapper} ${isClearStyle ? cl.withoutStyle : cl.withStyle}`}>
            {children}
        </div>
    );
};

export default BlockBlurredBackground;