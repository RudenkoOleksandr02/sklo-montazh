import {Box, Breadcrumbs, CircularProgress, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import CardProduct from "./CardProduct";
import s from '../common/Link/Link.module.css';

const Catalog = ({titleCategory, products, category, alt}) => {
    return <Box sx={{
        padding: '24px',
    }}>
        <Breadcrumbs aria-label='breadcrumbs' sx={{
            display: 'flex',
            justifyContent: 'right',
            fontSize: '14px'
        }}>
            <Link to='/home' className={s.item}>Головна</Link>
            <Typography sx={{
                fontSize: '14px'
            }}>{titleCategory}</Typography>
        </Breadcrumbs>
        <Box sx={{
            maxWidth: '1250px',
            margin: '0 auto'
        }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h5' component='h2' sx={{
                    textAlign: 'center',
                    margin: '16px 0'
                }}>{titleCategory}</Typography>
            </Grid>
            {products.length === 0
                ? <CircularProgress sx={{
                    display: 'block',
                    margin: '16px auto'
                }}/>
                : products.map((product, index) => {
                    return <CardProduct category={category}
                                        id={product.id}
                                        article={product.article}
                                        mainImage={product.mainImage}
                                        name={product.name}
                                        price={product.price}
                                        key={index}
                                        alt={alt}/>
                })}
        </Grid>
        </Box>
    </Box>
}

export default Catalog;
