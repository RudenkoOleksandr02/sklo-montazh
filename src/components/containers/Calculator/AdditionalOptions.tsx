import React, {FC} from 'react';
import cl from "./Calculator.module.css";
import Checkbox from "../../ui/Checkbox/Checkbox";

export interface IAdditionalOption {
    id: number;
    title: string;
    price: number;
    checked: boolean;
}

export interface AdditionalOptionsProps {
    additionalOptions: IAdditionalOption[] | null;
    handleToggleCheckedByIdAdditionalOption: (id: number) => void;
}

const AdditionalOptions: FC<AdditionalOptionsProps> = ({additionalOptions, handleToggleCheckedByIdAdditionalOption}) => {
    return (
        <div className={cl.additionalOptionsContainer}>
            {additionalOptions && !!additionalOptions.length && (
                <div className={cl.additionalOptions}>
                    {additionalOptions.map(option => (
                        <Checkbox
                            label={`${option.title} +${Math.ceil(option.price) * 42}₴`}
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