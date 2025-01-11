import React, {FC} from 'react';
import InputNumber from "../../ui/InputNumber/InputNumber";
import cl from './Calculator.module.css';

type width = (number | string)[];

interface HeightWidthProps {
    width: width;
    height: number | string;
    setWidth: React.Dispatch<React.SetStateAction<width>>;
    setHeight: (height: number | string) => void;
}

const HeightWidth: FC<HeightWidthProps> = ({width, height, setWidth, setHeight}) => {
    const changeNecessaryParam = (value: number | string, forWhom: 'width' | 'height', index?: number): void => {
        if (forWhom === 'width') {
            setWidth((prevState: width) => prevState.map((width, prevStateIndex) => prevStateIndex === index ? value : width));
        }
        if (forWhom === 'height') {
            setHeight(value);
        }
    }

    const handleDimensionsChange = (e: React.ChangeEvent<HTMLInputElement>, forWhom: 'width' | 'height', index?: number): void => {
        const value = Number(e.target.value);

        if (value > 10000) {
            changeNecessaryParam(10000, forWhom, index);
        }
        if (value <= 10000) {
            changeNecessaryParam(value, forWhom, index);
        }
        if (value === 0) {
            changeNecessaryParam('', forWhom, index)
        }
    }
    const handleDimensionsBlur = (e: React.ChangeEvent<HTMLInputElement>, forWhom: 'width' | 'height', index?: number): void => {
        const value = Number(e.target.value);

        if (value < 100) {
            changeNecessaryParam(100, forWhom, index);
        }
    }

    return (
        <div className={cl.heightWidthContainer}>
            <InputNumber
                label='Висота (мм)'
                value={height}
                onChange={e => handleDimensionsChange(e, 'height')}
                onBlur={e => handleDimensionsBlur(e, 'height')}
            />
            {width.map((el: number | string, index: number) => (
                <InputNumber
                    label={`Ширина ${width.length > 1 ? index + 1 : ''} (мм)`}
                    value={el}
                    onChange={e => handleDimensionsChange(e, 'width', index)}
                    onBlur={e => handleDimensionsBlur(e, 'width', index)}
                    key={index}
                />
            ))}
        </div>
    );
};

export default HeightWidth;