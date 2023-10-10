import React, {useState} from 'react';
import {Box, Dialog, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import Slider from "../Slider/Slider";

const Modal = ({images, description, name, open, setModalData}) => {
    return (
        <Dialog open={open}
               onClose={() => setModalData({
                   open: false,
                   name,
                   images,
                   description
               })}
        >
            <DialogTitle sx={{
                textAlign: 'center'
            }}>{name}</DialogTitle>
            <DialogContent>
                <Box sx={{
                    margin: '0 auto',
                    width: 'min-content'
                }}>
                    <Slider images={images} width={300} height={300}/>
                </Box>
                <DialogContentText sx={{
                    color: 'black'
                }}>
                    <Typography variant='h6' component='h2' sx={{
                        textAlign: 'center',
                        margin: '16px 0'
                    }}>Опис</Typography>
                    {description ? description : ''}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
