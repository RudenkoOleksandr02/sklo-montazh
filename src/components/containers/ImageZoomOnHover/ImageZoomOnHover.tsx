import React, { FC, useEffect, useRef, useState } from "react";
import cl from "./ImageZoomOnHover.module.css";

interface ImageZoomOnHoverProps {
    image: string;
    alt: string;
    classNameSkeleton: string;
    classNameImage: string;
    zoomLevel?: number;
}

const ImageZoomOnHover: FC<ImageZoomOnHoverProps> = ({
                                                         image,
                                                         zoomLevel = 2,
                                                         classNameImage,
                                                         classNameSkeleton,
                                                         alt,
                                                     }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isZoomed, setIsZoomed] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [backgroundPosition, setBackgroundPosition] = useState<string>("0% 0%");

    useEffect(() => {
        const img = new Image();
        img.src = image;
        img.onload = () => setLoading(false);
        img.onerror = () => setLoading(false);

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [image]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || !isZoomed) return;

        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setBackgroundPosition(`${x}% ${y}%`);
    };

    const handleToggleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsZoomed((prev) => !prev);
        if (containerRef.current) {
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            setBackgroundPosition(`${x}% ${y}%`);
        }
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setIsZoomed(false);
        }, 2000);
    };

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    if (loading) {
        return <div className={`${cl.skeleton} ${classNameSkeleton}`} />;
    }

    return (
        <div
            ref={containerRef}
            className={`${cl.magnifierContainer} ${isZoomed ? cl.zoomed : ""}`}
            style={
                isZoomed
                    ? {
                        backgroundImage: `url(${image})`,
                        backgroundSize: `${zoomLevel * 100}%`,
                        backgroundPosition: backgroundPosition,
                    }
                    : undefined
            }
            onClick={handleToggleZoom}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            <img src={image} alt={alt} className={classNameImage} />
        </div>
    );
};

export default ImageZoomOnHover;
