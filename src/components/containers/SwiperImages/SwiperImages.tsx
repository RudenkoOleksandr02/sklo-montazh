import React, {FC, useRef, useState} from 'react';
import cl from './SwiperImages.module.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {IImage} from "../../../types";
import {ReactComponent as Arrow} from "./../../../assets/images/arrowBottom2.svg";
import ModalImageWithSwiper from "../ModalImageWithSwiper/ModalImageWithSwiper";
import Skeleton from "../../ui/Skeleton/Skeleton";
import ImageZoomOnHover from "../ImageZoomOnHover/ImageZoomOnHover";

interface SwiperImagesProps {
    images: IImage[] | null;
}

const SwiperImages: FC<SwiperImagesProps> = ({images}) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <>
            <div className={cl.wrapper}>
                <div className={cl.wrapperForSwiper1}>
                    <button ref={prevRef} className={cl.prevBtn}>
                        <Arrow className={`${cl.rowIcon}`}/>
                    </button>
                    <Swiper
                        className={cl.swiper1}
                        spaceBetween={10}
                        thumbs={{swiper: thumbsSwiper}}
                        modules={[FreeMode, Navigation, Thumbs]}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                    >
                        {images && images.map((data, index) => (
                            <SwiperSlide key={data.id}>
                                <div className={cl.imageZoomOnHoverContainer}>
                                    <ImageZoomOnHover
                                        image={data.url}
                                        alt={data.alternativeText || 'image for slide ' + data.id}
                                        classNameSkeleton={cl.skeleton}
                                        classNameImage={cl.image}
                                    />
                                </div>
                                <div className={cl.skeletonContainer}>
                                    <Skeleton
                                        src={data.url}
                                        alt={data.alternativeText || 'image for slide ' + data.id}
                                        classNameSkeleton={cl.skeleton}
                                        classNameImage={cl.image}
                                        onClick={() => handleImageClick(index)}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <button ref={nextRef} className={cl.nextBtn}>
                        <Arrow className={`${cl.rowIcon}`}/>
                    </button>
                </div>
                <Swiper
                    className={cl.swiper2}
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                >
                    {images && images.map(data => (
                        <SwiperSlide key={data.id}>
                            <Skeleton
                                src={data.url}
                                alt={data.alternativeText || 'image for slide ' + data.id}
                                classNameSkeleton={cl.skeleton}
                                classNameImage={cl.image}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {selectedImageIndex !== null && (
                <ModalImageWithSwiper
                    onClose={() => setSelectedImageIndex(null)}
                    selectedImageIndex={selectedImageIndex}
                    images={images?.map((item) => item.url) || []}
                />
            )}
        </>
    );
};

export default SwiperImages;