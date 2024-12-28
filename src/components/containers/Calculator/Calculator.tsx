import React, {FC, useEffect, useState} from 'react';
import cl from './Calculator.module.css';
import InputSelect2 from "../../ui/InputSelect2/InputSelect2";
import HeightWidth from "./HeightWidth";
import AdditionalOptions, {AdditionalOptionsProps, IAdditionalOption} from "./AdditionalOptions";
import Buttons from "./Buttons";
import {useFetchDollarToHryvniaQuery} from "../../../services/DollarToHryvnia";
import {dollarToHryvnia} from "../../../utils/dollarToHryvnia";

interface CalculatorProps extends AdditionalOptionsProps {
    startWidth: number[];
    startHeight: number;
    prices: IPrices;
    handleToggleCheckedByIdAdditionalOption: (id: number) => void;
    setCheckedFalseAdditionalOptions: () => void;
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
                                             setCheckedFalseAdditionalOptions
                                         }) => {
    const {data: dollarToHryvniaData} = useFetchDollarToHryvniaQuery('')
    const [width, setWidth] = useState<(number | string)[]>(startWidth);
    const [height, setHeight] = useState<number | string>(startHeight);

    const priceIncreaseRelativeToStandardGlass = (glassPrice: number) => {
        const validWidth = width.map(el => (typeof el === 'number' ? el : Number(el)));
        const totalArea = validWidth.reduce((acc: number, curr: number) => acc + (curr * Number(height)), dollarToHryvniaData || 1);

        return dollarToHryvnia(((totalArea * (glassPrice / 10000)) - (totalArea * (ordinaryPrice / 10000))), 42);
    }
    const [glassTypes, serGlassTypes] = useState<IOption[]>([
        {id: 1, option: 'Звичайне'},
        {id: 2, option: `Діамант +${priceIncreaseRelativeToStandardGlass(diamondPrice)}₴`},
        {id: 3, option: `Графіт +${priceIncreaseRelativeToStandardGlass(graphitePrice)}₴`},
        {id: 4, option: `Бронза +${priceIncreaseRelativeToStandardGlass(bronzePrice)}₴`}
    ]);

    useEffect(() => {
        serGlassTypes([
            {id: 1, option: 'Звичайне'},
            {id: 2, option: `Діамант +${priceIncreaseRelativeToStandardGlass(diamondPrice)}₴`},
            {id: 3, option: `Графіт +${priceIncreaseRelativeToStandardGlass(graphitePrice)}₴`},
            {id: 4, option: `Бронза +${priceIncreaseRelativeToStandardGlass(bronzePrice)}₴`}
        ])
    }, [diamondPrice, graphitePrice, bronzePrice]);

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
        const pricePer100mmX100mm: number =
            glassTypeOption === glassTypes[0].option ? ordinaryPrice :
                glassTypeOption === glassTypes[1].option ? diamondPrice :
                    glassTypeOption === glassTypes[2].option ? graphitePrice :
                        glassTypeOption === glassTypes[3].option ? bronzePrice : 1;

        const pricePerMm2 = pricePer100mmX100mm / 10000;
        const dimensions = validWidth.reduce((acc, curr) => acc + curr, 0) * validHeight;

        setTotalPrice((dimensions * pricePerMm2) + additionalOptionsTotalPrice);
    };
    const handleGlassTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const optionName = (e.target.value).split(' ')[0];
        const id = (glassTypes.find(option => (option.option).split(' ')[0] === optionName))?.id || 0;
        setGlassType({id: id, option: e.target.value});
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
                label='Тип скла'
                options={glassTypes}
                value={glassType}
                handleChange={e => handleGlassTypeChange(e)}
            />
            {additionalOptions !== null && !!additionalOptions.length && (
                <AdditionalOptions
                    additionalOptions={additionalOptions}
                    handleToggleCheckedByIdAdditionalOption={handleToggleCheckedByIdAdditionalOption}
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
            <p className={cl.totalPrice}>Загальна ціна: <span>{dollarToHryvnia(totalPrice, dollarToHryvniaData || 1)}₴</span></p>
        </div>
    );
};

export default Calculator;