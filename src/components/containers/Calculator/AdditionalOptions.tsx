import React, {FC} from 'react';
import cl from "./Calculator.module.css";
import Checkbox from "../../ui/Checkbox/Checkbox";
import {dollarToHryvnia} from "../../../utils/dollarToHryvnia";

export interface IAdditionalOption {
    id: number;
    title: string;
    price: number;
    checked: boolean;
}

export interface AdditionalOptionsProps {
    additionalOptions: IAdditionalOption[] | null;
    handleToggleCheckedByIdAdditionalOption: (id: number) => void;
    dollarToHryvniaData: number;
}

const AdditionalOptions: FC<AdditionalOptionsProps> = ({additionalOptions, handleToggleCheckedByIdAdditionalOption, dollarToHryvniaData}) => {
    return (
        <div className={cl.additionalOptionsContainer}>
            {additionalOptions && !!additionalOptions.length && (
                <div className={cl.additionalOptions}>
                    {additionalOptions.map(option => (
                        <Checkbox
                            label={`${option.title} +${dollarToHryvnia(option.price, dollarToHryvniaData)}₴`}
                            checked={option.checked}
                            onChange={() => handleToggleCheckedByIdAdditionalOption(option.id)}
                            key={option.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdditionalOptions;