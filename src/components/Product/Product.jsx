import {useEffect} from "react";
import {withRouter} from "../../HOC/withRouter";
import {connect} from "react-redux";
import {getProduct} from "../../store/product-reducer";
import {compose} from "redux";
import {Box, CircularProgress, Grid} from "@mui/material";
import ProductImages from "./ProductImages/ProductImages";
import ProductContent from "./ProductContent/ProductContent";
import ProductDescription from "./ProductDescription/ProductDescription";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {BaseURL} from "../common/BaseURL/BaseURL";

const Product = (props) => {
    const productId = props.match.params.productId
    const categoryById = props.match.params.category + '_by_id'
    const category = props.match.params.category
    const {
        name,
        price,
        article,
        description,
        preDescription,
        mainImage,
        otherImage,
        metaDescription,
        metaKeys
    } = props.product
    useEffect(() => {
        props.getProduct(productId, categoryById);
    }, []);

    if (name === '') {
        return <CircularProgress sx={{
            display: 'block',
            margin: '16px auto'
        }}/>
    }

    return <HelmetProvider>
        <>
            <Helmet>
                <meta name="description"
                      content={metaDescription}
                />
                <meta name="keywords"
                      content={metaKeys}
                />
            </Helmet>
            <Box sx={{
                maxWidth: '1250px',
                margin: 'auto'
            }}>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        padding: '24px'
                    }}
                >
                    <Grid item md={5} xs={12}>
                        <ProductImages
                            mainImage={BaseURL + '/assets/' + mainImage}
                            otherImage={otherImage.map(img => BaseURL + '/assets/' + img.id)}
                        />
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <ProductContent article={article}
                                        name={name}
                                        price={price}
                                        category={category}
                                        preDescription={preDescription}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {description && <ProductDescription description={description}/>}
                    </Grid>
                </Grid>
            </Box>
        </>
    </HelmetProvider>
}

const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}
export default compose(
    withRouter,
    connect(mapStateToProps, {getProduct})
)(Product);

