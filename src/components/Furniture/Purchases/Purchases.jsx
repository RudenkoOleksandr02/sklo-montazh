import React, { useEffect, useState } from 'react';
import { Box, Drawer, IconButton, Typography } from '@mui/material';
import { connect } from 'react-redux';
import Quantity from "../newQuantity/Quantity";
import { addProductToBasket, decreaseProductQuantity } from "../../../store/basket-reducer";
import CloseIcon from '@mui/icons-material/Close';
import ApplicationFurniture from "./ApplicationFurniture/ApplicationFurniture";

const Purchases = ({
    openDrawer,
    setOpenDrawer,
    basket,
    addProductToBasket,
    decreaseProductQuantity,
    totalAmount
}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsArray = [];
        for (const category in basket) {
            for (const product of basket[category]) {
                if (product.quantity > 0) {
                    productsArray.push({ name: product.name, article: product.article, price: product.price, quantity: product.quantity });
                }
            }
        }
        setProducts(productsArray);
    }, [basket]);


    return (
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} anchor="left">
            <IconButton onClick={() => setOpenDrawer(false)} sx={{
                alignSelf: 'flex-end'
            }}>
                <CloseIcon />
            </IconButton>
            <Box>
                {totalAmount === 0 ? <Box sx={{ textAlign: 'center', margin: '16px', width: '170px' }}>
                    Кошик порожній
                </Box> : ''}
                {Object.keys(basket).map((category) => {
                    return basket[category].map((product) => {
                        if (product.quantity > 0) {
                            return (
                                <Box key={product.id}
                                    sx={{ margin: '5px 16px', textAlign: 'center', borderBottom: '1px solid grey', maxWidth: '200px' }}>
                                    {product.name}{' '}{`(${product.article})`}
                                    <Box sx={{
                                        color: 'black',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {product.price * product.quantity} грн <Quantity basket={basket}
                                            name={product.name}
                                            price={product.price}
                                            id={product.id}
                                            addProductToBasket={addProductToBasket}
                                            decreaseProductQuantity={decreaseProductQuantity}
                                            category={product.category}
                                        />
                                    </Box>
                                </Box>
                            );
                        }
                        return null;
                    });
                })}
            </Box>
            {totalAmount === 0 ? (
                ''
            ) : (
                <Box sx={{ margin: '50px 16px 0', textAlign: 'center' }}>
                    Загальна ціна:{' '}
                    <Typography sx={{ display: 'inline-block', fontWeight: 'bold' }}>{totalAmount} грн</Typography>
                </Box>
            )}
            <Box sx={{ margin: '16px auto' }}>
                {totalAmount === 0 ? (
                    <ApplicationFurniture products={products} isDisabled={true} totalAmount={totalAmount} />
                ) : (
                    <ApplicationFurniture products={products} isDisabled={false} totalAmount={totalAmount} />
                )}
            </Box>
        </Drawer>
    );
};

const mapStateToProps = (state) => ({
    basket: state.basket.furniture,
    totalAmount: state.basket.totalAmount
});

export default connect(mapStateToProps, { addProductToBasket, decreaseProductQuantity })(Purchases);

