import {connect} from "react-redux";
import {useEffect} from "react";
import {getShowers} from "../../../store/catalog-reducer";
import Catalog from "../Catalog";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Showers = ({getShowers, showers}) => {
    useEffect(() => {
        getShowers();
    }, []);

    return <HelmetProvider>
        <>
            <Helmet>
                <meta name="description"
                      content="Каталог душових кабін: Душ перегородка на ванну з одним глухим склом 1600х600, Душова перегородка 2000х900, Кутова душ кабіна 2000x800x800 також інші моделі. Великий вибір і професійний монтаж."
                />
                <meta name="keywords"
                      content="душові кабіни, душові перегородки, скляні двері, кутові душові кабіни, розсувні душові кабіни, скляні перегородки, нестандартні душові кабіни, монтаж душових кабін"
                />
            </Helmet>
            <Catalog titleCategory='Душові кабіни та огорожі'
                     category='shower'
                     alt='Душова'
                     products={showers}
            />
        </>
    </HelmetProvider>
}

const mapStateToProps = (state) => {
    return {
        showers: state.catalog.catalog
    }
}
export default connect(mapStateToProps, {getShowers})(Showers);