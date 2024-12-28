import React, {FC} from 'react';
import cl from './CartButton.module.css';
import CartImage from './../../../../assets/images/cart.png'

interface CartButtonProps {
    countProduct: number;
    onClick: () => void;
}

const CartButton: FC<CartButtonProps> = ({countProduct, onClick}) => {
    return (
        <div className={`${cl.wrapper} ${!countProduct ? cl.notProducts : ''}`} onClick={!!countProduct ? onClick : () => {}}>
            <span className={cl.count}>{countProduct}</span>
            <div className={cl.imageContainer}>
                <img src={CartImage} alt="CartImage"/>
            </div>
        </div>
    );
};

export default CartButton;