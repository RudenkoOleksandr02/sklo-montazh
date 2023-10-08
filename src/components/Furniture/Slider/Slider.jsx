import React, {useState} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import {Box, IconButton} from "@mui/material";

const Slider = ({images, width, handleOpenModal}) => {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        if (currentImage < images.length - 1) {
            setCurrentImage(currentImage + 1);
        } else {
            setCurrentImage(0);
        }
    }

    const prevImage = () => {
        if (currentImage > 0) {
            setCurrentImage(currentImage - 1);
        } else {
            setCurrentImage(images.length - 1);
        }
    }

    return (
        <Box sx={{
            display: 'inline-flex',
            alignItems: 'center'
        }}>
            <IconButton onClick={prevImage}>
                <ArrowBackIcon/>
            </IconButton>
            <Box onClick={handleOpenModal} sx={{
                cursor: 'pointer'
            }}>

                <img src={images[currentImage]} alt='Фурнітура' width={width}/>
            </Box>
            <IconButton onClick={nextImage}>
                <ArrowForwardIcon/>
            </IconButton>
        </Box>
    );
};

export default Slider;
