import {connect} from "react-redux";
import {useEffect} from "react";
import {getPhotoPrintings} from "../../../store/catalog-reducer";
import Catalog from "../Catalog";
import {Helmet, HelmetProvider} from "react-helmet-async";

const PhotoPrintings = ({getPhotoPrintings, photoPrintings}) => {
    useEffect(() => {
        getPhotoPrintings();
    }, []);

    return <HelmetProvider>
        <>
            <Helmet>
                <meta name="description"
                      content="Ми пропонуємо фотодрук на склі у різних варіантах. Наш асортимент включає фотодрук на склі (вид 1), фотодрук на склі (вид 2) та фотодрук на склі (вид 3). Ціна залежить від ваших уподобань. Замовте фотодрук на склі за доступною ціною."
                />
                <meta name="keywords"
                      content="фотодрук на склі, фотодрук на склі вид 1, фотодрук на склі вид 2, фотодрук на склі вид 3, ціна, уподобання"
                />
            </Helmet>
            <Catalog titleCategory='Фотодрук на склі'
                     category='photo_printings'
                     alt='Фотодрук на склі'
                     products={photoPrintings}
            />
        </>
    </HelmetProvider>
}

const mapStateToProps = (state) => {
    return {
        photoPrintings: state.catalog.catalog
    }
}
export default connect(mapStateToProps, {getPhotoPrintings})(PhotoPrintings);