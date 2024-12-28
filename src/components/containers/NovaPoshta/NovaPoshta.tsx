import React, {FC, useEffect, useState} from 'react';
import CitySelector from './Selectors/CitySelector';
import DepartmentSelector from './Selectors/DepartmentSelector';
import classes from './NovaPoshta.module.css'

export interface ICity {
    id: string;
    name: string;
}

export interface INovaPoshta {
    handleSetDeliveryInfo: (value: string, key: string) => void;
    isErrorCity: boolean;
    isErrorDepartment: boolean;
}

const NovaPoshta: FC<INovaPoshta> = ({handleSetDeliveryInfo, isErrorCity, isErrorDepartment}) => {
    const [city, setCity] = useState<ICity | null>(null);

    useEffect(() => {
        if (city !== null && city !== undefined) {
            handleSetDeliveryInfo(city.name, 'city')
        }
    }, [city])

    return (
        <div className={classes.wrapper}>
            <CitySelector
                setCity={setCity}
                isErrorCity={isErrorCity}
            />
            <DepartmentSelector
                cityRef={city !== null ? city.id : null}
                handleSetDeliveryInfo={handleSetDeliveryInfo}
                isErrorDepartment={isErrorDepartment}
            />
        </div>
    );
};

export default NovaPoshta;