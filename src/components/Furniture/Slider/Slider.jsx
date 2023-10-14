import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, IconButton, Skeleton } from "@mui/material";

const Slider = ({ images, width, height, handleOpenModal }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [preloadedImages, setPreloadedImages] = useState([]);

    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = images.map((imageUrl) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = imageUrl;
                    img.onload = () => resolve(imageUrl);
                    img.onerror = () => reject(imageUrl);
                });
            });

            try {
                await Promise.all(imagePromises);
                setPreloadedImages(images);
                setLoading(false);
            } catch (error) {
                console.error("Error preloading images:", error);
            }
        };

        preloadImages();
    }, [images]);

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
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {images.length > 1 && <IconButton onClick={prevImage}>
                <ArrowBackIcon />
            </IconButton>}
            <Box onClick={handleOpenModal} sx={{
                cursor: 'pointer',
            }}>
                {loading && <Skeleton width={width}
                                      height={height}
                                      variant='rectangular'
                                      animation='wave' />
                }
                <img src={preloadedImages[currentImage]}
                     alt='Фурнитура'
                     style={{
                         display: loading ? 'none' : 'block',
                         maxWidth: width === 300 ? '100%' : 'auto',
                         width: width + 'px',
                         objectFit: 'contain',
                     }}
                />
            </Box>
            {images.length > 1 && <IconButton onClick={nextImage}>
                <ArrowForwardIcon />
            </IconButton>}
        </Box>
    );
};

export default Slider;
