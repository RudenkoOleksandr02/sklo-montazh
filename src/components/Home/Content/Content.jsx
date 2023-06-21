import {Grid, Box, Typography, Button, Stack, useMediaQuery} from "@mui/material";
import {Link} from "react-router-dom";
import Image from './Image/Image';
import ContentMobile from './ContentMobile';
import s from './Content.module.css';

const Content = ({img1, img2, alt, title, text, path, direction}) => {
    const isMobileScreen = useMediaQuery('(max-width: 899px)');
    if (isMobileScreen) {
        return <ContentMobile img1={img1}
                              img2={img2}
                              alt={alt}
                              title={title}
                              text={text}
                              path={path}
        />
    }

    return <Grid container direction={direction} sx={{
        paddingTop: '34px'
    }}>
        <Grid item md={6}>
            <Stack direction='row' justifyContent='center' alignItems='center'>
                <Image img={img1}
                       alt={alt}
                       height={direction === 'row' ? 350 : 400}
                       width={275}
                />
                <Image img={img2}
                       alt={alt}
                       height={direction === 'row' ? 400 : 350}
                       width={275}
                />
            </Stack>
        </Grid>
        <Grid item md={6}>
            <Stack sx={{
                height: '100%',
                justifyContent: 'center',
                padding: '0 8px'
            }}>
                <Typography variant='h4'
                            component='h2'
                            alignSelf={direction === 'row' ? 'start' : 'end'}
                >
                    {title}
                </Typography>
                <Typography sx={{
                    margin: '16px 0'
                }}>{text}</Typography>
                <Button variant='outlined' sx={{
                    alignSelf: 'center',
                    padding: '0'
                }}>
                    <Link to={path} className={s.link}>
                        Перейти
                    </Link>
                </Button>
            </Stack>
        </Grid>
    </Grid>
}

export default Content;