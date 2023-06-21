import {Grid} from "@mui/material";
import logo from '../../images/logo.png'
import {useMediaQuery} from "@mui/material";
import FooterMobile from "./FooterMobile";
import Description from "./Description/Description";
import Info from "./Info/Info";
import Products from "./Products/Products";
import Contacts from "./Contacts/Contacts";

const Footer = () => {
    const isMobileScreen = useMediaQuery('(max-width: 900px)')

    if (isMobileScreen) {
        return <FooterMobile/>
    }

    return <Grid container sx={{
        borderTop: '2px solid #2196f3',
        padding: '24px 24px',
    }}>
        <Grid item md={3} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Description logo={logo}/>
        </Grid>
        <Grid item md={3} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Info/>
        </Grid>
        <Grid item md={3} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Products/>
        </Grid>
        <Grid item md={3} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Contacts/>
        </Grid>
    </Grid>
}

export default Footer;