import React, {FC} from 'react';
import cl from './Preloader.module.css'
import preloader1 from './preloader1.png'
import preloader2 from './preloader2.png'

export enum PreloaderVariant {
    variant1 = 'variant1',
    variant2 = 'variant2'
}

interface PreloaderProps {
    variant?: PreloaderVariant
}

const Preloader: FC<PreloaderProps> = ({variant = PreloaderVariant.variant1}) => {
    return (
        <div className={cl.preloader}>
            {variant === PreloaderVariant.variant1 && <img src={preloader1} alt='Preloader1'/>}
            {variant === PreloaderVariant.variant2 && <img src={preloader2} alt='Preloader2'/>}
        </div>
    );
};

export default Preloader;