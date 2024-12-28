import React, {FC} from 'react';
import cl from './BlockContent.module.css';

export enum BlockContentVariant {
    variant1 = 'variant1',
    variant2 = 'variant2',
    variant3 = 'variant3',
}

interface BlockContentProps {
    children: React.ReactNode;
    variant?: BlockContentVariant;
}

const BlockContent: FC<BlockContentProps> = ({children, variant = BlockContentVariant.variant1}) => {
    return (
        <div className={`${cl.wrapper} 
            ${variant === BlockContentVariant.variant1 ? cl.variant1 : ''}
            ${variant === BlockContentVariant.variant2 ? cl.variant2 : ''}
            ${variant === BlockContentVariant.variant3 ? cl.variant3 : ''}
        `}>
            {children}
        </div>
    );
};

export default BlockContent;