import {useMediaQuery, Skeleton} from "@mui/material";
import s from '../Content.module.css';
import {useState} from "react";

const Image = ({img, alt, height, width}) => {
    const [loading, setLoading] = useState(true);
    const isMdScreen = useMediaQuery('(max-width: 1199px) and (min-width: 900px)');
    const w = isMdScreen ? (parseInt(width) - 70) : parseInt(width);
    const h = isMdScreen ? (parseInt(height) - 75) : parseInt(height);

    const handleImageLoad = () => {
        setLoading(false);
    }

    return <>
        {loading && <Skeleton width={w}
                              height={h}
                              className={s.image}
                              variant='rectangular'
                              animation='wave'
        />}
        <img src={img} alt={alt}
             width={w}
             height={h}
             style={{display: loading ? 'none' : 'block'}}
             className={s.image}
             onLoad={handleImageLoad}
        />
    </>
}

export default Image;