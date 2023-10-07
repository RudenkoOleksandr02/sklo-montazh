import React, {useEffect, useState} from 'react';
import TableFurniture from "./TableFurniture/TableFurniture";
import {connect} from "react-redux";
import {addProductToBasket, decreaseProductQuantity} from "../../../store/basket-reducer";
import {
    getBarbells,
    getFastenings,
    getHandles,
    getLoops,
    getProfiles,
    getSealers, getSlidingSystems, getThresholds
} from "../../../store/furniture-reducer";
import ButtonsRequest from "./ButtonsRequest/ButtonsRequest";

const TableFurnitureWithButtons = ({
                                       furniture,
                                       basket,
                                       handleOpenModal,
                                       setTotalPrice,
                                       totalPrice,
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
                                   }) => {
    useEffect(() => {
        getBarbells();
    }, []);

    const [category, setCategory] = useState('barbells');

    const openCategory = (newCategory, getCategory) => {
        setCategory(newCategory);
        getCategory();
    }

    return <>
        <ButtonsRequest openCategory={openCategory}
                        getBarbells={getBarbells}
                        getFastenings={getFastenings}
                        getHandles={getHandles}
                        getLoops={getLoops}
                        getProfiles={getProfiles}
                        getSealers={getSealers}
                        getSlidingSystems={getSlidingSystems}
                        getThresholds={getThresholds}
        />

        <TableFurniture
            furniture={furniture}
            handleOpenModal={handleOpenModal}
            setTotalPrice={setTotalPrice}
            totalPrice={totalPrice}
            basket={basket}
            category={category}
            addProductToBasket={addProductToBasket}
            decreaseProductQuantity={decreaseProductQuantity}
        />
    </>
};

const mapStateToProps = (state) => {
    return {
        basket: state.basket,
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
    getThresholds
})(TableFurnitureWithButtons);
