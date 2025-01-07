import React, {FC} from 'react';
import {IImage} from "../../../types";
import cl from './CardProduct.module.css';
import Skeleton from "../Skeleton/Skeleton";
import {useNavigate} from "react-router-dom";

interface CardProductProps {
    name: string;
    measurement: string;
    description: string;
    price: number;
    path: string;
    image: IImage;
    article?: string;
    priceFrom?: boolean;
}

const CardProduct: FC<CardProductProps> = ({
                                               path,
                                               article,
                                               price,
                                               measurement,
                                               name,
                                               image,
                                               description,
                                               priceFrom = false
                                           }) => {
    const navigate = useNavigate();

    return (
        <div className={cl.wrapper} onClick={() => navigate(path)}>
            <Skeleton
                src={image.url}
                alt={image.alternativeText || 'product ' + image.id}
                classNameSkeleton={cl.skeleton}
                classNameImage={cl.image}
            />
            <div className={cl.content}>
                <div className={cl.inner}>
                    <p className={cl.name}>{name} {article && <>|<span> артикул: {article}</span></>}</p>
                    <div className={cl.descriptionWithPrice}>
                        <p className={cl.description}>{description}</p>
                        <div className={cl.price}>
                            {!!price ? (priceFrom ? 'від ' : '') + price + ' ' + measurement : 'Ціну уточнюйте'}
                        </div>
                    </div>
                </div>
                <div className={cl.toGo}>
                    <span>ПЕРЕЙТИ</span>
                </div>
            </div>
        </div>
    );
};

export default CardProduct;