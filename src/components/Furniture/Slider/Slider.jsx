import React, {useState} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import {Box, IconButton, Skeleton} from "@mui/material";

const Slider = ({images, width, height, handleOpenModal}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [loading, setLoading] = useState(true)

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

    const handleImageLoad = () => {
        setLoading(false)
    }

    return (
        <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: width + 100 + 'px'
        }}>
            <IconButton onClick={prevImage}>
                <ArrowBackIcon/>
            </IconButton>
            <Box onClick={handleOpenModal} sx={{
                cursor: 'pointer',
            }}>
                {loading && <Skeleton width={width}
                                      height={height}
                                      variant='rectangular'
                                      animation='wave'/>
                }
                <img src={images[currentImage]}
                     alt='Фурнітура'
                     style={{
                         display: loading ? 'none' : 'block',
                         maxWidth: '100%',
                         objectFit: 'contain',
                     }}
                     onLoad={handleImageLoad}
                />
            </Box>
            <IconButton onClick={nextImage}>
                <ArrowForwardIcon/>
            </IconButton>
        </Box>
    );
};

export default Slider;
