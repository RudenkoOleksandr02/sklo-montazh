import React, {FC, useEffect, useRef, useState} from 'react';
import cl from './SwiperReviews.module.css';
import {IReview} from "../../../types";
import {ReactComponent as Star} from '../../../assets/images/Star.svg';
import {ReactComponent as ShowMore} from '../../../assets/images/showMore.svg';
import {CSSTransition} from 'react-transition-group';
import {calculateHeight} from "../../../utils/calculateHeight";

const ReviewCard: FC<IReview> = ({user, text}) => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const contentRef = useRef<HTMLParagraphElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        if (Number(contentRef.current?.scrollHeight) > 206) {
            setIsVisible(true);
        }
    }, [contentRef.current?.scrollHeight]);

    return (
        <div className={`${cl.reviewCard} ${showMore ? cl.showMoreReviewCard : ''}`}>
            <h4>{user}</h4>
            <div className={cl.stars}><Star/><Star/><Star/><Star/><Star/></div>
            <CSSTransition
                in={showMore}
                timeout={500}
                nodeRef={contentRef}
                classNames={{
                    enterActive: cl.dropdownAnimationEnterActive,
                    exitActive: cl.dropdownAnimationExitActive,
                }}
                onEnter={() => {
                    if (contentRef.current) {
                        contentRef.current.style.height = '206px';
                    }
                }}
                onEntering={() => {
                    if (contentRef.current) {
                        contentRef.current.style.height = `${calculateHeight(contentRef)}px`;
                    }
                }}
                onExit={() => {
                    if (contentRef.current) {
                        contentRef.current.style.height = `${calculateHeight(contentRef)}px`;
                    }
                }}
                onExiting={() => {
                    if (contentRef.current) {
                        contentRef.current.style.height = '206px';
                    }
                }}
            >
                <p className={`${showMore ? cl.showMoreText : ''}`} ref={contentRef}>{text}</p>
            </CSSTransition>
            {isVisible && (
                <div className={cl.showMore} onClick={() => setShowMore(!showMore)}>
                    <ShowMore/>
                </div>
            )}
        </div>
    );
};

export default ReviewCard;