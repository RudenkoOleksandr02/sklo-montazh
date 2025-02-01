import React, { FC, useEffect, useState } from 'react';
import { useFetchShowerByIdQuery, useFetchVariablesForShowersQuery } from "../../services/ShowerService";
import { IImage } from "../../types";
import Calculator from "../../components/containers/Calculator/Calculator";
import cl from "./Product.module.css";
import SwiperImages from "../../components/containers/SwiperImages/SwiperImages";
import PrimaryButton from "../../components/ui/buttons/PrimaryButton/PrimaryButton";
import Preloader from "../../components/ui/Preloader/Preloader";
import { useFetchDollarToHryvniaQuery } from "../../services/DollarToHryvnia";
import { Helmet, HelmetProvider } from "react-helmet-async";
import MakeOrderPopup from "../../components/containers/MakeOrderPopup/MakeOrderPopup";
import { dollarToHryvnia } from "../../utils/dollarToHryvnia";
import MarkdownWithStyle from "../../components/containers/MarkdownWithStyle/MarkdownWithStyle";

interface ShowerProps {
    id: string;
}

interface ISelectedCharacteristics {
    height: number;
    width: number[];
    glassColor: string;
    glassType: string;
    furnitureColor: string;
    totalPrice: number;
}

export interface IOption {
    id: number;
    option: string;
    priceDollars?: number;
}

const Shower: FC<ShowerProps> = ({ id }) => {
    const { data, isLoading, isFetching } = useFetchShowerByIdQuery(Number(id));
    const { data: dollarToHryvniaData } = useFetchDollarToHryvniaQuery('');
    const { data: variables } = useFetchVariablesForShowersQuery('');

    const [isOpenModalMakeOrder, setIsOpenModalMakeOrder] = useState(false);
    const [selectedCharacteristics, setSelectedCharacteristics] = useState<ISelectedCharacteristics>({
        height: 0,
        width: [0],
        glassColor: '',
        glassType: '',
        furnitureColor: '',
        totalPrice: 0
    });

    const [images, setImages] = useState<IImage[] | null>(null);
    const [furnitureColors, setFurnitureColors] = useState<IOption[]>([]);

    useEffect(() => {
        if (data && variables) {
            setImages(data.images);
            setFurnitureColors(
                data.furnitureColor.map(fc => ({
                    id: fc.id,
                    option: `${fc.color} ${dollarToHryvnia(fc.priceDollars, dollarToHryvniaData || 1)} ₴`,
                    priceDollars: fc.priceDollars
                }))
            );

            setSelectedCharacteristics({
                height: data.defaultHeight,
                width: data.defaultWidth,
                glassColor: 'Звичайне',
                glassType: 'Прозоре',
                furnitureColor: data.furnitureColor[0].color,
                totalPrice: dollarToHryvnia(calculateBasePrice(data), dollarToHryvniaData || 1)
            });
        }
    }, [data, dollarToHryvniaData]);

    const calculateBasePrice = (data: any) => {
        if (!variables) return 0;

        const G = data.defaultWidth.reduce((acc: number, w: number) =>
            acc + (data.defaultHeight * w) / 1_000_000, 0);

        return (G * variables.ordinaryPrice) + variables.hardeningPrice;
    };

    const handleSelectCharacteristics = (
        height: number,
        width: number[],
        glassColor: string,
        glassType: string,
        furnitureColor: string,
        totalPrice: number
    ) => {
        setSelectedCharacteristics({
            height,
            width,
            glassColor,
            glassType,
            furnitureColor,
            totalPrice: dollarToHryvnia(totalPrice, dollarToHryvniaData || 1)
        });
    };

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
            <li>Колір скла: ${selectedCharacteristics.glassColor.split(" ")[0]}</li>
            <li>Тип скла: ${selectedCharacteristics.glassType.split(" ")[0]}</li>
            <li>Колір фурнітури: ${selectedCharacteristics.furnitureColor.split(' ')[0]}</li>
            <li>Ціна від: ${selectedCharacteristics.totalPrice} ₴</li>
          </ul>
    `;

    if (isLoading || isFetching) return <Preloader />;

    return (
        <HelmetProvider>
            <Helmet>
                <meta name="description" content={data?.metaDescription || ''} />
                <meta name="keywords" content={data?.metaKeys || ''} />
            </Helmet>
            <div className={cl.content}>
                <div className={cl.images}>
                    <SwiperImages images={images} />
                </div>
                <div className={cl.infoAboutProduct}>
                    <span className={cl.article}>Артикул: {data?.article}</span>
                    <h1 className={cl.title}>{data?.name}</h1>
                    <div className={cl.description}>
                        <MarkdownWithStyle content={data?.description || ''} />
                    </div>
                    <div className={cl.calculator}>
                        {variables && (
                            <Calculator
                                startWidth={data?.defaultWidth || []}
                                startHeight={data?.defaultHeight || 1}
                                variables={variables}
                                numberHoles={data?.numberHoles || 1}
                                furnitureColors={furnitureColors}
                                dollarToHryvniaData={dollarToHryvniaData || 1}
                                handleSelectCharacteristics={handleSelectCharacteristics}
                            />
                        )}
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
                orderData={{ title: data?.name + ' ' + data?.article || '', other: orderShowerTemplate }}
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
                            <li>Колір скла: {selectedCharacteristics.glassColor.split(' ')[0]}</li>
                            <li>Тип скла: {selectedCharacteristics.glassType.split(' ')[0]}</li>
                            <li>Колір фурнітури: {selectedCharacteristics.furnitureColor.split(' ')[0]}</li>
                        </ul>
                    </div>
                    <p className={cl.totalPrice}>Ціна від: <span>{selectedCharacteristics.totalPrice} ₴</span></p>
                </div>
            </MakeOrderPopup>
        </HelmetProvider>
    );
};

export default Shower;