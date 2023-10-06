import React, {useState, useEffect} from 'react';
import {Box, Drawer, Typography} from '@mui/material';
import Application from '../../common/Application/Application';

const Purchases = ({openDrawer, setOpenDrawer, inBasket, totalPrice}) => {
    const [names, setNames] = useState([]);

    useEffect(() => {
        const namesArray = [];
        inBasket.forEach((product) => {
            if ('id' in product) {
                namesArray.push(product.name + ' * ' + product.count);
            }
        });
        setNames(namesArray);
    }, [inBasket]);

    return (
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} anchor="left" variant='solid'>
            <Box>
                <Box sx={{
                    textAlign: 'center',
                    margin: '16px'
                }}>
                    {names.length === 0 && 'Кошик порожній'}
                </Box>
                {inBasket.map((product) => {
                    if ('id' in product) {
                        return (
                            <Box key={product.id} sx={{
                                margin: '5px 16px',
                                textAlign: 'center',
                                borderBottom: '1px solid grey'
                            }}>
                                {product.name} <Typography sx={{
                                    color: 'green'
                            }}>{product.price}грн * {product.count}шт</Typography>
                            </Box>
                        );
                    }
                    return null;
                })}
            </Box>
                {names.length === 0
                    ? ''
                    : <Box sx={{margin: '50px 16px 0' , textAlign: 'center'}}>Загальна ціна: <Typography sx={{
                        display: 'inline-block',
                        fontWeight: 'bold'
                    }}>{totalPrice}грн</Typography></Box>
                }
            <Box sx={{margin: '16px'}}>
                {names.length === 0
                    ? <Application title={names.join(', ')} isDisabled={true}/>
                    : <Application title={names.join(', ')} isDisabled={false}/>
                }
            </Box>
        </Drawer>
    );
};

export default Purchases;

