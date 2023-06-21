import {Breadcrumbs, CircularProgress, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import CardProduct from "./CardProduct";
import s from '../common/Link/Link.module.css';

const Catalog = ({titleCategory, products, category, alt}) => {
    return <Grid container spacing={2} sx={{
        padding: '24px'
    }}>
        <Grid item xs={12}>
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
        </Grid>
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
                                    mainImage={product.mainImage}
                                    name={product.name}
                                    price={product.price}
                                    key={index}
                                    alt={alt}/>
            })}
    </Grid>
}

export default Catalog;