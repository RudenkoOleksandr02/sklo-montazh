import {
    ToggleButton,
    Grid,
    Stack,
    ToggleButtonGroup,
    Paper,
    CircularProgress,
    Typography,
    Breadcrumbs,
    Box
} from "@mui/material";
import {getProductGallery} from "../../store/portfolio-reducer";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import Image from './Image/Image';
import {Link} from "react-router-dom";
import s from "../common/Link/Link.module.css";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Portfolio = ({getProductGallery, gallery: {images, title}}) => {
    const [photos, setPhotos] = useState(null);
    const [category, setCategory] = useState('door');
    const handleClick = (id) => {
        getProductGallery(id);
    }
    const handleCategoryChange = (e, update) => {
        if (update !== null) {
            setCategory(update);
        }
    }

    useEffect(() => {
        getProductGallery(1);
    }, []);
    useEffect(() => {
        setPhotos(images);
    }, [images]);

    return <HelmetProvider>
        <>
            <Helmet>
                <meta name="description"
                      content="Перегляньте наше портфоліо з душових кабін, дзеркал, дверей, полиць, перегородок, перил та фотодруку. Дізнайтеся про різноманітність наших проектів та якість наших виробів."
                />
                <meta name="keywords"
                      content="портфоліо, душові кабіни, дзеркала, двері, полиці, перегородки, перила, фотодрук"
                />
            </Helmet>
            <Box sx={{
                padding: '24px'
            }}>
                <Breadcrumbs aria-label='breadcrumbs' sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    fontSize: '14px'
                }}>
                    <Link to='/home' className={s.item}>Головна</Link>
                    <Typography sx={{
                        fontSize: '14px'
                    }}>Портфоліо</Typography>
                </Breadcrumbs>
                <Box>
                    <Typography variant='h5' component='h2' sx={{
                        textAlign: 'center',
                        margin: '16px 0'
                    }}>Портфоліо</Typography>
                </Box>
                <Paper
                    elevation={4}
                    sx={{
                        maxWidth: '1000px',
                        margin: '24px auto',
                        paddingBottom: '16px'
                    }}>
                    <Stack direction='row' justifyContent='center' flexWrap='wrap'>
                        <ToggleButtonGroup value={category}
                                           onChange={handleCategoryChange}
                                           aria-label='category'
                                           size='small'
                                           color='secondary'
                                           exclusive
                                           sx={{
                                               display: 'flex',
                                               flexWrap: 'wrap',
                                               justifyContent: 'center'
                                           }}
                        >
                            <ToggleButton value='door'
                                          onClick={() => handleClick(1)}
                                          aria-label='door'
                            >Двері</ToggleButton>
                            <ToggleButton value='mirror'
                                          onClick={() => handleClick(2)}
                                          aria-label='mirror'
                            >Дзеркала</ToggleButton>
                            <ToggleButton value='partition'
                                          onClick={() => handleClick(3)}
                                          aria-label='partition'
                            >Перегородки</ToggleButton>
                            <ToggleButton value='photoPrinting'
                                          onClick={() => handleClick(4)}
                                          aria-label='photo printing'
                            >Фотодрук</ToggleButton>
                            <ToggleButton value='railing'
                                          onClick={() => handleClick(5)}
                                          aria-label='railing'
                            >Перила</ToggleButton>
                            <ToggleButton value='shelf'
                                          onClick={() => handleClick(6)}
                                          aria-label='shelf'
                            >Полиці</ToggleButton>
                            <ToggleButton value='shower'
                                          onClick={() => handleClick(7)}
                                          aria-label='shower'
                            >Душові кабіни</ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                    {!images
                        ? <CircularProgress sx={{
                            display: 'block',
                            margin: '16px auto'
                        }}/>
                        : <Grid container rowSpacing={2}>
                            {photos && photos.map((image, index) => {
                                return <Image
                                    key={index}
                                    image={image}
                                    title={title}
                                />
                            })}
                        </Grid>
                    }
                </Paper>
            </Box>
        </>
    </HelmetProvider>
}

const mapStateToProps = (state) => {
    return {
        gallery: state.portfolio.gallery
    }
}
export default connect(mapStateToProps, {getProductGallery})(Portfolio);
