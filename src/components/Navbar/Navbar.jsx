import {Box, Toolbar, AppBar, useMediaQuery, Drawer, IconButton} from "@mui/material";
import {useState} from 'react';
import Navigation from "./Navigation/Navigation";
import logo from "../../images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const isMobileScreen = useMediaQuery('(max-width: 937px)');
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
        setIsOpenDrawer(false);
    }

    if (isMobileScreen) {
        return <AppBar position='static' sx={{
            background: 'transparent'
        }}>
            <Toolbar>
                <Box sx={{
                    flexGrow: 1
                }}>
                    <img src={logo} alt='logo' width='150px' height='auto'/>
                </Box>
                <IconButton onClick={() => setIsOpenDrawer(true)} aria-label='open menu'>
                    <MenuIcon/>
                </IconButton>
                <Drawer anchor='right' open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
                    <Navigation open={open}
                                anchorEl={anchorEl}
                                handleClick={handleClick}
                                handleClose={handleClose}
                                direction='column'
                                setIsOpenDrawer={setIsOpenDrawer}
                    />
                </Drawer>
            </Toolbar>
        </AppBar>
    }

    return <AppBar position='static' sx={{
        background: 'transparent'
    }}>
        <Toolbar>
            <Box sx={{
                flexGrow: 1
            }}>
                <img src={logo} alt='logo' width='200px' height='auto'/>
            </Box>
            <Navigation open={open}
                        anchorEl={anchorEl}
                        handleClick={handleClick}
                        handleClose={handleClose}
                        direction='row'
            />
        </Toolbar>
    </AppBar>

}
export default Navbar;