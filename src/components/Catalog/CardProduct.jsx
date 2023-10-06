import {
    Card,
    CardContent,
    CardActions,
    CardMedia,
    Grid,
    Typography,
    Button,
    useMediaQuery,
    Skeleton, CircularProgress
} from "@mui/material";
import {Link} from "react-router-dom";
import {BaseURL} from "../common/BaseURL/BaseURL";
import s from './Catalog.module.css';
import {useEffect, useState} from "react";


const CardProduct = ({mainImage, name, price, alt, id, category}) => {
    const isMobileScreen = useMediaQuery('(max-width: 899px)')
    const [loaded, setLoaded] = useState(true);
    const handleImageLoad = () => {
        setLoaded(false);
    };

    return <Grid item md={4} xs={6}>
        <Card>
            {loaded && <Skeleton
                variant="rectangular"
                width={150}
                height={200}
                animation="wave"
                sx={{
                    margin: '0 auto 0 auto'
                }}
            />}
            <CardMedia
                component="img"
                sx={{
                    height: 'auto',
                    maxWidth: '250px',
                    objectFit: 'contain',
                    margin: '0 auto 0 auto'
                }}
                image={mainImage}
                alt={alt}
                style={{display: loaded ? 'none' : 'block'}}
                onLoad={handleImageLoad}
            />
            <CardContent>
                <Typography
                    variant={isMobileScreen ? 'body1' : 'h6'}
                    component='div'
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>{name}</Typography>
                <Typography
                    sx={{
                        textAlign: 'center'
                    }}>{price ? `Ціна товару: ${price} грн` : 'Ціна залежить від ваших уподобань'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant='outlined'
                    color='secondary'
                    sx={{
                        margin: '0 auto',
                        padding: '0'
                    }}
                >
                    <Link to={`/${category}/${id}`} className={s.link}>Перейти</Link>
                </Button>
            </CardActions>
        </Card>
    </Grid>
}

export default CardProduct;
