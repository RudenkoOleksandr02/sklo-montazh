import {Grid} from "@mui/material";
import logo from '../../images/logo.png';
import Description from "./Description/Description";
import Info from "./Info/Info";
import Products from "./Products/Products";
import Contacts from "./Contacts/Contacts";

const FooterMobile = () => {
    return <Grid container sx={{
        borderTop: '2px solid #2196f3',
        padding: '24px 24px',
    }}>
        <Grid item xs={12} sx={{
            marginBottom: '16px',
        }}>
            <Description logo={logo}/>
        </Grid>
        <Grid item xs={6}>
            <Info/>
        </Grid>
        <Grid item xs={6}>
            <Products/>
        </Grid>
        <Grid item xs={12} sx={{
            marginTop: '16px'
        }}>
            <Contacts/>
        </Grid>
    </Grid>
}

export default FooterMobile;