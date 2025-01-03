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

    useEffect(() => {
        handleSetDeliveryInfo(searchText, 'department')
    }, [searchText])

    useEffect(() => {
        const fetchDeps = async () => {
            if (cityRef) {
                const results = await fetchDepartments(cityRef, searchText);
                setDepartments(results);
            }
        };
        fetchDeps();
    }, [cityRef, searchText]);

    const handleInputChange = (e: React.ChangeEvent<any>) => {
        setSearchText(e.target.value);
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