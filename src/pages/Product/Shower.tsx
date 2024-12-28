import React, {FC, useEffect, useState} from 'react';
import {useFetchShowerByIdQuery} from "../../services/ShowerService";
import {IImage} from "../../types";
import {IAdditionalOption} from "../../components/containers/Calculator/AdditionalOptions";
import Calculator, {IPrices} from "../../components/containers/Calculator/Calculator";
import cl from "./Product.module.css";
import SwiperImages from "../../components/containers/SwiperImages/SwiperImages";
import PrimaryButton from "../../components/ui/buttons/PrimaryButton/PrimaryButton";
import Preloader, {PreloaderVariant} from "../../components/ui/Preloader/Preloader";

interface ShowerProps {
    id: string;
}

const Shower: FC<ShowerProps> = ({id}) => {
    const {data, isLoading, isFetching} = useFetchShowerByIdQuery(Number(id));

    const [images, setImages] = useState<IImage[] | null>(null);
    const [additionalOptions, setAdditionalOptions] = useState<IAdditionalOption[] | null>(null);
    const [prices, setPrices] = useState<IPrices>({
        ordinaryPrice: 0.01,
        diamondPrice: 0.01,
        graphitePrice: 0.01,
        bronzePrice: 0.01
    });

    useEffect(() => {
        if (!isFetching) {
            setImages(data?.images || null);
            setAdditionalOptions(data?.additionalOptions.map(option => ({...option, checked: false})) || null);
            setPrices({
                ordinaryPrice: data?.priceOrdinary || 0.01,
                diamondPrice: data?.priceDiamond || 0.01,
                graphitePrice: data?.priceGraphite || 0.01,
                bronzePrice: data?.priceBronze || 0.01
            })
        }

    }, [isFetching]);

    const handleToggleCheckedByIdAdditionalOption = (id: number): void => {
        setAdditionalOptions(additionalOptions && additionalOptions.map(option => option.id === id ? {
            ...option,
            checked: !option.checked
        } : option));
    }
    const setCheckedFalseAdditionalOptions = (): void => {
        setAdditionalOptions(additionalOptions && additionalOptions.map(option => ({...option, checked: false})));
    }

    if (isLoading || isFetching) return <Preloader variant={PreloaderVariant.variant2}/>

    return (
        <div className={cl.content}>
            <div className={cl.images}>
                <SwiperImages images={images}/>
            </div>
            <div className={cl.infoAboutProduct}>
                <span className={cl.article}>Артикул: {data?.article}</span>
                <h1 className={cl.title}>{data?.name}</h1>
                <p className={cl.description}>{data?.description}</p>
                <div className={cl.calculator}>
                    <Calculator startWidth={data?.defaultWidth || []}
                                startHeight={data?.defaultHeight || 1}
                                prices={prices}
                                additionalOptions={additionalOptions}
                                handleToggleCheckedByIdAdditionalOption={handleToggleCheckedByIdAdditionalOption}
                                setCheckedFalseAdditionalOptions={setCheckedFalseAdditionalOptions}
                    />
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

export default Shower;