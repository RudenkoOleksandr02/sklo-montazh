import React, {FC} from 'react';
import {useFetchAllProductsQuery} from "../../services/ProductService";
import {CatalogPath} from "./Category";
import {useFetchSeoQuery} from "../../services/SeoService";
import Template from "./Template";

const OtherGlassProducts: FC = () => {
    const {data, isLoading} = useFetchAllProductsQuery(CatalogPath.otherGlassProducts);
    const {data: seo} = useFetchSeoQuery('/other-glass-products-seo');

    const text = `Скляні вироби — це оригінальні елементи декору та функціональності 
    для будь-якого простору. Виготовлені з якісного скла, вони додають інтер’єру естетичності 
    та унікальності. Доступні варіанти: фотодрук, полиці, кухонні фартухи та інші декоративні конструкції.`

    return (
        <Template data={data || []} text={text} title='Інші вироби зі скла' seoDescription={seo?.description || ''}
                  seoKeywords={seo?.keywords || ''} isLoading={isLoading} forWhom={CatalogPath.otherGlassProducts}/>
    );
};

export default OtherGlassProducts;