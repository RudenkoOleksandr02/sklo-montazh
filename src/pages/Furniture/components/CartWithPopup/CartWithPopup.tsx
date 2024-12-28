import React, {FC, useEffect} from 'react';
import cl from "./CartWithPopup.module.css";
import CartButton from "../../../../components/ui/buttons/CartButton/CartButton";
import Popup from "../../../../components/ui/Popup/Popup";
import {IProduct} from "../../../../types";
import Products from "./Products/Products";
import DeliveryData from "./PlacingOrder/DeliveryData";
import PlacingOrder from "./PlacingOrder/PlacingOrder";

export interface ProductsState {
    products: IProduct[];
    addProduct: (product: IProduct) => void;
    reduceQuantityOfProductById: (id: number | string) => void;
    deleteProductById: (id: number | string) => void;
}

interface CartWithPopupProps extends ProductsState {
    generalQuantity: number;
    generalPrice: number;
    isOpenCart: boolean;
    setIsOpenCart: (isOpenCart: boolean) => void;
    cleanCart: () => void;
}

const CartWithPopup: FC<CartWithPopupProps> = ({
                                                   generalQuantity,
                                                   generalPrice,
                                                   products,
                                                   addProduct,
                                                   reduceQuantityOfProductById,
                                                   deleteProductById,
                                                   isOpenCart,
                                                   setIsOpenCart,
                                                   cleanCart
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
            <Popup active={isOpenCart} setActive={setIsOpenCart} isCustomClose={true}>
                <div className={cl.popupForCart}>
                    <div className={cl.closeWithH3}>
                        <h3>Кошик</h3>
                        <div className={cl.close} onClick={() => setIsOpenCart(false)}>
                            <span/>
                            <span/>
                        </div>
                    </div>
                    <Products
                        products={products}
                        addProduct={addProduct}
                        reduceQuantityOfProductById={reduceQuantityOfProductById}
                        deleteProductById={deleteProductById}
                    />
                    <div className={cl.generalPrice}>Загальна ціна: <span>{generalPrice}₴</span></div>
                    <PlacingOrder cleanCart={cleanCart} products={products} generalPrice={generalPrice}/>
                </div>
            </Popup>
        </>

    );
};

export default CartWithPopup;