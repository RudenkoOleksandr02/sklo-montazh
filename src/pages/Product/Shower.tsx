import React, {FC, useEffect, useState} from 'react';
import {useFetchShowerByIdQuery} from "../../services/ShowerService";
import {IImage} from "../../types";
import {IAdditionalOption} from "../../components/containers/Calculator/AdditionalOptions";
import Calculator, {IPrices} from "../../components/containers/Calculator/Calculator";
import cl from "./Product.module.css";
import SwiperImages from "../../components/containers/SwiperImages/SwiperImages";
import PrimaryButton from "../../components/ui/buttons/PrimaryButton/PrimaryButton";
import Preloader, {PreloaderVariant} from "../../components/ui/Preloader/Preloader";
import {useFetchDollarToHryvniaQuery} from "../../services/DollarToHryvnia";
import {Helmet, HelmetProvider} from "react-helmet-async";
import MakeOrderPopup from "../../components/containers/MakeOrderPopup/MakeOrderPopup";
import {dollarToHryvnia} from "../../utils/dollarToHryvnia";

interface ShowerProps {
    id: string;
}

interface ISelectedCharacteristics {
    height: number;
    width: number[];
    glassType: string;
    totalPrice: number;
    additionalOptions: IAdditionalOption[] | null;
}

const Shower: FC<ShowerProps> = ({id}) => {
    const {data, isLoading, isFetching} = useFetchShowerByIdQuery(Number(id));
    const {data: dollarToHryvniaData} = useFetchDollarToHryvniaQuery('');

    const [isOpenModalMakeOrder, setIsOpenModalMakeOrder] = useState<boolean>(false);
    const [selectedCharacteristics, setSelectedCharacteristics] = useState<ISelectedCharacteristics>({
        height: 0,
        width: [0],
        glassType: '',
        additionalOptions: null,
        totalPrice: 0
    });
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
            });

            const pricePerMm2 = (data?.priceOrdinary || 1) / 10000;
            const dimensions = (data?.defaultWidth?.reduce((acc, curr) => acc + curr, 0) || 1) * (data?.defaultHeight || 1);
            const totalPrice = dimensions * pricePerMm2;
            setSelectedCharacteristics({
                height: data?.defaultHeight || 1,
                width: data?.defaultWidth || [],
                glassType: 'Звичайне',
                additionalOptions: null,
                totalPrice: dollarToHryvnia(totalPrice, dollarToHryvniaData || 1)
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
    const handleSelectCharacteristics = (
        height: number,
        width: number[],
        glassType: string,
        additionalOptions: IAdditionalOption[] | null,
        totalPrice: number
    ): void => {
        const formatTotalPrice = dollarToHryvnia(totalPrice, dollarToHryvniaData || 1);
        setSelectedCharacteristics({height, width, glassType, additionalOptions, totalPrice: formatTotalPrice})
    }

    const orderShowerTemplate = `
          <ul>
            <li>Висота: ${selectedCharacteristics.height} мм</li>
            <li>Ширина: ${
                selectedCharacteristics.width
                    .map((width, index) =>
                        selectedCharacteristics.width.length > 1
                            ? selectedCharacteristics.width.length - index !== 1
                                ? width + "x"
                                : width
                            : width
                    )
                    .join("")
            } мм</li>
            <li>Тип скла: ${selectedCharacteristics.glassType.split(" ")[0]}</li>
            ${selectedCharacteristics?.additionalOptions
                ?.map((item) => `<li>${item.title}</li>`)
                .join("")}
            <li>Підсумкова ціна: ${selectedCharacteristics.totalPrice} ₴</li>
          </ul>
    `;

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
                                    dollarToHryvniaData={dollarToHryvniaData || 1}
                                    handleSelectCharacteristics={handleSelectCharacteristics}
                        />
                    </div>
                    <div className={cl.makeOrder}>
                        <PrimaryButton
                            height='auto'
                            width='50%'
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
                orderData={{title: data?.name + ' ' + data?.article || '', other: orderShowerTemplate}}
            >
                <div className={cl.contentForOrder}>
                    <div className={cl.nameWithArticle}>
                        <span className={cl.name}>{data?.name}</span> |
                        <span className={cl.article}> Артикул: {data?.article}</span>
                    </div>
                    <div className={cl.characteristics}>
                        <span className={cl.selectedCharacteristics}>Обрані характеристики</span>
                        <ul className={cl.list}>
                            <li>Висота: {selectedCharacteristics.height} мм</li>
                            <li>Ширина: {(selectedCharacteristics.width.map((width, index) => selectedCharacteristics.width.length > 1 ? (selectedCharacteristics.width.length - index !== 1 ? `${width}x` : width) : width)).join('')} мм</li>
                            <li>Тип скла: {selectedCharacteristics.glassType.split(' ')[0]}</li>
                            {selectedCharacteristics?.additionalOptions?.map(item => {
                                return <li key={item.id}>{item.title}</li>
                            })}
                        </ul>
                    </div>
                    <p className={cl.totalPrice}>Підсумкова ціна: <span>{selectedCharacteristics.totalPrice} ₴</span></p>
                </div>
            </MakeOrderPopup>
        </HelmetProvider>
    );
};

export default Shower;