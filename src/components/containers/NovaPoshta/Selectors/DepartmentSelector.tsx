import React, {useState, useEffect, FC} from 'react';
import { fetchDepartments } from '../fetchs/fetchDepartments';
import InputSelect1 from "../../../ui/InputSelect/InputSelect1/InputSelect1";

interface DepartmentSelectorProps {
    cityRef: string | null;
    handleSetDeliveryInfo: (value: string, key: string) => void;
    isErrorDepartment: boolean;
}

const DepartmentSelector: FC<DepartmentSelectorProps> = ({ cityRef, handleSetDeliveryInfo, isErrorDepartment }) => {
    const [departments, setDepartments] = useState<string[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [prevCityRef, setPrevCityRef] = useState<null | string>(null);

    useEffect(() => {
        handleSetDeliveryInfo(searchText, 'department')
    }, [searchText])

    useEffect(() => {
        let isMounted = true;

        const fetchDeps = async () => {
            if (!cityRef) {
                setDepartments([]);
                setSearchText('');
                return;
            }

            if (prevCityRef !== cityRef) {
                setDepartments([]);
                setSearchText('');
            }

            setPrevCityRef(cityRef);

            try {
                const results = await fetchDepartments(cityRef, searchText);
                if (isMounted) {
                    setDepartments(results);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Ошибка при загрузке отделений:", error);
                }
            }
        };

        fetchDeps();

        return () => {
            isMounted = false;
        };
    }, [cityRef, searchText, prevCityRef]);

    const handleInputChange = (value: string) => {
        setSearchText(value);
    };

    const handleOptionClick = (option: string) => {
        setSearchText(option);
    };

    return (
        <div>
            <InputSelect1
                title="Відділення"
                value={searchText}
                onInputChange={handleInputChange}
                onOptionClick={handleOptionClick}
                options={departments}
                disabled={cityRef === null}
                isError={isErrorDepartment}
            />
        </div>
    );
};

export default DepartmentSelector;