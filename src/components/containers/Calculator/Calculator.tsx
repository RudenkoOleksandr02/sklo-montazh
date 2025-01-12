import React, {FC, useEffect, useState} from 'react';
import cl from './Calculator.module.css';
import HeightWidth from "./HeightWidth";
import AdditionalOptions, {AdditionalOptionsProps, IAdditionalOption} from "./AdditionalOptions";
import Buttons from "./Buttons";
import {dollarToHryvnia} from "../../../utils/dollarToHryvnia";
import InputSelect2 from "../../ui/InputSelect/InputSelect2/InputSelect2";

interface CalculatorProps extends AdditionalOptionsProps {
    startWidth: number[];
    startHeight: number;
    prices: IPrices;
    handleToggleCheckedByIdAdditionalOption: (id: number) => void;
    setCheckedFalseAdditionalOptions: () => void;
    dollarToHryvniaData: number;
    furnitureColors: IOption[];
    handleSelectCharacteristics: (height: number, width: number[], glassColor: string, glassType: string, furnitureColor: string, additionalOptions: IAdditionalOption[] | null, totalPrice: number) => void;
}

export interface IOption {
    id: number;
    option: string;
}

export interface IPrices {
    ordinaryPrice: number;
    diamondPrice: number;
    graphitePrice: number;
    bronzePrice: number;
    mattePrice: number;
}

