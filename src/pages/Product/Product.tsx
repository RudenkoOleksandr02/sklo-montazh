import React, {FC} from 'react';
import cl from './Product.module.css';
import {useLocation, useParams} from "react-router-dom";
import Shower from "./Shower";
import TemplateProduct from "./TemplateProduct";

type Params = {
    id: string;
}

const Product: FC = () => {
    const location = useLocation();
    const {id} = useParams<Params>();

    return (
        <div className={cl.wrapper}>
            {location.pathname.split("/")[2] === 'showers' && <Shower id={id || ''}/>}
            {location.pathname.split("/")[2] !== 'showers' && <TemplateProduct id={id || ''} pathname={location.pathname.split('/')[2]} />}
        </div>
    );
};

export default Product;