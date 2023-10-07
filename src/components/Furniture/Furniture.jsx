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


const Furniture = () => {
    const [modalData, setModalData] = useState({
        open: false,
        name: '',
        images: [],
        description: ''
    });
    const [openDrawer, setOpenDrawer] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

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
            setTotalPrice={setTotalPrice}
            totalPrice={totalPrice}
        />
        <IconButton onClick={() => setOpenDrawer(true)} sx={{
            position: 'sticky',
            bottom: '50%'
        }}
        >
            <ShoppingCartIcon sx={{
                fontSize: '45px',
                padding: '3px',
                color: '#1565C0',
                border: '2px dashed green',
                borderRadius: '50%'
            }}/>
        </IconButton>
        <Purchases openDrawer={openDrawer}
                   setOpenDrawer={setOpenDrawer}
                   totalPrice={totalPrice}
                   setTotalPrice={setTotalPrice}
        />
    </Box>
};

export default Furniture;
