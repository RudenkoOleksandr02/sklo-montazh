import React, {FC, useEffect, useMemo, useState} from 'react';
import cl from './Calculator.module.css';
import HeightWidth from "./HeightWidth";
import Buttons from "./Buttons";
import {dollarToHryvnia} from "../../../utils/dollarToHryvnia";
import InputSelect2 from "../../ui/InputSelect/InputSelect2/InputSelect2";

export interface IOption {
    id: number;
    option: string;
    priceDollars?: number;
}

interface CalculatorProps {
    startWidth: number[];
    startHeight: number;
    variables: {
        ordinaryPrice: number;
        diamondPrice: number;
        graphitePrice: number;
        bronzePrice: number;
        mattePrice: number;
        linearPrice: number;
        holesPrice: number;
        hardeningPrice: number;
    };
    numberHoles: number;
    dollarToHryvniaData: number;
    furnitureColors: IOption[];
    handleSelectCharacteristics: (
        height: number,
        width: number[],
        glassColor: string,
        glassType: string,
        furnitureColor: string,
        totalPrice: number
    ) => void;
}

const Calculator: FC<CalculatorProps> = ({
                                             startWidth,
                                             startHeight,
                                             variables,
                                             dollarToHryvniaData,
                                             handleSelectCharacteristics,
                                             furnitureColors,
                                             numberHoles
                                         }) => {
    const [width, setWidth] = useState<(number | string)[]>(startWidth);
    const [height, setHeight] = useState<number | string>(startHeight);
    const [glassColor, setGlassColor] = useState<IOption>({id: 1, option: 'Звичайне'});
    const [glassType, setGlassType] = useState<IOption>({id: 1, option: 'Прозоре'});
    const [furnitureColor, setFurnitureColor] = useState<IOption>(
        furnitureColors.length > 0
            ? furnitureColors[0]
            : { id: 1, option: 'Default', priceDollars: 0 }
    );
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (furnitureColors.length > 0) {
            setFurnitureColor(furnitureColors[0]);
        }
    }, [furnitureColors]);

    const numericWidth = useMemo(() => width.map(Number), [width]);
    const numericHeight = useMemo(() => Number(height), [height]);

    const calculatePriceModifier = (price: number, isMatte = false) => {
        const totalArea = numericWidth.reduce((acc, w) =>
                acc + (Number(w) / 1000) * (numericHeight / 1000), // Конвертация мм -> м
            0
        );
        const priceDifference = isMatte
            ? price
            : Math.max(price - variables.ordinaryPrice, 0); // Защита от отрицательных значений

        return dollarToHryvnia(
            totalArea * priceDifference,
            dollarToHryvniaData
        );
    };

    const glassOptions = useMemo(() => [
        { id: 1, option: 'Звичайне' },
        { id: 2, option: `Діамант +${calculatePriceModifier(variables.diamondPrice)} ₴` },
        { id: 3, option: `Графіт +${calculatePriceModifier(variables.graphitePrice)} ₴` },
        { id: 4, option: `Бронза +${calculatePriceModifier(variables.bronzePrice)} ₴` }
    ], [numericWidth, numericHeight, dollarToHryvniaData, variables]);

    const glassTypeOptions = useMemo(() => [
        { id: 1, option: 'Прозоре' },
        { id: 2, option: `Матове +${calculatePriceModifier(variables.mattePrice, true)} ₴` }
    ], [numericWidth, numericHeight, dollarToHryvniaData, variables]);

    const calculateTotalPrice = () => {
        const totalArea = numericWidth.reduce((acc, w) => acc + (numericHeight * w), 0) / 1_000_000;
        const totalPerimeter = numericWidth.reduce((acc, w) => acc + (2 * numericHeight + 2 * w), 0) / 1000;

        const glassPrices = {
            'Звичайне': variables.ordinaryPrice,
            'Діамант': variables.diamondPrice,
            'Графіт': variables.graphitePrice,
            'Бронза': variables.bronzePrice
        };

        const typePrices = {
            'Прозоре': 0,
            'Матове': variables.mattePrice
        };

        const glassColorKey = glassColor.option.split(' ')[0];
        const glassTypeKey = glassType.option.split(' ')[0];

        const glassCost = totalArea * glassPrices[glassColorKey as keyof typeof glassPrices];
        const frameCost = totalPerimeter * variables.linearPrice;
        const hardeningCost = totalArea * variables.hardeningPrice;
        const typeCost = totalArea * typePrices[glassTypeKey as keyof typeof typePrices];
        const furnitureCost = furnitureColor.priceDollars || 0;
        const holesCost = numberHoles * variables.holesPrice;

        return glassCost + frameCost + hardeningCost + typeCost + furnitureCost + holesCost;
    };

    useEffect(() => {
        const price = calculateTotalPrice();
        setTotalPrice(price);
        handleSelectCharacteristics(
            numericHeight,
            numericWidth,
            glassColor.option,
            glassType.option,
            furnitureColor?.option || 'Default',
            price
        );
    }, [numericWidth, numericHeight, glassColor, glassType, furnitureColor]);

    const resetSettings = () => {
        setWidth(startWidth);
        setHeight(startHeight);
        setGlassColor(glassOptions[0]);
        setGlassType(glassTypeOptions[0]);
        setFurnitureColor(furnitureColors[0] || {id: 1, option: 'Default'});
    };

    return (
        <div className={cl.wrapper}>
            <h5>Калькулятор індивідуального замовлення</h5>
            <HeightWidth width={width} height={height} setWidth={setWidth} setHeight={setHeight}/>

            <InputSelect2 label='Колір скла' options={glassOptions} value={glassColor} onClick={setGlassColor}/>
            <InputSelect2 label='Тип скла' options={glassTypeOptions} value={glassType} onClick={setGlassType}/>
            <InputSelect2 label='Колір фурнітури' options={furnitureColors} value={furnitureColor}
                          onClick={setFurnitureColor}/>

            <Buttons
                handleCalculate={() => {
                }}
                returnToOriginalSettings={resetSettings}
            />

            <p className={cl.totalPrice}>
                Ціна від: <span>{dollarToHryvnia(totalPrice, dollarToHryvniaData)} ₴</span>
            </p>
        </div>
    );
};

export default Calculator;