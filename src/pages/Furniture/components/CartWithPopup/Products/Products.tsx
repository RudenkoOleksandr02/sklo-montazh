import React, {createRef, FC} from 'react';
import cl from './Products.module.css'
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {ProductsState} from "../CartWithPopup";

const Products: FC<ProductsState> = ({products, reduceQuantityOfProductById, addProduct, deleteProductById}) => {
    return (
        <div className={cl.products}>
            <TransitionGroup component={null}>
                {products.map((product, index) => {
                    const nodeRef = createRef<HTMLDivElement>();

                    return <CSSTransition
                        key={product.id}
                        timeout={300}
                        nodeRef={nodeRef}
                        unmountOnExit
                        classNames={{
                            enter: cl.productEnter,
                            enterActive: cl.productEnterActive,
                            exit: cl.productExit,
                            exitActive: cl.productExitActive
                        }}
                    >
                        <div className={cl.product} ref={nodeRef}>
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
                                <p className={cl.price}>{product.price * product.quantity}₴</p>
                                <div className={cl.buttonsAndQuantity}>
                                    <button onClick={() => reduceQuantityOfProductById(product.id)}
                                            className={cl.minus}>
                                        <span/>
                                    </button>
                                    <div className={cl.quantity}>
                                        {product.quantity}
                                    </div>
                                    <button onClick={() => addProduct(product)} className={cl.plus}>
                                        <span/>
                                        <span/>
                                    </button>
                                </div>
                                <button onClick={() => deleteProductById(product.id)}
                                        className={cl.deleteBtn}>
                                    <span/>
                                    <span/>
                                </button>
                            </div>
                        </div>
                    </CSSTransition>
                })}
            </TransitionGroup>
        </div>
    );
};

export default Products;