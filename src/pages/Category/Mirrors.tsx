import React, {FC} from 'react';
import {useFetchSeoQuery} from "../../services/SeoService";
import Template from "./Template";
import {useFetchAllProductsQuery} from "../../services/ProductService";
import {CatalogPath} from "./Category";

const Mirrors: FC = () => {
    const {data: mirrorsData, isLoading} = useFetchAllProductsQuery(CatalogPath.mirrors);
    const {data: mirrorsSeo} = useFetchSeoQuery('/mirrors-seo');

    const text = `Дзеркала — важливий елемент інтер’єру, що поєднує функціональність і стиль. Виготовлені 
    з якісних матеріалів, вони забезпечують естетику та комфорт. Доступні варіанти: настінні, 
    з підсвіткою та підігрівом, стандартні, з фацетом.`

    return (
        <Template data={mirrorsData || []} text={text} title='Дзеркала' seoDescription={mirrorsSeo?.description || ''}
                  seoKeywords={mirrorsSeo?.keywords || ''} isLoading={isLoading} forWhom={CatalogPath.mirrors}/>
    );
};

export default Mirrors;