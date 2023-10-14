import React, {useEffect, useState} from 'react';
import TableFurniture from "./TableFurniture/TableFurniture";
import {connect} from "react-redux";
import {addProductToBasket, decreaseProductQuantity} from "../../../store/basket-reducer";
import {
    getBarbells,
    getFastenings,
    getHandles,
    getLoops, getPendulumSystems,
    getProfiles,
    getSealers, getShelfMounts, getSlidingSystems, getThresholds
} from "../../../store/furniture-reducer";
import ButtonsRequest from "./ButtonsRequest/ButtonsRequest";
import {Box} from "@mui/material";

const TableFurnitureWithButtons = ({
                                       furniture,
                                       basket,
                                       handleOpenModal,
                                       getBarbells,
                                       getFastenings,
                                       getHandles,
                                       getLoops,
                                       getProfiles,
                                       getSealers,
                                       getSlidingSystems,
                                       getThresholds,
                                       addProductToBasket,
                                       decreaseProductQuantity,
                                       getPendulumSystems,
                                       getShelfMounts
                                   }) => {
    useEffect(() => {
        getBarbells();
    }, []);

    const [category, setCategory] = useState('barbells');

    const openCategory = (newCategory, getCategory) => {
        setCategory(newCategory);
        getCategory();
    }

    return <Box sx={{
        maxWidth: '1001px',
        margin: '24px auto'
    }}>
        <ButtonsRequest openCategory={openCategory}
                        getBarbells={getBarbells}
                        getFastenings={getFastenings}
                        getHandles={getHandles}
                        getLoops={getLoops}
                        getProfiles={getProfiles}
                        getSealers={getSealers}
                        getSlidingSystems={getSlidingSystems}
                        getThresholds={getThresholds}
                        getPendulumSystems={getPendulumSystems}
                        getShelfMounts={getShelfMounts}
        />

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
    getBarbells,
    getFastenings,
    getHandles,
    getLoops,
    getProfiles,
    getSealers,
    getSlidingSystems,
    getThresholds,
    getPendulumSystems,
    getShelfMounts
})(TableFurnitureWithButtons);
