import React, {FC} from 'react';
import {useFetchAllProductsQuery} from "../../services/ProductService";
import {useFetchSeoQuery} from "../../services/SeoService";
import Template from "./Template";
import {CatalogPath} from "./Category";

const Doors: FC = () => {
    const {data: doorsData, isLoading} = useFetchAllProductsQuery(CatalogPath.doors);
    const {data: doorsSeo} = useFetchSeoQuery('/doors-seo');

    const text = `Скляні двері — це сучасне поєднання естетики та функціональності. 
    Виготовлені з міцного скла, вони створюють стильний вигляд і комфорт у використанні. 
    Доступні варіанти: розпашні, розсувні, з глухою частиною.`

    return (
        <Template data={doorsData || []} text={text} title='Скляні двері' seoDescription={doorsSeo?.description || ''}
                  seoKeywords={doorsSeo?.keywords || ''} isLoading={isLoading} forWhom={CatalogPath.doors}/>
    );
};

export default Doors;