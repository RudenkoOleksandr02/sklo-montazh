import React, {useState} from 'react';
import {
    Box,
    IconButton, Typography, Breadcrumbs
} from '@mui/material'
import Modal from "./Modal/Modal";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Purchases from "./Purchases/Purchases";
import {Link} from "react-router-dom";
import s from "../common/Link/Link.module.css";
import TableFurnitureWithButtons from "./TableFurnitureWithButtons/TableFurnitureWithButtons";
import styles from './furniture.module.css'
import {connect} from "react-redux";

const Furniture = ({totalAmount}) => {
    const [modalData, setModalData] = useState({
        open: false,
        name: '',
        images: [],
        description: ''
    });
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleOpenModal = (open, name, images, description) => {
        setModalData({
            open,
            name,
            images,
            description
        })
    }

    return <Box sx={{
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
            }}>Фурнітура</Typography>
        </Breadcrumbs>
        <Typography variant='h5' component='h2' sx={{
            textAlign: 'center',
            margin: '16px 0'
        }}>Фурнітура</Typography>
        <Modal open={modalData.open}
               setModalData={setModalData}
               name={modalData.name}
               description={modalData.description}
               images={modalData.images}
        />
        <TableFurnitureWithButtons
            handleOpenModal={handleOpenModal}
        />
        <IconButton className={totalAmount !== 0 && styles.blink_animation} onClick={() => setOpenDrawer(true)} sx={{
            position: 'sticky',
            bottom: '10%',
        }}>
            <ShoppingCartIcon sx={{
                fontSize: '45px',
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
    </Box>
};

const mapStateToProps = (state) => {
    return {
        totalAmount: state.basket.totalAmount
    }
}

export default connect(mapStateToProps)(Furniture);
