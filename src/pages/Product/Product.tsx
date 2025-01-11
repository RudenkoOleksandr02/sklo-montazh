import React, {FC} from 'react';
import cl from './Product.module.css';
import {useLocation, useParams} from "react-router-dom";
import Shower from "./Shower";
import TemplateProduct from "./TemplateProduct";

type Params = {
    id: string;
}

const Product: FC = () => {
    const pathname = (useLocation()).pathname.split("/")[2];
    const {id} = useParams<Params>();

    return (
        <div className={cl.wrapper}>
            <div className={cl.inner}>
                {pathname === 'showers' && <Shower id={id || ''}/>}
                {pathname !== 'showers' && pathname !== undefined && <TemplateProduct id={id || ''} pathname={pathname} />}
            </div>
        </div>
    );
};

export default Product;