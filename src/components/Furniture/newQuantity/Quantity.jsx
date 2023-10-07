import React from 'react';
import {Box, IconButton} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const Quantity = ({
                      id,
                      name,
                      basket,
                      price,
                      totalPrice,
                      setTotalPrice,
                      addProductToBasket,
                      decreaseProductQuantity,
                      category
                  }) => {
    const handleAdd = () => {
        addProductToBasket(category, {id, name, price, category})
        setTotalPrice(totalPrice + price)
    }
    const handleDecrease = () => {
        decreaseProductQuantity(category, name)
        setTotalPrice(totalPrice - price)
    }

    return (
        <Box>
            <IconButton onClick={handleDecrease}>
                <RemoveIcon/>
            </IconButton>
            {basket[category].find(product => product.id === id && product.name === name)?.quantity || 0}
            <IconButton onClick={handleAdd}>
                <AddIcon/>
            </IconButton>
        </Box>
    );
};

export default Quantity;
