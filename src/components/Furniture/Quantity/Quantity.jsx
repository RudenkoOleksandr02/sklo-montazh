import React, {useState} from 'react';
import {Box, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Quantity = ({id, name, setInBasket, inBasket, price, setTotalPrice, totalPrice}) => {
    const [count, setCount] = useState(0);

    const newProduct = {
        id,
        name,
        count: count + 1,
        price
    }

    const updateBasket = (count) => {
        const updateBasket = inBasket.map((product) => {
            if (count === 0) {
                return product.id === id ? {} : product;
            } else {
                return product.id === id ? {id, name, price, count} : product;
            }

        })
        setInBasket(updateBasket);
    }

    const handleRemove = () => {
        if (count !== 0) {
            const updateCount = count - 1;
            setCount(updateCount);
            updateBasket(updateCount);
            setTotalPrice(totalPrice - price)
        }
    }
    const handleAdd = () => {
        const updateCount = count + 1;
        setCount(updateCount);
        const productIndex = inBasket.findIndex(product => product.id === id);

        if (productIndex === -1) {
            setInBasket([...inBasket, newProduct]);
            setTotalPrice(totalPrice + price)
        } else {
            updateBasket(updateCount)
            setTotalPrice(totalPrice + price)
        }
    }

    return (
        <Box>
            <IconButton onClick={handleRemove}>
                <RemoveIcon/>
            </IconButton>
            {count}
            <IconButton onClick={handleAdd}>
                <AddIcon/>
            </IconButton>
        </Box>
    );
};

export default Quantity;
