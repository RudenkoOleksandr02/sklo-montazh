import React, {FC} from 'react';
import {Swiper} from "swiper/swiper-react";
import {IReview} from "../../../types";

interface ReviewProps {
    reviews: IReview[]
}

const Reviews: FC<ReviewProps> = ({reviews}) => {
    return (
        <div>
            <h2>Відгуки</h2>
            <Swiper>
                
            </Swiper>
        </div>
    );
};

export default Reviews;