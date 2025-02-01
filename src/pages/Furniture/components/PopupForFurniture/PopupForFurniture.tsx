import React, {FC} from 'react';
import Popup from "../../../../components/ui/Popup/Popup";
import {IFurniture} from "../../../../types";
import cl from './PopupForFurniture.module.css'
import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import Skeleton from "../../../../components/ui/Skeleton/Skeleton";
import MarkdownWithStyle from "../../../../components/containers/MarkdownWithStyle/MarkdownWithStyle";

interface PopupForFurnitureProps {
    dataForPopup: IFurniture | null;
    handleClosePopup: (active: boolean) => void;
    dollarToHryvnia: number;
    activePopup: boolean;
}

const PopupForFurniture: FC<PopupForFurnitureProps> = ({
                                                           dataForPopup: item,
                                                           handleClosePopup,
                                                           dollarToHryvnia,
                                                           activePopup
                                                       }) => {
    return (
        <Popup active={activePopup} setActive={handleClosePopup}>
            <div className={cl.popupForFurniture}>
                <div className={cl.slider}>
                    <Swiper navigation={true} modules={[Navigation]}>
                        {item?.images.map((img, index) => (
                            <SwiperSlide key={img?.id || index}>
                                <div className={cl.imgContainer}>
                                    <Skeleton
                                        src={img.url}
                                        alt={img.alternativeText || 'furniture ' + item?.id}
                                        classNameImage={cl.image}
                                        classNameSkeleton={cl.skeleton}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <h3 className={cl.title}>{item?.name}</h3>
                <p className={cl.article}>Артикул: {item?.article}</p>
                <p className={cl.price}>Ціна: {item?.priceDollars && Math.ceil(item.priceDollars * dollarToHryvnia)} ₴</p>
                <div className={cl.description}>
                    <span className={cl.firstChild}>Опис:</span>
                    <MarkdownWithStyle content={item?.description || ''}/>
                </div>
            </div>
        </Popup>
    );
};

export default PopupForFurniture;