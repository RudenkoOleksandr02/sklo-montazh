import React, {FC, useState} from 'react';
import { fetchCities } from '../fetchs/fetchCities';
import InputSelect1 from "../../../ui/InputSelect/InputSelect1/InputSelect1";
import {ICity} from "../NovaPoshta";

interface CitySelectorProps {
    setCity: (city: ICity) => void;
    isErrorCity: boolean;
}

const CitySelector: FC<CitySelectorProps> = ({ setCity, isErrorCity }) => {
    const [cities, setCities] = useState<ICity[]>([]);
    const [searchText, setSearchText] = useState<string>('');

    const handleInputChange = async (e: React.ChangeEvent<any>) => {
        const text = e.target.value;
        setSearchText(text);
        if (text.length > 0) {
            const results = await fetchCities(text);
            setCities(results);
        }
    };

    const handleOptionClick = (option: string) => {
        const selectedCity: ICity | undefined = cities.find(city => city.name === option);

        if (selectedCity) setCity(selectedCity);
        setSearchText(option);
    };

    return (
        <div>
            <InputSelect1
                title="Город"
                value={searchText}
                onInputChange={handleInputChange}
                onOptionClick={handleOptionClick}
                options={cities.map(city => city.name)}
                isError={isErrorCity}
            />
        </div>
    );
};

export default CitySelector;