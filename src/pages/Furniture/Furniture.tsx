import React, {FC, useEffect, useState} from 'react';
import cl from './Furniture.module.css';
import {useFetchFurnitureByParamQuery} from "../../services/FurnitureService";
import GroupButtons from "./components/GroupButtons/GroupButtons";
import FurnitureList from "./components/FurnitureList/FurnitureList";
import Preloader from "../../components/ui/Preloader/Preloader";
import {useFetchDollarToHryvniaQuery} from "../../services/DollarToHryvnia";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {cartSlice} from "../../store/reducers/cartSlice";
import {IProduct} from "../../types";
import CartWithPopup from "./components/CartWithPopup/CartWithPopup";

export enum FurnitureNames {
    furniture_barbells = 'furniture-barbells',
    furniture_fastenings = 'furniture-fastenings',
    furniture_handles = 'furniture-handles',
    furniture_loops = 'furniture-loops',
    furniture_pendulum_systems = 'furniture-pendulum-systems',
    furniture_profiles = 'furniture-profiles',
    furniture_sealers = 'furniture-sealers',
    furniture_shelf_mounts = 'furniture-shelf-mounts',
    furniture_sliding_systems = 'furniture-sliding-systems',
    furniture_thresholds = 'furniture-thresholds'
}

const Furniture: FC = () => {
    const [selectedParam, setSelectedParam] = useState<FurnitureNames>(FurnitureNames.furniture_barbells);
    const {data, isFetching} = useFetchFurnitureByParamQuery(selectedParam);
    const {data: dollarToHryvnia, isLoading: loadingDollarToHryvnia} = useFetchDollarToHryvniaQuery('')
    const [isLocalLoading, setIsLocalLoading] = useState<boolean>(false);

    const {products, generalQuantity, generalPrice} = useAppSelector(state => state.cart);
    const {addProduct, reduceQuantityOfProductById, deleteProductById, cleanCart} = cartSlice.actions;
    const dispatch = useAppDispatch();

    const [isOpenCart, setIsOpenCart] = useState<boolean>(false);

    const handleSelectedParams = (param: FurnitureNames) => setSelectedParam(param);

    useEffect(() => {
        setIsLocalLoading(true);

        const timeout = setTimeout(() => {
            setIsLocalLoading(false)
        }, 300)

        return () => clearTimeout(timeout);
    }, [selectedParam]);

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [selectedParam]);

    const handleAddProduct = (product: IProduct) => {
        dispatch(addProduct(product))
    }
    const handleReduceQuantityOfProductById = (id: number | string) => {
        dispatch(reduceQuantityOfProductById(id))
    }
    const handleDeleteProductById = (id: number | string) => {
        dispatch(deleteProductById(id));
    }
    const handlerCleanCartHandler = () => {
        dispatch(cleanCart());
    };

    return (
        <div className={cl.wrapper}>
            <div className={cl.inner}>
                <GroupButtons handleSelectedParams={handleSelectedParams} selectedParam={selectedParam}/>
                {isFetching || isLocalLoading || loadingDollarToHryvnia ? <div className={cl.preloader}><Preloader/></div> : (
                    <FurnitureList
                        furniture={data || []}
                        dollarToHryvnia={dollarToHryvnia || 1}
                        handleAddProduct={handleAddProduct}
                        productsInCart={products}
                        setIsOpenCart={setIsOpenCart}
                    />
                )}
            </div>
            <CartWithPopup
                generalQuantity={generalQuantity}
                generalPrice={generalPrice}
                products={products}
                addProduct={handleAddProduct}
                reduceQuantityOfProductById={handleReduceQuantityOfProductById}
                deleteProductById={handleDeleteProductById}
                isOpenCart={isOpenCart}
                setIsOpenCart={setIsOpenCart}
                cleanCart={handlerCleanCartHandler}
            />
        </div>
    );
};

export default Furniture;