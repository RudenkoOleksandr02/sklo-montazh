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
    handleSelectCharacteristics: (height: number, width: number[], glassType: string, additionalOptions: IAdditionalOption[] | null, totalPrice: number) => void;
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
}

const Calculator: FC<CalculatorProps> = ({
                                             startWidth,
                                             startHeight,
                                             prices: {ordinaryPrice, graphitePrice, diamondPrice, bronzePrice},
                                             additionalOptions,
                                             handleToggleCheckedByIdAdditionalOption,
                                             setCheckedFalseAdditionalOptions,
                                             dollarToHryvniaData,
                                             handleSelectCharacteristics
                                         }) => {
    const [width, setWidth] = useState<(number | string)[]>(startWidth);
    const [height, setHeight] = useState<number | string>(startHeight);

    const priceIncreaseRelativeToStandardGlass = (glassPrice: number) => {
        const validWidth = width.map(el => (typeof el === 'number' ? el : Number(el)));
        const totalArea = validWidth.reduce((acc: number, curr: number) => acc + (curr * Number(height)), dollarToHryvniaData || 1);

        return dollarToHryvnia(((totalArea * (glassPrice / 10000)) - (totalArea * (ordinaryPrice / 10000))), dollarToHryvniaData || 1);
    }
    const [glassTypes, setGlassTypes] = useState<IOption[]>([
        {id: 1, option: 'Звичайне'},
        {id: 2, option: `Діамант +${priceIncreaseRelativeToStandardGlass(diamondPrice)} ₴`},
        {id: 3, option: `Графіт +${priceIncreaseRelativeToStandardGlass(graphitePrice)} ₴`},
        {id: 4, option: `Бронза +${priceIncreaseRelativeToStandardGlass(bronzePrice)} ₴`}
    ]);

    useEffect(() => {
        setGlassTypes([
            {id: 1, option: 'Звичайне'},
            {id: 2, option: `Діамант +${priceIncreaseRelativeToStandardGlass(diamondPrice)} ₴`},
            {id: 3, option: `Графіт +${priceIncreaseRelativeToStandardGlass(graphitePrice)} ₴`},
            {id: 4, option: `Бронза +${priceIncreaseRelativeToStandardGlass(bronzePrice)} ₴`}
        ]);
    }, [diamondPrice, graphitePrice, bronzePrice, width, height]);

    const [glassType, setGlassType] = useState<IOption>(glassTypes[0]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        glassTypes.forEach(option => {
            if (option.id === glassType.id)
                setGlassType(option);
        })
    }, [width, height]);
    useEffect(() => {
        handleCalculate(startWidth, startHeight, glassTypes[0].option, additionalOptions !== null ? additionalOptions : []);
    }, [ordinaryPrice, startWidth, startHeight]);

    const handleCalculate = (
        width: (number | string)[],
        height: number | string,
        glassTypeOption: string,
        additionalOptions: IAdditionalOption[]
    ) => {
        const validWidth = width.map(el => (typeof el === 'number' ? el : Number(el)));
        const validHeight = typeof height === 'number' ? height : Number(height);

        const additionalOptionsTotalPrice = additionalOptions.filter(option => option.checked).reduce((acc, curr) => acc + curr.price, 0);

        const glassTypeOptionFormat = glassTypeOption.split(' ')[0];
        const pricePer100mmX100mm: number =
            glassTypeOptionFormat === glassTypes[0].option.split(' ')[0] ? ordinaryPrice :
                glassTypeOptionFormat === glassTypes[1].option.split(' ')[0] ? diamondPrice :
                    glassTypeOptionFormat === glassTypes[2].option.split(' ')[0] ? graphitePrice :
                        glassTypeOptionFormat === glassTypes[3].option.split(' ')[0] ? bronzePrice : 1;
        const pricePerMm2 = pricePer100mmX100mm / 10000;
        const dimensions = validWidth.reduce((acc, curr) => acc + curr, 0) * validHeight;

        setTotalPrice((dimensions * pricePerMm2) + additionalOptionsTotalPrice);
        handleSelectCharacteristics(validHeight, validWidth, glassTypeOption, additionalOptions.filter(option => option.checked), (dimensions * pricePerMm2) + additionalOptionsTotalPrice)
    };
    const handleGlassTypeChange = (option: IOption) => {
        setGlassType(option);
    }

    const returnToOriginalSetting = () => {
        setWidth(startWidth);
        setHeight(startHeight);
        setGlassType(glassTypes[0]);
        setCheckedFalseAdditionalOptions()

        handleCalculate(startWidth, startHeight, glassTypes[0].option, additionalOptions !== null ? additionalOptions.map(option => ({
            ...option,
            checked: false
        })) : []);
    }

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
                options={glassTypes}
                value={glassType}
                onClick={handleGlassTypeChange}
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
                        glassType.option,
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