import {Stack, Typography, Box, Link} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from '@mui/icons-material/Mail';
import s from '../../common/Link/Link.module.css';

const Contacts = () => {
    return <Box>
        <Typography sx={{
            fontWeight: 'bold'
        }}>Контакти</Typography>
        <Stack direction='row' sx={{
            margin: '5px 0'
        }}>
            <LocalPhoneIcon sx={{
                marginRight: '5px'
            }}/>
            <Typography>
                <a href="tel:+380673843181" style={{
                    color: '#3f51b5'
                }}>+380 67 384 31 81</a>
            </Typography>
        </Stack>
        <Stack direction='row'>
            <InstagramIcon sx={{
                marginRight: '5px'
            }}/>
            <Link href='https://www.instagram.com/sklomontazh.kiev/' color='secondary'>Наш інстаграм</Link>
        </Stack>
        <Stack direction='row' sx={{
            margin: '5px 0'
        }}>
            <MailIcon sx={{
                marginRight: '5px'
            }}/>
            <Typography>sklomontag@gmail.com</Typography>
        </Stack>
        <Box sx={{
            margin: '5px 0'
        }}>
            <Typography>Офіс: м.Київ вул.Івана Франка 3</Typography>
            <Typography>Склад: м.Київ вул.Бориспільська 9</Typography>
        </Box>
    </Box>
}

export default Contacts;