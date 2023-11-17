import {Grid, Stack, Skeleton, useMediaQuery} from "@mui/material"
import {useState} from 'react'
import s from './Image.module.css'
import ImageModal from "../../common/ImageModal/ImageModal"
import {BaseURL} from "../../common/BaseURL/BaseURL";

const Image = ({image, title}) => {
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const isMdScreen = useMediaQuery('(min-width: 601px) and (max-width: 899px)')
    const isMobileScreen = useMediaQuery('(max-width: 600px)')
    let width = 300;
    let height = 350;

    if (isMdScreen) {
        width = 250
        height = 350
    } else if (isMobileScreen) {
        width = 150
        height = 200
    }
    const handleImageLoad = () => {
        setLoading(false)
    }
    const handleImageClick = () => {
        setModalOpen(true)
    };
    const handleCloseModal = () => {
        setModalOpen(false)
    };

    return <Grid item md={4} xs={6}>
        <Stack alignItems='center'>
            {loading && <Skeleton width={width}
                                  height={height}
                                  variant='rectangular'
                                  animation='wave'/>}
            <img src={BaseURL + '/assets/' + image}
                 alt={title}
                 width={width}
                 height={height}
                 style={{ display: loading ? 'none' : 'block' }}
                 onLoad={handleImageLoad}
                 onClick={handleImageClick}
                 className={s.zoom}
            />
            <ImageModal
                isOpen={modalOpen}
                imageUrl={BaseURL + '/assets/' + image}
                onClose={handleCloseModal}
            />
        </Stack>
    </Grid>


}

export default Image