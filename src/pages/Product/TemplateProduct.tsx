import React, {FC, useEffect, useState} from 'react';
import {useFetchProductByIdQuery} from "../../services/ProductService";
import Preloader, {PreloaderVariant} from "../../components/ui/Preloader/Preloader";
import cl from "./Product.module.css";
import SwiperImages from "../../components/containers/SwiperImages/SwiperImages";
import {IImage} from "../../types";
import PrimaryButton from "../../components/ui/buttons/PrimaryButton/PrimaryButton";
import {dollarToHryvnia} from "../../utils/dollarToHryvnia";
import {useFetchDollarToHryvniaQuery} from "../../services/DollarToHryvnia";
import {Helmet, HelmetProvider} from "react-helmet-async";
import MakeOrderPopup from "../../components/containers/MakeOrderPopup/MakeOrderPopup";

interface TemplateProductProps {
    id: string;
    pathname: string;
}

const TemplateProduct: FC<TemplateProductProps> = ({id, pathname}) => {
    const {data, isLoading, isFetching} = useFetchProductByIdQuery({products: pathname, id: Number(id)});
    const {data: dollarToHryvniaData} = useFetchDollarToHryvniaQuery('')
    const [images, setImages] = useState<IImage[] | null>(null);
    const [isOpenModalMakeOrder, setIsOpenModalMakeOrder] = useState<boolean>(false);

    useEffect(() => {
        if (!isFetching) {
            setImages(data?.images || null);
        }

    }, [isFetching]);

    const orderProductTemplate = `<div>
      ${data?.price !== 0 ? (
          `<p className={cl.totalPrice}>Ціна: <span>${dollarToHryvnia(data?.price || 1, dollarToHryvniaData || 1)} ₴/кв.м</span></p>`
        ) : (
        `<p className={cl.totalPrice}><span>Ціна не встановлена</span></p>`
      )}
    </div>`;

    if (isLoading || isFetching) return <Preloader variant={PreloaderVariant.variant2}/>

    return (
        <HelmetProvider>
            <Helmet>
                <meta name="description"
                      content={data?.metaDescription || ''}
                />
                <meta name="keywords"
                      content={data?.metaKeys || ''}
                />
            </Helmet>
            <div className={cl.content}>
                <div className={cl.images}>
                    <SwiperImages images={images}/>
                </div>
                <div className={cl.infoAboutProduct}>
                    <h1 className={cl.title}>{data?.name}</h1>
                    <p className={cl.description}>{data?.description}</p>
                    <div className={cl.priceContainer}>
                        {data?.price === 0 && <span className={cl.price}>Ціну уточнюйте</span>}
                        {data?.price !== 0 &&
                            <p><span className={cl.priceFrom}>Ціна від:</span> <span className={cl.price}>{dollarToHryvnia(data?.price || 1, dollarToHryvniaData || 1)} ₴/кв.м</span>
                            </p>
                        }
                    </div>
                    <div className={cl.makeOrder}>
                        <PrimaryButton
                            height='auto'
                            width='auto'
                            minWidth='229px'
                            padding='20px 30px'
                            onClick={() => setIsOpenModalMakeOrder(true)}
                        >
                            Переглянути замовлення
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <MakeOrderPopup
                active={isOpenModalMakeOrder}
                setActive={setIsOpenModalMakeOrder}
                orderData={{title: data?.name || '', other: orderProductTemplate}}
            >
                <div className={cl.contentForOrder}>
                    <div className={cl.nameWithArticle}>
                        <span className={cl.name}>{data?.name}</span>
                    </div>
                    {data?.price !== 0 ? (
                        <p className={cl.totalPrice}>Ціна від: <span>{dollarToHryvnia(data?.price || 1, dollarToHryvniaData || 1)} ₴/кв.м</span></p>
                    ) : (
                        <p className={cl.totalPrice}><span>Ціну уточнюйте</span></p>
                    )}
                </div>
            </MakeOrderPopup>
        </HelmetProvider>
    );
};

export default TemplateProduct;