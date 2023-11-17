import React, {useEffect, useState} from 'react';
import TableFurniture from "./TableFurniture/TableFurniture";
import {connect} from "react-redux";
import {addProductToBasket, decreaseProductQuantity} from "../../../store/basket-reducer";
import {getFurniture} from "../../../store/furniture-reducer";
import ButtonsRequest from "./ButtonsRequest/ButtonsRequest";
import {Box} from "@mui/material";
import {useParams} from "react-router-dom";

const TableFurnitureWithButtons = ({
                                       furniture,
                                       basket,
                                       handleOpenModal,
                                       getFurniture,
                                       addProductToBasket,
                                       decreaseProductQuantity
                                   }) => {
    const params = useParams()

    useEffect(() => {
        getFurniture(params.category)
    }, [params.category]);

    const category = params.category;

    return <Box sx={{
        maxWidth: '1001px',
        margin: '24px auto'
    }}>
        <ButtonsRequest category={params.category}/>
        <TableFurniture
            furniture={furniture}
            handleOpenModal={handleOpenModal}
            basket={basket}
            category={category}
            addProductToBasket={addProductToBasket}
            decreaseProductQuantity={decreaseProductQuantity}
        />
    </Box>
};

const mapStateToProps = (state) => {
    return {
        basket: state.basket.furniture,
        furniture: state.furniture.furniture
    }
}
export default connect(mapStateToProps, {
    addProductToBasket,
    decreaseProductQuantity,
    getFurniture
})(TableFurnitureWithButtons);
