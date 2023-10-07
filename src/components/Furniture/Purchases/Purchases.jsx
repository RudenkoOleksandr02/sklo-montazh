import React, {useEffect, useState} from 'react';
import {Box, Drawer, Typography} from '@mui/material';
import Application from "../../common/Application/Application";
import {connect} from 'react-redux';
import Quantity from "../newQuantity/Quantity";
import {addProductToBasket, decreaseProductQuantity} from "../../../store/basket-reducer";

const Purchases = ({
                       openDrawer,
                       setOpenDrawer,
                       basket,
                       totalPrice,
                       setTotalPrice,
                       addProductToBasket,
                       decreaseProductQuantity
                   }) => {
    const [names, setNames] = useState([]);

    useEffect(() => {
        const namesArray = [];
        for (const category in basket) {
            for (const product of basket[category]) {
                if (product.quantity > 0) {
                    namesArray.push(`${product.name} * ${product.quantity}`);
                }
            }
        }
        setNames(namesArray);
    }, [basket]);

    return (
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} anchor="left">
            <Box>
                <Box sx={{textAlign: 'center', margin: '16px'}}>
                    {names.length === 0 && 'Кошик порожній'}
                </Box>
                {Object.keys(basket).map((category) => {
                    return basket[category].map((product) => {
                        if (product.quantity > 0) {
                            return (
                                <Box key={product.id}
                                     sx={{margin: '5px 16px', textAlign: 'center', borderBottom: '1px solid grey'}}>
                                    {product.name}{' '}
                                    <Typography sx={{color: 'black'}} sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {product.price * product.quantity} грн <Quantity basket={basket}
                                                                                        name={product.name}
                                                                                        price={product.price}
                                                                                        setTotalPrice={setTotalPrice}
                                                                                        totalPrice={totalPrice}
                                                                                        id={product.id}
                                                                                        addProductToBasket={addProductToBasket}
                                                                                        decreaseProductQuantity={decreaseProductQuantity}
                                                                                        category={product.category}
                                    />
                                    </Typography>
                                </Box>
                            );
                        }
                        return null;
                    });
                })}
            </Box>
            {names.length === 0 ? (
                ''
            ) : (
                <Box sx={{margin: '50px 16px 0', textAlign: 'center'}}>
                    Загальна ціна:{' '}
                    <Typography sx={{display: 'inline-block', fontWeight: 'bold'}}>{totalPrice}грн</Typography>
                </Box>
            )}
            <Box sx={{margin: '16px auto'}}>
                {names.length === 0 ? (
                    <Application title={names.join(', ')} isDisabled={true}/>
                ) : (
                    <Application title={names.join(', ')} isDisabled={false}/>
                )}
            </Box>
        </Drawer>
    );
};

const mapStateToProps = (state) => ({
    basket: state.basket
});

export default connect(mapStateToProps, {addProductToBasket, decreaseProductQuantity})(Purchases);

