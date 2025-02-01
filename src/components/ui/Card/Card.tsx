import React, {FC} from 'react';
import cl from './Card.module.css';
import Skeleton from "../Skeleton/Skeleton";
import SecondaryButton from "../buttons/SecondaryButton/SecondaryButton";

interface CardProps {
    img: {src: string, alternativeText: string};
    firstButton: {text: string, onClick: () => void};
    secondaryButton: {text: string, onClick: () => void};
    title: string;
    price: number;
    inStock: boolean;
    quantityInCart: number;
    onClickWrapp?: () => void;
}

const Card: FC<CardProps> = ({img, title, price, firstButton, secondaryButton, inStock, quantityInCart, onClickWrapp}) => {
    return (
        <div className={`${cl.wrapper} ${!inStock ? cl.isntStock : ''}`} onClick={onClickWrapp}>
            <Skeleton
                src={img.src}
                alt={img.alternativeText}
                onClick={() => {}}
                classNameImage={cl.image}
                classNameSkeleton={cl.skeleton}
            />
            <p className={cl.title}>{title}</p>
            <span className={cl.price}>{price} ₴</span>
            <div className={cl.button} onClick={e => e.stopPropagation()}>
                {quantityInCart > 0 ? (
                    <SecondaryButton onClick={() => secondaryButton.onClick()}>
                        {secondaryButton.text}
                    </SecondaryButton>
                ) : (
                    <SecondaryButton onClick={() => firstButton.onClick()} disabled={!inStock}>
                        {firstButton.text}
                    </SecondaryButton>
                )}
            </div>
        </div>
    );
};

export default Card;