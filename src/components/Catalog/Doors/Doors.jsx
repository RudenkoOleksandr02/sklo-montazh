import {connect} from "react-redux";
import {useEffect} from "react";
import {getDoors} from "../../../store/catalog-reducer";
import Catalog from "../Catalog";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Doors = ({getDoors, doors}) => {
    useEffect(() => {
        getDoors();
    }, []);

    return <HelmetProvider>
        <>
            <Helmet>
                <meta name="description"
                      content="Широкий вибір прозорих та матових скляних дверей. Замовляйте скляні двері залежно від ваших уподобань. Дізнайтеся про ціни та вигідні пропозиції на скляні двері."
                />
                <meta name="keywords"
                      content="скляні двері, прозорі двері, матові двері, ціна, уподобання"
                />
            </Helmet>
            <Catalog titleCategory='Скляні двері'
                     category='doors'
                     alt='Двері'
                     products={doors}
            />
        </>
    </HelmetProvider>
}

const mapStateToProps = (state) => {
    return {
        doors: state.catalog.catalog
    }
}
export default connect(mapStateToProps, {getDoors})(Doors);