import React, {FC, useEffect, useState} from 'react';
import { fetchCities } from '../fetchs/fetchCities';
import InputSelect1 from "../../../ui/InputSelect/InputSelect1/InputSelect1";
import {ICity} from "../NovaPoshta";

interface CitySelectorProps {
    setCity: (city: ICity | null) => void;
    isErrorCity: boolean;
}

const CitySelector: FC<CitySelectorProps> = ({ setCity, isErrorCity }) => {
    const [cities, setCities] = useState<ICity[]>([]);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        let isMounted = true;

        const fetchCitiesAsync = async () => {
            if (searchText.length > 0) {
                try {
                    const results = await fetchCities(searchText);
                    if (isMounted) {
                        setCities(results);
                    }
                } catch (error) {
                    if (isMounted) {
                        console.error("Ошибка при загрузке городов:", error);
                    }
                }
            } else {
                if (isMounted) {
                    setCities([]);
                    setCity(null);
                }
            }
        };

        fetchCitiesAsync();

        return () => {
            isMounted = false;
        };
    }, [searchText]);

    const handleInputChange = async (value: string) => {
        setSearchText(value);
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