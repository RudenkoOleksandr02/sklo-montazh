import {Box, Skeleton} from "@mui/material";
import s from './ItemsImage.module.css'
import {useState} from "react";

const ItemsImage = ({images, setCounter, counter}) => {
    const [loading, setLoading] = useState(true)
    const handleClick = (index) => {
        setCounter(index)
    }
    const handleImageLoad = () => {
        setLoading(false)
    }

    return <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        margin: '20px 0',
        overflowX: 'auto'
    }}>
        {images && images.map((img, index) => {
            return <Box
                key={index}
                sx={{
                    margin: '0 5px',
                    cursor: 'pointer',
                }}>
                {loading && <Skeleton width={100}
                                      height={150}
                                      variant='rectangular'
                                      animation='wave'
                />}
                <img src={img}
                     width='100' alt='other image'
                     onClick={() => handleClick(index)}
                     className={index === counter ? s.selected : ''}
                     onLoad={handleImageLoad}
                     style={{display: loading ? 'none' : 'block'}}
                />
            </Box>
        })}
    </Box>
}

export default ItemsImage