const Calculator: FC<CalculatorProps> = ({
                                             startWidth,
                                             startHeight,
                                             prices: {ordinaryPrice, graphitePrice, diamondPrice, bronzePrice, mattePrice},
                                             additionalOptions,
                                             handleToggleCheckedByIdAdditionalOption,
                                             setCheckedFalseAdditionalOptions,
                                             dollarToHryvniaData,
                                             handleSelectCharacteristics,
                                             furnitureColors
                                         }) => {
    const [width, setWidth] = useState<(number | string)[]>(startWidth);
    const [height, setHeight] = useState<number | string>(startHeight);

    const priceIncreaseRelativeToStandardGlass = (glassPrice: number) => {
        const validWidth = width.map(el => (typeof el === 'number' ? el : Number(el)));
        const totalArea = validWidth.reduce((acc: number, curr: number) => acc + (curr * Number(height)), dollarToHryvniaData || 1);

        return dollarToHryvnia(((totalArea * (glassPrice / 10000)) - (totalArea * (ordinaryPrice / 10000))), dollarToHryvniaData || 1);
    }
    const priceIncreaseForMatte = (glassPrice: number) => {
        const validWidth = width.map(el => (typeof el === 'number' ? el : Number(el)));
        const totalArea = validWidth.reduce((acc: number, curr: number) => acc + (curr * Number(height)), dollarToHryvniaData || 1);

        return dollarToHryvnia(totalArea * (glassPrice / 10000), dollarToHryvniaData || 1);
    }

    const [glassColors, setGlassColors] = useState<IOption[]>([
        {id: 1, option: 'Звичайне'},
        {id: 2, option: `Діамант +${priceIncreaseRelativeToStandardGlass(diamondPrice)} ₴`},
        {id: 3, option: `Графіт +${priceIncreaseRelativeToStandardGlass(graphitePrice)} ₴`},
        {id: 4, option: `Бронза +${priceIncreaseRelativeToStandardGlass(bronzePrice)} ₴`}
    ]);
    const [glassTypes, setGlassTypes] = useState<IOption[]>([
        {id: 1, option: 'Прозоре'},
        {id: 2, option: `Матове +${priceIncreaseRelativeToStandardGlass(mattePrice)} ₴`},
    ]);

    useEffect(() => {
        setGlassColors([
            {id: 1, option: 'Звичайне'},
            {id: 2, option: `Діамант +${priceIncreaseRelativeToStandardGlass(diamondPrice)} ₴`},
            {id: 3, option: `Графіт +${priceIncreaseRelativeToStandardGlass(graphitePrice)} ₴`},
            {id: 4, option: `Бронза +${priceIncreaseRelativeToStandardGlass(bronzePrice)} ₴`}
        ]);
        setGlassTypes([
            {id: 1, option: 'Прозоре'},
            {id: 2, option: `Матове +${priceIncreaseForMatte(mattePrice)} ₴`},
        ]);
    }, [diamondPrice, graphitePrice, bronzePrice, mattePrice, width, height]);

    const [glassColor, setGlassColor] = useState<IOption>(glassColors[0]);
    const [glassType, setGlassType] = useState<IOption>(glassTypes[0]);
    const [furnitureColor, setFurnitureColor] = useState<IOption>(furnitureColors[0]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        setFurnitureColor(furnitureColors[0]);
    }, [furnitureColors]);

    useEffect(() => {
        glassColors.forEach(option => {
            if (option.id === glassColor.id)
                setGlassColor(option);
        });
        glassTypes.forEach(option => {
            if (option.id === glassType.id)
                setGlassType(option);
        });
    }, [width, height]);

    useEffect(() => {
        handleCalculate(startWidth, startHeight, glassColors[0].option, glassTypes[0].option, furnitureColors[0].option, additionalOptions !== null ? additionalOptions : []);
    }, [ordinaryPrice, startWidth, startHeight, mattePrice]);

    const handleCalculate = (
        width: (number | string)[],
        height: number | string,
        glassColorOption: string,
        glassTypeOption: string,
        furnitureColorOption: string,
        additionalOptions: IAdditionalOption[]
    ) => {
        const validWidth = width.map(el => (typeof el === 'number' ? el : Number(el)));
        const validHeight = typeof height === 'number' ? height : Number(height);

        const additionalOptionsTotalPrice = additionalOptions.filter(option => option.checked).reduce((acc, curr) => acc + curr.price, 0);

        const glassColorOptionFormat = glassColorOption.split(' ')[0];
        const pricePer100mmX100mm: number =
            glassColorOptionFormat === glassColors[0].option.split(' ')[0] ? ordinaryPrice :
                glassColorOptionFormat === glassColors[1].option.split(' ')[0] ? diamondPrice :
                    glassColorOptionFormat === glassColors[2].option.split(' ')[0] ? graphitePrice :
                        glassColorOptionFormat === glassColors[3].option.split(' ')[0] ? bronzePrice : 1;

        const glassTypeOptionFormat = glassTypeOption.split(' ')[0];
        const priceMatte100mmX100mm: number =
            glassTypeOptionFormat === glassTypes[0].option.split(' ')[0] ? 0 :
                glassTypeOptionFormat === glassTypes[1].option.split(' ')[0] ? mattePrice : 0;

        const pricePerMm2 = pricePer100mmX100mm / 10000;
        const priceMatteMm2 = priceMatte100mmX100mm / 10000;
        const dimensions = validWidth.reduce((acc, curr) => acc + curr, 0) * validHeight;

        setTotalPrice((dimensions * pricePerMm2) + (dimensions * priceMatteMm2) + additionalOptionsTotalPrice);
        handleSelectCharacteristics(validHeight, validWidth, glassColorOption, glassTypeOption, furnitureColorOption, additionalOptions.filter(option => option.checked), (dimensions * pricePerMm2) + (dimensions * priceMatteMm2) + additionalOptionsTotalPrice)
    };

    const handleGlassColorChange = (option: IOption) => {
        setGlassColor(option);
    }
    const handleGlassTypeChange = (option: IOption) => {
        setGlassType(option);
    }
    const handleFurnitureColorChange = (option: IOption) => {
        setFurnitureColor(option);
    }

    const returnToOriginalSetting = () => {
        setWidth(startWidth);
        setHeight(startHeight);
        setGlassColor(glassColors[0]);
        setGlassType(glassTypes[0]);
        setFurnitureColor(furnitureColors[0]);
        setCheckedFalseAdditionalOptions();

        handleCalculate(startWidth, startHeight, glassColors[0].option, glassTypes[0].option, furnitureColors[0].option, additionalOptions !== null ? additionalOptions.map(option => ({
            ...option,
            checked: false
        })) : []);
    }

    useEffect(() => {
        handleCalculate(width, height, glassColor.option, glassType.option, furnitureColor.option, additionalOptions !== null ? additionalOptions.map(option => ({
            ...option,
            checked: false
        })) : [])
    }, [width, height, glassColor.option, glassType.option, furnitureColor.option, additionalOptions]);

    return (
        <div className={cl.wrapper}>
            <h5>Калькулятор індивідуального замовлення</h5>
            <HeightWidth
                width={width}
                height={height}
                setWidth={setWidth}
                setHeight={setHeight}
            />
            <InputSelect2
                label='Колір скла'
                options={glassColors}
                value={glassColor}
                onClick={handleGlassColorChange}
            />
            <InputSelect2
                label='Тип скла'
                options={glassTypes}
                value={glassType}
                onClick={handleGlassTypeChange}
            />
            <InputSelect2
                label='Колір фурнітури'
                options={furnitureColors}
                value={furnitureColor}
                onClick={handleFurnitureColorChange}
            />
            {additionalOptions !== null && !!additionalOptions.length && (
                <AdditionalOptions
                    additionalOptions={additionalOptions}
                    handleToggleCheckedByIdAdditionalOption={handleToggleCheckedByIdAdditionalOption}
                    dollarToHryvniaData={dollarToHryvniaData || 1}
                />
            )}
            <Buttons
                handleCalculate={() => (
                    handleCalculate(
                        width,
                        height,
                        glassColor.option,
                        glassType.option,
                        furnitureColor.option,
                        additionalOptions !== null ? additionalOptions : []
                    )
                )}
                returnToOriginalSettings={() => returnToOriginalSetting()}
            />
            <p className={cl.totalPrice}>Ціна від: <span>{dollarToHryvnia(totalPrice, dollarToHryvniaData || 1)} ₴</span></p>
        </div>
    );
};

export default Calculator;