import React, {FC} from 'react';
import {useFetchAllShowersQuery} from "../../services/ShowerService";
import {useFetchSeoQuery} from "../../services/SeoService";
import {dollarToHryvnia} from "../../utils/dollarToHryvnia";
import {Helmet, HelmetProvider} from "react-helmet-async";
import cl from "./Category.module.css";
import CardProduct from "../../components/ui/CardProduct/CardProduct";
import Preloader, {PreloaderVariant} from "../../components/ui/Preloader/Preloader";

interface ShowersProps {
    dollarToHryvniaData: number;
}

const Showers: FC<ShowersProps> = ({dollarToHryvniaData}) => {
    const {data: showersData, isLoading} = useFetchAllShowersQuery('');
    const {data: showersSeo} = useFetchSeoQuery('/showers-seo');

    const descriptionForShower = (defaultHeight: number, defaultWidth: number[]): string => {
        const height = defaultHeight + 'x';
        const width = (defaultWidth.map((width, index) => defaultWidth.length > 1 ? (defaultWidth.length - index !== 1 ? `${width}x` : width) : width)).join('')

        return 'Ціна за: ' + height + width + 'мм';
    }
    const priceForShower = (priceOrdinary: number, defaultHeight: number, defaultWidth: number[]): number => {
        const priceOrdinary100mmx100mm = priceOrdinary / 10000;
        const size = defaultHeight * defaultWidth.reduce((acc, curr) => Number(acc) + Number(curr), 0);
        const final = priceOrdinary100mmx100mm * size;

        return dollarToHryvnia(final, dollarToHryvniaData || 1);
    }

    const text = `Скляні душові кабіни — стильне рішення для ванної кімнати. Виготовлені з якісного скла, 
    вони створюють комфорт і відчуття простору. Доступні варіанти скла: прозоре, діамантове, бронзове, графітове.`

    return (
        <HelmetProvider>
            <Helmet>
                <meta name="description"
                      content={showersSeo?.description || ''}
                />
                <meta name="keywords"
                      content={showersSeo?.keywords || ''}
                />
            </Helmet>
            <>
                <div className={cl.top}>
                    <h2>Душові кабіни</h2>
                    <p>{text}</p>
                </div>
                {!isLoading ? (
                    <div className={cl.cardList}>
                        {showersData?.map(shower => (
                            <CardProduct
                                key={shower.id}
                                name={shower.name}
                                path={`/catalog/showers/${shower.id}`}
                                price={priceForShower(shower.priceOrdinary, shower.defaultHeight, shower.defaultWidth)}
                                measurement='₴'
                                article={shower.article}
                                description={descriptionForShower(shower.defaultHeight, shower.defaultWidth)}
                                image={shower.image}
                            />
                        ))}
                    </div>
                ) : <Preloader variant={PreloaderVariant.variant2}/>}
            </>
        </HelmetProvider>
    );
};

export default Showers;