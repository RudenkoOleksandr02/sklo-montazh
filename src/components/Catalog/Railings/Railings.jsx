import {connect} from "react-redux";
import {useEffect} from "react";
import {getRailings} from "../../../store/catalog-reducer";
import Catalog from "../Catalog";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Railings = ({getRailings, railings}) => {
    useEffect(() => {
        getRailings();
    }, []);

    return <HelmetProvider>
        <>
            <Helmet>
                <meta name="description"
                      content="Ми пропонуємо скляні перила для балконів і терас. Наш асортимент включає перила для балкона, скляні перила для тераси. Ціна залежить від ваших уподобань. Замовте скляні перила для балкона та тераси за доступною ціною."
                />
                <meta name="keywords"
                      content="скляні перила, перила для балкону, скляні перила для тераси, ціна, уподобання"
                />
            </Helmet>
            <Catalog titleCategory='Скляні перила'
                     category='railings'
                     alt='Перила'
                     products={railings}
            />
        </>
    </HelmetProvider>

}

const mapStateToProps = (state) => {
    return {
        railings: state.catalog.catalog
    }
}
export default connect(mapStateToProps, {getRailings})(Railings);