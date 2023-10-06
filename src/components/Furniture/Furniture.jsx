import React, {useEffect, useState} from 'react';
import {
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper,
    Button,
    Box,
    IconButton, Typography, Breadcrumbs
} from '@mui/material'
import {connect} from "react-redux";
import {getFurniture} from "../../store/furniture-reducer";
import Slider from "./Slider/Slider";
import Modal from "./Modal/Modal";
import Quantity from "./Quantity/Quantity";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Purchases from "./Purchases/Purchases";
import {Link} from "react-router-dom";
import s from "../common/Link/Link.module.css";


const Furniture = ({furniture, getFurniture}) => {
    const [modalData, setModalData] = useState({
        open: false,
        name: '',
        images: [],
        description: ''
    });
    const [openDrawer, setOpenDrawer] = useState(false);
    const [inBasket, setInBasket] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        getFurniture();
    }, []);

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
        <TableContainer component={Paper}>
            <Table aria-label='furniture table' text-align='center'>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Зображення</TableCell>
                        <TableCell align='center'>Назва</TableCell>
                        <TableCell align='center'>Артикул</TableCell>
                        <TableCell align='center'>Ціна</TableCell>
                        <TableCell align='center'>Кількість</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {furniture.map(row => {
                        return <TableRow key={row.id}>
                            <TableCell align='center'>
                                <Slider images={row.Image}
                                        width={100}
                                        handleOpenModal={() => handleOpenModal(true, row.Name, row.Image, row.description)}
                                />
                            </TableCell>
                            <TableCell align='center'>
                                <Button sx={{
                                    color: '#1565C0'
                                }}
                                    onClick={() => handleOpenModal(true, row.Name, row.Image, row.description)}
                                >
                                    {row.Name}
                                </Button>
                            </TableCell>
                            <TableCell align='center'>{row.article}</TableCell>
                            <TableCell align='center'>{row.price}</TableCell>
                            <TableCell align='center'>
                                {row.inStock ? <Quantity setInBasket={setInBasket}
                                                         name={row.Name}
                                                         inBasket={inBasket}
                                                         price={row.price}
                                                         setTotalPrice={setTotalPrice}
                                                         totalPrice={totalPrice} id={row.id}
                                /> : 'Немає в наявності'
                                }
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
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
                   inBasket={inBasket}
                   totalPrice={totalPrice}
                   setInBasket={setInBasket}
        />
    </Box>
};

const mapStateToProps = (state) => {
    return {
        furniture: state.furniture.furniture
    }
}
export default connect(mapStateToProps, {getFurniture})(Furniture);
