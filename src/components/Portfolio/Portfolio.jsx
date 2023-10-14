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
                <Box sx={{
                    maxWidth: '1001px',
                    margin: '24px auto'
                }}>
                    <ToggleButtonGroup value={category}
                                       onChange={handleCategoryChange}
                                       aria-label='category'
                                       size='small'
                                       color='secondary'
                                       exclusive
                                       sx={{
                                           display: 'flex',
                                           flexWrap: 'wrap'
                                       }}
                    >
                        <ToggleButton value='door'
                                      onClick={() => handleClick(1)}
                                      aria-label='door'
                                      disabled={category === 'door'}
                                      sx={{
                                          flex: '1',
                                          minWidth: '100px',
                                          borderLeft: '1px solid #D5D5D5 !important',
                                          borderRadius: '0',
                                          marginLeft: '0 !important'
                                      }}
                        >Двері</ToggleButton>
                        <ToggleButton value='mirror'
                                      onClick={() => handleClick(2)}
                                      aria-label='mirror'
                                      disabled={category === 'mirror'}
                                      sx={{
                                          flex: '1',
                                          minWidth: '100px',
                                          borderLeft: '1px solid #D5D5D5 !important',
                                          borderRadius: '0',
                                          marginLeft: '0 !important'
                                      }}
                        >Дзеркала</ToggleButton>
                        <ToggleButton value='partition'
                                      onClick={() => handleClick(3)}
                                      aria-label='partition'
                                      disabled={category === 'partition'}
                                      sx={{
                                          flex: '1',
                                          minWidth: '100px',
                                          borderLeft: '1px solid #D5D5D5 !important',
                                          borderRadius: '0',
                                          marginLeft: '0 !important'
                                      }}
                        >Перегородки</ToggleButton>
                        <ToggleButton value='photoPrinting'
                                      onClick={() => handleClick(4)}
                                      aria-label='photo printing'
                                      disabled={category === 'photoPrinting'}
                                      sx={{
                                          flex: '1',
                                          minWidth: '100px',
                                          borderLeft: '1px solid #D5D5D5 !important',
                                          borderRadius: '0',
                                          marginLeft: '0 !important'
                                      }}
                        >Фотодрук</ToggleButton>
                        <ToggleButton value='railing'
                                      onClick={() => handleClick(5)}
                                      aria-label='railing'
                                      disabled={category === 'railing'}
                                      sx={{
                                          flex: '1',
                                          minWidth: '100px',
                                          borderLeft: '1px solid #D5D5D5 !important',
                                          borderRadius: '0',
                                          marginLeft: '0 !important'
                                      }}
                        >Перила</ToggleButton>
                        <ToggleButton value='shelf'
                                      onClick={() => handleClick(6)}
                                      aria-label='shelf'
                                      disabled={category === 'shelf'}
                                      sx={{
                                          flex: '1',
                                          minWidth: '100px',
                                          borderLeft: '1px solid #D5D5D5 !important',
                                          borderRadius: '0',
                                          marginLeft: '0 !important'
                                      }}
                        >Полиці</ToggleButton>
                        <ToggleButton value='shower'
                                      onClick={() => handleClick(7)}
                                      aria-label='shower'
                                      disabled={category === 'shower'}
                                      sx={{
                                          flex: '1',
                                          minWidth: '100px',
                                          borderLeft: '1px solid #D5D5D5 !important',
                                          borderRadius: '0',
                                          marginLeft: '0 !important'
                                      }}
                        >Душові кабіни</ToggleButton>
                    </ToggleButtonGroup>
                    <Paper
                        elevation={1}
                        sx={{
                            padding: '16px 0',
                            borderRadius: '0'
                        }}>
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
