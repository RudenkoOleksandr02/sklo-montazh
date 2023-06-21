import {connect} from "react-redux";
import {useEffect} from "react";
import {getMirrors} from "../../../store/catalog-reducer";
import Catalog from "../Catalog";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Mirrors = ({getMirrors, mirrors}) => {
    useEffect(() => {
        getMirrors();
    }, []);

    return <HelmetProvider>
        <>
            <Helmet>
                <meta name="description"
                      content="Каталог дзеркал: великі дзеркала на стіну, дзеркала з led підсвіткою, дзеркала з фацетом, стандартні дзеркала. Широкий асортимент дзеркал для вашого будинку чи офісу."
                />
                <meta name="keywords"
                      content="дзеркала, великі дзеркала, дзеркала на стіну, дзеркала з led підсвіткою, дзеркала з фацетом, стандартні дзеркала"
                />
            </Helmet>
            <Catalog titleCategory='Дзеркала'
                     category='mirror'
                     alt='Дзеркало'
                     products={mirrors}
            />
        </>
    </HelmetProvider>
}

const mapStateToProps = (state) => {
    return {
        mirrors: state.catalog.catalog
    }
}
export default connect(mapStateToProps, {getMirrors})(Mirrors);