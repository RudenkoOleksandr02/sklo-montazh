import React, {FC, useEffect, useState} from 'react';
import {useFetchProductByIdQuery} from "../../services/ProductService";
import Preloader, {PreloaderVariant} from "../../components/ui/Preloader/Preloader";
import cl from "./Product.module.css";
import SwiperImages from "../../components/containers/SwiperImages/SwiperImages";
import {IImage} from "../../types";
import PrimaryButton from "../../components/ui/buttons/PrimaryButton/PrimaryButton";
import {dollarToHryvnia} from "../../utils/dollarToHryvnia";
import {useFetchDollarToHryvniaQuery} from "../../services/DollarToHryvnia";

interface TemplateProductProps {
    id: string;
    pathname: string;
}

const TemplateProduct: FC<TemplateProductProps> = ({id, pathname}) => {
    const {data, isLoading, isFetching} = useFetchProductByIdQuery({products: pathname, id: Number(id)});
    const {data: dollarToHryvniaData} = useFetchDollarToHryvniaQuery('')
    const [images, setImages] = useState<IImage[] | null>(null);

    useEffect(() => {
        if (!isFetching) {
            setImages(data?.images || null);
        }

    }, [isFetching]);

    if (isLoading || isFetching) return <Preloader variant={PreloaderVariant.variant2}/>

    return (
        <div className={cl.content}>
            <div className={cl.images}>
                <SwiperImages images={images}/>
            </div>
            <div className={cl.infoAboutProduct}>
                <h1 className={cl.title}>{data?.name}</h1>
                <p className={cl.description}>{data?.description}</p>
                <div className={cl.price}>
                    {data?.price === 0 && <span>Ціну уточнюйте</span>}
                    {data?.price !== 0 && <span>{dollarToHryvnia(data?.price || 1, dollarToHryvniaData || 1)} ₴/кв.м</span>}
                </div>
                <PrimaryButton
                    height='auto'
                    width='100%'
                    minWidth='229px'
                    padding='20px 30px'
                    onClick={() => {
                    }}
                >
                    Зворотній зв'язок
                </PrimaryButton>
            </div>
        </div>
    );
};

export default TemplateProduct;