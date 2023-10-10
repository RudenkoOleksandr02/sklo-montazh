import React, {useEffect, useState} from 'react';
import {
    Button,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Table,
    Box, CircularProgress
} from "@mui/material";
import Slider from "../../Slider/Slider";
import Quantity from "../../newQuantity/Quantity";
import {connect} from "react-redux";

const TableFurniture = ({isLoading, furniture, handleOpenModal, basket, addProductToBasket, decreaseProductQuantity, category}) => {
    return <Box>
        {isLoading ? <CircularProgress sx={{
            display: 'block',
            margin: '16px auto'
        }}/> : <TableContainer component={Paper}>
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
                    {furniture && furniture.length > 0 ? furniture.map(row => {
                        return <TableRow key={row.id}>
                            <TableCell align='center'>
                                <Slider images={row.images}
                                        width={100}
                                        handleOpenModal={() => handleOpenModal(true, row.name, row.images, row.description)}
                                />
                            </TableCell>
                            <TableCell align='center'>
                                <Button sx={{
                                    color: '#1565C0'
                                }}
                                        onClick={() => handleOpenModal(true, row.name, row.images, row.description)}
                                >
                                    {row.name}
                                </Button>
                            </TableCell>
                            <TableCell align='center'>{row.article}</TableCell>
                            <TableCell align='center'>{row.price}</TableCell>
                            <TableCell align='center' sx={{
                                minWidth: '120px'
                            }}>
                                {row.inStock ? <Quantity basket={basket}
                                                         name={row.name}
                                                         price={row.price}
                                                         id={row.id}
                                                         addProductToBasket={addProductToBasket}
                                                         decreaseProductQuantity={decreaseProductQuantity}
                                                         category={category}
                                /> : 'Немає в наявності'
                                }
                            </TableCell>
                        </TableRow>
                    }) : <TableRow>
                        <TableCell align='center' style={{ width: '100%' }} >
                            Немає в наявності
                        </TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
        }
    </Box>
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.furniture.isLoading
    }
}
export default connect(mapStateToProps)(TableFurniture);
