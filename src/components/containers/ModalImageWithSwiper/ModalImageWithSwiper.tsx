import React, {FC, useEffect, useRef, useState} from 'react';
import cl from './ModalImageWithSwiper.module.css';
import Preloader from "../../ui/Preloader/Preloader";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import {ReactComponent as Arrow} from '../../../assets/images/arrowBottom2.svg'

interface ModalImageProps {
    onClose: () => void;
    images: string[];
    selectedImageIndex: number;
}

const ModalImageWithSwiper: FC<ModalImageProps> = ({onClose, images, selectedImageIndex}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [currentIndex, setCurrentIndex] = useState<number>(selectedImageIndex);

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isSwiperReady, setIsSwiperReady] = useState<boolean>(false);

    useEffect(() => {
        const img = new Image();
        img.src = images[currentIndex];
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
    }, [currentIndex, images]);

    return (
        <div className={cl.modalBackdrop} onClick={onClose}>
            <div className={cl.closeBtn}>
                <span/>
                <span/>
            </div>
            <div className={cl.modalContent} onClick={(e) => e.stopPropagation()}>
                {loading
                    ? <Preloader/>
                    : (
                        <div className={cl.swiper}>
                            <button ref={prevRef} className={cl.prevBtn}>
                                <Arrow className={`${cl.rowIcon}`} />
                            </button>
                            <Swiper
                                initialSlide={selectedImageIndex}
                                onSlideChange={(swiper: any) => setCurrentIndex(swiper.activeIndex)}
                                slidesPerView={1}
                                navigation={{
                                    prevEl: prevRef.current,
                                    nextEl: nextRef.current,
                                }}
                                modules={[Navigation]}
                                onSwiper={() => setIsSwiperReady(true)}
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={image}
                                            alt={`Slide ${index}`}
                                            className={cl.selectedImage}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <button ref={nextRef} className={cl.nextBtn}>
                                <Arrow className={`${cl.rowIcon}`} />
                            </button>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default ModalImageWithSwiper;