import {Stack, Typography, Box, Link} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InstagramIcon from "@mui/icons-material/Instagram";
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
            <Typography>+380 67 384 31 81</Typography>
        </Stack>
        <Stack direction='row'>
            <InstagramIcon sx={{
                marginRight: '5px'
            }}/>
            <Link href='https://www.instagram.com/sklomontazh.kiev/' color='secondary'>Наш інстаграм</Link>
        </Stack>
    </Box>
}

export default Contacts;