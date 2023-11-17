import {Box, Toolbar, AppBar, useMediaQuery, Drawer, IconButton} from "@mui/material";
import React, {useState} from 'react';
import Navigation from "./Navigation/Navigation";
import logo from "../../images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../Furniture/furniture.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Purchases from "../Furniture/Purchases/Purchases";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const Navbar = ({totalAmount}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);
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
                    <Link to={'/home'}>
                        <img src={logo} alt='logo' width='150px' height='auto'/>
                    </Link>
                </Box>
                <IconButton
                    className={totalAmount !== 0 ? styles.blink_animation : ''}
                    onClick={() => setOpenDrawer(true)}
                >
                    <ShoppingCartIcon sx={{
                        fontSize: '25px',
                        padding: '3px',
                        color: totalAmount === 0 ? 'rgba(0, 0, 0, 0.5)' : '#1565C0',
                        border: totalAmount === 0 ? '2px inset rgba(0, 0, 0, 0.5)' : '2px inset #1565C0',
                        transition: '0.5s',
                        borderRadius: '50%'
                    }}/>
                </IconButton>
                <Purchases openDrawer={openDrawer}
                           setOpenDrawer={setOpenDrawer}
                />
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
                <Link to={'/home'}>
                    <img src={logo} alt='logo' width='200px' height='auto'/>
                </Link>
            </Box>
            <Navigation open={open}
                        anchorEl={anchorEl}
                        handleClick={handleClick}
                        handleClose={handleClose}
                        direction='row'
            />
            <IconButton
                className={totalAmount !== 0 ? styles.blink_animation : ''}
                onClick={() => setOpenDrawer(true)}
            >
                <ShoppingCartIcon sx={{
                    fontSize: '25px',
                    padding: '3px',
                    color: totalAmount === 0 ? 'rgba(0, 0, 0, 0.5)' : '#1565C0',
                    border: totalAmount === 0 ? '2px inset rgba(0, 0, 0, 0.5)' : '2px inset #1565C0',
                    transition: '0.5s',
                    borderRadius: '50%'
                }}/>
            </IconButton>
            <Purchases openDrawer={openDrawer}
                       setOpenDrawer={setOpenDrawer}
            />
        </Toolbar>
    </AppBar>

}

const mapStateToProps = (state) => {
    return {
        totalAmount: state.basket.totalAmount
    }
}
export default connect(mapStateToProps)(Navbar);