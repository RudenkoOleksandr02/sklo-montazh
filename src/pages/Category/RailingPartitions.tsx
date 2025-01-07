import React, {FC} from 'react';
import {useFetchAllProductsQuery} from "../../services/ProductService";
import {CatalogPath} from "./Category";
import {useFetchSeoQuery} from "../../services/SeoService";
import Template from "./Template";

const RailingPartitions: FC = () => {
    const {data, isLoading} = useFetchAllProductsQuery(CatalogPath.railings_partitions);
    const {data: seo} = useFetchSeoQuery('/railings-partitions-seo');

    const text = `Скляні перила та перегородки — елегантні рішення для зонування та безпеки простору. 
    Виготовлені з якісного скла та надійної фурнітури, вони поєднують сучасний дизайн і практичність. 
    Доступні варіанти: для балконів, сходів, офісів та зонування приміщень.`

    return (
        <Template data={data || []} text={text} title='Скляні перила та перегородки' seoDescription={seo?.description || ''}
                  seoKeywords={seo?.keywords || ''} isLoading={isLoading} forWhom={CatalogPath.railings_partitions} priceFrom={true}/>
    );
};

export default RailingPartitions;