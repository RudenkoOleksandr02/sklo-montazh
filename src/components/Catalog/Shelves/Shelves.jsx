import {connect} from "react-redux";
import {useEffect} from "react";
import {getShelves} from "../../../store/catalog-reducer";
import Catalog from "../Catalog";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Shelves = ({getShelves, shelves}) => {
    useEffect(() => {
        getShelves();
    }, []);

    return <HelmetProvider>
        <>
            <Helmet>
                <meta name="description"
                      content="Широкий вибір скляних полиць для різних потреб. В нашому асортименті є кутові скляні полиці та звичайні скляні полиці. Ціна залежить від ваших уподобань."
                />
                <meta name="keywords"
                      content="скляні полиці, кутові полиці, полиці зі скла, ціна, уподобання"
                />
            </Helmet>
            <Catalog titleCategory='Скляні полиці'
                     category='shelves'
                     alt='Полка'
                     products={shelves}
            />
        </>
    </HelmetProvider>
}

const mapStateToProps = (state) => {
    return {
        shelves: state.catalog.catalog
    }
}
export default connect(mapStateToProps, {getShelves})(Shelves);