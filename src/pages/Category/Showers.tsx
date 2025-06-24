import React, {FC} from 'react';
import {useFetchAllShowersQuery, useFetchVariablesForShowersQuery} from "../../services/ShowerService";
import {useFetchSeoQuery} from "../../services/SeoService";
import {dollarToHryvnia} from "../../utils/dollarToHryvnia";
import {Helmet, HelmetProvider} from "react-helmet-async";
import cl from "./Category.module.css";
import CardProduct from "../../components/ui/CardProduct/CardProduct";
import Preloader from "../../components/ui/Preloader/Preloader";
import linksToService from './../../data/linksToServices.json';

interface ShowersProps {
    dollarToHryvniaData: number;
}

const Showers: FC<ShowersProps> = ({dollarToHryvniaData}) => {
    const {data: allShowersData, isLoading: allShowersLoading} = useFetchAllShowersQuery('');
    const {data: variables, isLoading: varsLoading} = useFetchVariablesForShowersQuery('');
    const {data: showersSeo} = useFetchSeoQuery('/showers-seo');

    const calculateShowerPrice = (
        height: number,
        widths: number[],
        holes: number,
        furniturePrice: number
    ): number => {
        if (!variables) return 0;

        const totalArea = widths.reduce((acc, w) => acc + (height * w) / 1_000_000, 0);
        const totalPerimeter = widths.reduce((acc, w) => acc + (2 * height + 2 * w) / 1000, 0);

        const glassCost = totalArea * variables.ordinaryPrice;
        const frameCost = totalPerimeter * variables.linearPrice;
        const holesCost = holes * variables.holesPrice;
        const hardeningCost = totalArea * variables.hardeningPrice;

        const totalDollars = glassCost + frameCost + holesCost + hardeningCost + furniturePrice;

        return dollarToHryvnia(totalDollars, dollarToHryvniaData);
    };

    const getDimensionsString = (height: number, widths: number[]): string => {
        return `${height}x${widths.join('x')} мм`;
    }

    const categoryDescription = `Скляні душові кабіни виготовлені з загартованого скла товщиною 8-10 мм. 
    Стандартна висота 2000 мм, ширина від 600 мм.`;

    if (varsLoading || allShowersLoading) return <Preloader />;

    return (
        <HelmetProvider>
            <Helmet>
                <meta name="description" content={showersSeo?.description || ''} />
                <meta name="keywords" content={showersSeo?.keywords || ''} />
            </Helmet>

            <div className={cl.top}>
                <h1>Душові кабіни</h1>
                <p className={cl.description}>{categoryDescription}</p>
            </div>

            <div className={cl.cardList}>
                {allShowersData?.map(shower => (
                    <CardProduct
                        key={shower.id}
                        name={shower.name}
                        path={`${linksToService[0].path}/${shower.documentId}`}
                        price={calculateShowerPrice(
                            shower.defaultHeight,
                            shower.defaultWidth,
                            shower.numberHoles,
                            shower.furniturePrice
                        )}
                        measurement='₴'
                        article={shower.article}
                        description={getDimensionsString(
                            shower.defaultHeight,
                            shower.defaultWidth
                        )}
                        image={shower.image}
                        priceFrom={true}
                    />
                ))}
            </div>
        </HelmetProvider>
    );
};

export default Showers;