import React, {FC} from 'react';
import {Helmet, HelmetProvider} from "react-helmet-async";
import cl from "./Category.module.css";
import CardProduct from "../../components/ui/CardProduct/CardProduct";
import {dollarToHryvnia} from "../../utils/dollarToHryvnia";
import Preloader, {PreloaderVariant} from "../../components/ui/Preloader/Preloader";
import {useFetchDollarToHryvniaQuery} from "../../services/DollarToHryvnia";
import {IProductCard} from "../../types";

interface TemplateProps {
    data: IProductCard[];
    text: string;
    title: string;
    forWhom: string;
    seoDescription: string;
    seoKeywords: string;
    isLoading: boolean;
    priceFrom?: boolean;
}

const  Template: FC<TemplateProps> = ({data, text, title, forWhom, seoDescription, seoKeywords, isLoading, priceFrom = false}) => {
    const {data: dollarToHryvniaData} = useFetchDollarToHryvniaQuery('')

    return (
        <HelmetProvider>
            <Helmet>
                <meta name="description"
                      content={seoDescription}
                />
                <meta name="keywords"
                      content={seoKeywords}
                />
            </Helmet>
            <>
                <div className={cl.top}>
                    <h2>{title}</h2>
                    <p>{text}</p>
                </div>
                {!isLoading ? (
                    <div className={cl.cardList}>
                        {data?.map(item => (
                            <CardProduct
                                key={item.id}
                                name={item.name}
                                path={`/services/${forWhom}/${item.id}`}
                                price={dollarToHryvnia(item.price, dollarToHryvniaData || 1)}
                                measurement='₴/кв.м'
                                description={item.pre_description}
                                image={item.image}
                                priceFrom={priceFrom}
                            />
                        ))}
                    </div>
                ) : <Preloader variant={PreloaderVariant.variant2}/>}
            </>
        </HelmetProvider>
    );
};

export default Template;