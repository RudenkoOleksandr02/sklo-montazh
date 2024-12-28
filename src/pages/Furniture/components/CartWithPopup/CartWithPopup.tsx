import React, {FC, useEffect} from 'react';
import cl from "../Furniture.module.css";
import CartButton from "../../../components/ui/buttons/CartButton/CartButton";
import Popup from "../../../components/ui/Popup/Popup";
import {IProduct} from "../../../types";

interface CartWithPopupProps {
    products: IProduct[];
    generalQuantity: number;
    addProduct: (product: IProduct) => void;
    reduceQuantityOfProductById: (id: number | string) => void;
    deleteProductById: (id: number | string) => void;
    isOpenCart: boolean;
    setIsOpenCart: (isOpenCart: boolean) => void;
}

const CartWithPopup: FC<CartWithPopupProps> = ({
                                                   generalQuantity,
                                                   products,
                                                   addProduct,
                                                   reduceQuantityOfProductById,
                                                   deleteProductById,
                                                   isOpenCart,
                                                   setIsOpenCart
                                               }) => {
    useEffect(() => {
        if (!generalQuantity) {
            setIsOpenCart(false);
        }
    }, [generalQuantity]);

    return (
        <>
            <div className={cl.cart}>
                <CartButton countProduct={generalQuantity} onClick={() => setIsOpenCart(true)}/>
            </div>
            <Popup active={isOpenCart} setActive={setIsOpenCart}>
                <div className={cl.popupForCart}>
                    <h3>Кошик</h3>
                    <div className={cl.products}>
                        {products.map((product, index) => (
                            <div key={product.id} className={cl.product}>
                                <div className={cl.inner}>
                                    <div className={cl.imageContainer}>
                                        <img src={product.image.url}
                                             alt={product.image.alternativeText || 'furniture ' + index}/>
                                    </div>
                                    <div className={cl.articleWithName}>
                                        <p>{product.name}</p>
                                        <p>Артикул: {product.article}</p>
                                    </div>
                                </div>
                                <div className={cl.inner}>
                                    <p>{product.price * product.quantity}₴</p>
                                    <div className={cl.buttonsAndQuantity}>
                                        <button onClick={() => reduceQuantityOfProductById(product.id)}>-</button>
                                        {product.quantity}
                                        <button onClick={() => addProduct(product)}>+</button>
                                    </div>
                                    <button onClick={() => deleteProductById(product.id)}>delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Popup>
        </>

    );
};

export default CartWithPopup;