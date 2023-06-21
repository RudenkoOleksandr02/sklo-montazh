import {Grid, Box, Typography, Button, Stack} from "@mui/material";
import {Link} from "react-router-dom";
import Image from './Image/Image';
import s from './Content.module.css';

const ContentDesktop = ({img1, img2, alt, title, text, path}) => {
    return <Grid container
                 sx={{
                     paddingTop: '34px'
                 }}
    >
        <Grid item xs={12}>
            <Typography variant='h5'
                        component='h2'
                        textAlign='center'
            >
                {title}
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Stack direction='row' justifyContent='center' alignItems='center' sx={{
                marginTop: '16px'
            }}>
                <Image img={img1}
                       alt={alt}
                       height={200}
                       width={150}
                />
                <Image img={img2}
                       alt={alt}
                       height={200}
                       width={150}
                />
            </Stack>
        </Grid>
        <Grid item xs={12}>
            <Stack sx={{
                height: '100%',
                justifyContent: 'center'
            }}>

                <Typography sx={{
                    margin: '16px 0'
                }}>{text}</Typography>
                <Button variant='outlined' sx={{
                    alignSelf: 'center',
                    padding: '0'
                }}><Link to={path} className={s.link}>Перейти</Link></Button>
            </Stack>
        </Grid>
    </Grid>
}

export default ContentDesktop;