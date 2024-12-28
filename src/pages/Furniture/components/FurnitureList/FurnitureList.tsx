import React, {FC, useState} from 'react';
import cl from '../Furniture.module.css';
import {IFurniture, IProduct} from "../../../types";
import Card from "../../../components/ui/Card/Card";
import Popup from "../../../components/ui/Popup/Popup";
import PopupForFurniture from "./PopupForFurniture";

interface FurnitureListProps {
    furniture: IFurniture[];
    dollarToHryvnia: number;
    handleAddProduct: (product: IProduct) => void;
    productsInCart: IProduct[];
    setIsOpenCart: (isOpenCart: boolean) => void;
}

const FurnitureList: FC<FurnitureListProps> = ({furniture, dollarToHryvnia, handleAddProduct, productsInCart, setIsOpenCart}) => {
    const [activePopup, setActivePopup] = useState<boolean>(false);
    const [dataForPopup, setDataForPopup] = useState<IFurniture | null>(null);

    const handleOpenPopup = (item: IFurniture) => {
        setDataForPopup(item);
        setActivePopup(true);
    }
    const handleClosePopup = () => {
        setActivePopup(false)
        const timeout = setTimeout(() => {
            setDataForPopup(null);
        }, 300)

        return () => clearTimeout(timeout);
    }

    return (
        <section className={cl.furnitureList}>
            {furniture.map(item => {
                const id: string = item.id + item.article + item.name + item.priceDollars;

                return <Card
                    img={{
                        src: item.images[0].url,
                        alternativeText: item.images[0].alternativeText || 'furniture ' + item.id
                    }}
                    firstButton={{
                        onClick: () => handleAddProduct({
                            id,
                            name: item.name,
                            price: Math.ceil(item.priceDollars * dollarToHryvnia),
                            article: item.article,
                            image: item.images[0],
                            quantity: 1
                        }),
                        text: 'Додати до кошика'
                    }}
                    secondaryButton={{
                        onClick: () => setIsOpenCart(true),
                        text: 'Перейти до кошика'
                    }}
                    title={item.name}
                    price={Math.ceil(item.priceDollars * dollarToHryvnia)}
                    inStock={item.inStock}
                    key={item.id}
                    quantityInCart={(productsInCart.find(product => product.id === id))?.quantity || 0}
                    onClickWrapp={() => handleOpenPopup(item)}
                />
            })}
            <PopupForFurniture dataForPopup={dataForPopup} activePopup={activePopup} handleClosePopup={handleClosePopup} dollarToHryvnia={dollarToHryvnia}/>
        </section>
    );
};

export default FurnitureList;