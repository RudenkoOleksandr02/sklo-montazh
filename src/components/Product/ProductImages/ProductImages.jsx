import {useEffect, useState} from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import {IconButton, Box, useMediaQuery, Skeleton} from "@mui/material";
import ItemsImage from "./ItemsImage/ItemsImage";
import ImageModal from "../../common/ImageModal/ImageModal";
import s from './ProductImages.module.css';
import {BaseURL} from "../../common/BaseURL/BaseURL";

const ProductImages = ({mainImage, otherImage}) => {
    const [selectedImage, setSelectedImage] = useState(mainImage);
    const [counter, setCounter] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const allImages = [].concat(mainImage, otherImage);
    const isMobileScreen = useMediaQuery('(max-width: 599px)');

    useEffect(() => {
        setSelectedImage(mainImage);
    }, [mainImage]);
    useEffect(() => {
        setSelectedImage(allImages[counter]);
    }, [counter]);

    const handleNextImage = () => {
        if (counter !== allImages.length - 1) {
            setCounter(counter + 1);
        } else {
            setCounter(0);
        }
    }
    const handlePrevImage = () => {
        if (counter === 0) {
            setCounter(allImages.length - 1);
        } else {
            setCounter(counter - 1);
        }
    }
    const handleImageClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleImageLoad = () => {
        setLoading(false);
    }

    return <Box>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <IconButton onClick={handlePrevImage}>
                <ArrowBackIcon/>
            </IconButton>
            {loading && <Skeleton width={isMobileScreen ? 200 : 300}
                                  height={350}
                                  className={s.image}
                                  variant='rectangular'
                                  animation='wave'
            />}
            <img src={selectedImage}
                 alt="product"
                 onClick={handleImageClick}
                 className={s.mainImage}
                 height={isMobileScreen ? 280 : 350}
                 width={isMobileScreen ? 200 : 300}
                 style={{display: loading ? 'none' : 'block'}}
                 onLoad={handleImageLoad}
            />
            <IconButton onClick={handleNextImage}>
                <ArrowForwardIcon/>
            </IconButton>
        </Box>
        <Box>
            <ItemsImage images={allImages} setCounter={setCounter} counter={counter}/>
            <ImageModal
                isOpen={modalOpen}
                imageUrl={selectedImage}
                onClose={handleCloseModal}
            />
        </Box>
    </Box>
}

export default ProductImages;