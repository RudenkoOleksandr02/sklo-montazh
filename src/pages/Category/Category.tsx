import React, {FC} from 'react';
import cl from './Category.module.css';
import {useFetchDollarToHryvniaQuery} from "../../services/DollarToHryvnia";
import {useParams} from "react-router-dom";
import Showers from "./Showers";
import Mirrors from "./Mirrors";
import Doors from "./Doors";
import RailingPartitions from "./RailingPartitions";
import OtherGlassProducts from "./OtherGlassProducts";

export enum CatalogPath {
    showers = 'showers',
    mirrors = 'mirrors',
    doors = 'doors',
    railings_partitions = 'railing-partitions',
    otherGlassProducts = 'other-glass-products'
}

type Param = {
    id: string;
}

const Category: FC = () => {
    const {id: path} = useParams<Param>();
    const {data: dollarToHryvniaData} = useFetchDollarToHryvniaQuery('')

    return <div className={cl.wrapper}>
        <div className={cl.inner}>
            {path === CatalogPath.showers && <Showers dollarToHryvniaData={dollarToHryvniaData || 1} />}
            {path === CatalogPath.mirrors && <Mirrors />}
            {path === CatalogPath.doors && <Doors />}
            {path === CatalogPath.railings_partitions && <RailingPartitions/>}
            {path === CatalogPath.otherGlassProducts && <OtherGlassProducts />}
        </div>
    </div>
};

export default Category;