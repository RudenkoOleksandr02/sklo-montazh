import React, {FC} from 'react';
import cl from '../Furniture.module.css';
import {FurnitureNames} from "../Furniture";
import SecondaryButton from "../../../components/ui/buttons/SecondaryButton/SecondaryButton";
import DropDownList from "../../../components/ui/DropDownList/DropDownList";

interface GroupButtonsProps {
    handleSelectedParams: (param: FurnitureNames) => void;
    selectedParam: FurnitureNames;
}

const GroupButtons: FC<GroupButtonsProps> = ({selectedParam, handleSelectedParams}) => {
    const btnsData: {name: string, param: FurnitureNames}[] = [
        {name: 'Штанги', param: FurnitureNames.furniture_barbells},
        {name: 'Кріплення', param: FurnitureNames.furniture_fastenings},
        {name: 'Ручки', param: FurnitureNames.furniture_handles},
        {name: 'Петлі', param: FurnitureNames.furniture_loops},
        {name: 'Маятникові системи', param: FurnitureNames.furniture_pendulum_systems},
        {name: 'Профілі', param: FurnitureNames.furniture_profiles},
        {name: 'Ущільнювачі', param: FurnitureNames.furniture_sealers},
        {name: 'Поличні кріплення', param: FurnitureNames.furniture_shelf_mounts},
        {name: 'Розсувні системи', param: FurnitureNames.furniture_sliding_systems},
        {name: 'Поріжки', param: FurnitureNames.furniture_thresholds}
    ];

    return (
        <aside className={cl.groupButtons}>
            <div className={cl.desktop}>
                {btnsData.map(btn => (
                    <SecondaryButton
                        active={selectedParam === btn.param}
                        onClick={() => handleSelectedParams(btn.param)}
                        key={btn.param}
                    >
                        {btn.name}
                    </SecondaryButton>
                ))}
            </div>
            <div className={cl.mobile}>
                <DropDownList callback={handleSelectedParams} elems={btnsData}/>
            </div>
        </aside>
    );
};

export default GroupButtons;