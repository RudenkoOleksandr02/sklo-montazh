import React, {FC, useState} from 'react';
import cl from './DropDownList.module.css';
import {FurnitureNames} from "../../../pages/Furniture/Furniture";
import {ReactComponent as Arrow} from './arrow.svg'

interface IItem {
    name: string;
    param: any;
}

interface DropDownListProps {
    elems: IItem[];
    callback: (param: any) => void;
}

const DropDownList: FC<DropDownListProps> = ({elems, callback}) => {
    const [activePopup, setActivePopup] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<IItem>(elems[0]);

    const handleClickItem = (item: IItem) => {
        setSelectedItem(item);
        callback(item.param);
        setActivePopup(false);
    }

    return (
        <div className={cl.wrapper}>
            <button onClick={() => setActivePopup(prevState => !prevState)} className={`
                ${cl.selectedItem}
                ${activePopup ? cl.active : ''}
            `}>
                <span>{selectedItem.name}</span>
                <Arrow/>
            </button>
            <div className={`${cl.popup} ${activePopup ? cl.active : ''}`}>
                {elems.map(item => (
                    <button
                        key={item.param}
                        onClick={() => handleClickItem(item)}
                        disabled={item.param === selectedItem.param}
                        className={cl.item}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DropDownList;