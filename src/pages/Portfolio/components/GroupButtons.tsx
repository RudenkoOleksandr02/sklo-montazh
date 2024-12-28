import React, {FC} from 'react';
import cl from "./GroupButtons.module.css";
import SecondaryButton from "../../../components/ui/buttons/SecondaryButton/SecondaryButton";
import {OptionsForSelect} from "../sections/ImagesSection";
import DropDownList from "../../../components/ui/DropDownList/DropDownList";

interface GroupButtonsProps {
    selectedCategory: OptionsForSelect;
    handleSelectImages: (option: OptionsForSelect) => void;
}

const GroupButtons: FC<GroupButtonsProps> = ({selectedCategory, handleSelectImages}) => {
    const btnsData: {name: string, param: OptionsForSelect}[] = [
        {name: 'Усі', param: OptionsForSelect.all_images},
        {name: 'Душові кабіни', param: OptionsForSelect.shower_images},
        {name: 'Дзеркала', param: OptionsForSelect.mirror_images},
        {name: 'Двері', param: OptionsForSelect.door_images},
        {name: 'Перила та перегородки', param: OptionsForSelect.partitionAndRailing_images},
        {name: 'Полиці', param: OptionsForSelect.shelf_images},
        {name: 'Фотодрук на склі', param: OptionsForSelect.photoPrinting_images},
    ];

    return (
        <div className={cl.groupButtons}>
            <div className={cl.desktop}>
                {btnsData.map(btn => (
                    <SecondaryButton
                        active={selectedCategory === btn.param}
                        onClick={() => handleSelectImages(btn.param)}
                        key={btn.param}
                    >
                        {btn.name}
                    </SecondaryButton>
                ))}
            </div>
            <div className={cl.mobile}>
                <DropDownList callback={handleSelectImages} elems={btnsData}/>
            </div>
        </div>
    );
};

export default GroupButtons;