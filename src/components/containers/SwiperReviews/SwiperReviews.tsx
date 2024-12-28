import React, {FC} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, FreeMode} from 'swiper/modules';
import ReviewCard from './ReviewCard';
import cl from './SwiperReviews.module.css';
import {useFetchReviewsQuery} from "../../../services/ReviewService";
import Preloader from "../../ui/Preloader/Preloader";

const SwiperReviews: FC = () => {
    const swiperParams = {
        modules: [Pagination, FreeMode],
        spaceBetween: 20,
        speed: 800,
        pagination: {clickable: true},
        freeMode: true,
        slidesPerView: 'auto',
        breakpoints: {
            0: {
                pagination: {
                    dynamicBullets: true
                },
            },
            1000: {
                pagination: {
                    dynamicBullets: false
                },
                slidesPerGroup: 3,
                freeMode: false
            },
            1360: {
                pagination: {
                    dynamicBullets: false
                },
                slidesPerGroup: 4,
                freeMode: false
            }
        }
    };
    const {data: reviews, isLoading} = useFetchReviewsQuery('')

    return (
        <div className={cl.wrapper}>
            <h2>Відгуки</h2>
            <div className={cl.cardList}>
                {isLoading ? (
                    <div className={cl.preloader}>
                        <Preloader/>
                    </div>
                ) : (
                    <Swiper
                        {...swiperParams}
                    >
                        {reviews?.map(review => (
                            <SwiperSlide key={review.id}>
                                <ReviewCard id={review.id} user={review.user} text={review.text}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default SwiperReviews;