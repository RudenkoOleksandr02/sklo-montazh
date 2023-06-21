import {connect} from "react-redux";
import {useEffect} from "react";
import {getPartitions} from "../../../store/catalog-reducer";
import Catalog from "../Catalog";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Partitions = ({getPartitions, partitions}) => {
    useEffect(() => {
        getPartitions();
    }, []);

    return <HelmetProvider>
        <>
            <Helmet>
                <meta name="description"
                      content="Великий вибір скляних перегородок. Замовляйте скляну перегородку залежно від ваших уподобань. Дізнайтеся про ціни та вигідні пропозиції на скляні перегородки."
                />
                <meta name="keywords"
                      content="скляні перегородки, скляна перегородка, ціна, уподобання"
                />
            </Helmet>
            <Catalog titleCategory='Скляні перегородки'
                     category='partition'
                     alt='перегородка'
                     products={partitions}
            />
        </>
    </HelmetProvider>

}

const mapStateToProps = (state) => {
    return {
        partitions: state.catalog.catalog
    }
}
export default connect(mapStateToProps, {getPartitions})(Partitions);