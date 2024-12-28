import React, {useState, useEffect, FC} from 'react';
import classes from './Skeleton.module.css';

interface SkeletonProps {
    src: string;
    alt: string;
    classNameSkeleton: any;
    classNameImage: any;
    onClick?: () => void;
}

const Skeleton: FC<SkeletonProps> = ({ src, alt, classNameSkeleton, classNameImage, onClick = () => {}}) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setLoading(false);
        };
        img.onerror = () => {
            setLoading(false);
        };

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src]);

    if (loading) {
        return <div className={classes.skeleton + ' ' + classNameSkeleton}/>
    }

    return <img src={src} alt={alt} className={classNameImage} onClick={onClick}/>

};

export default Skeleton;