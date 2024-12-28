import React, {FC, useRef, useState} from 'react';
import cl from './SEO.module.css';
import {ReactComponent as ShowMore} from "../../../assets/images/showMoreForSeo.svg";
import {CSSTransition} from "react-transition-group";
import {calculateHeight} from "../../../utils/calculateHeight";

interface SEOProps {
    text: string;
}

const Seo: FC<SEOProps> = ({text}) => {
    const [isShowMore, setShowMore] = useState<boolean>(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    return (
        <div className={cl.wrapper}>
            <div className={cl.content}>
                <h2>SEO</h2>
                <CSSTransition
                    in={isShowMore}
                    nodeRef={textRef}
                    timeout={500}
                    classNames={{
                        enterActive: cl.dropdownAnimationEnterActive,
                        exitActive: cl.dropdownAnimationExitActive,
                    }}
                    onEnter={() => {
                        if (textRef.current) {
                            textRef.current.style.height = '57px';
                        }
                    }}
                    onEntering={() => {
                        if (textRef.current) {
                            textRef.current.style.height = `${calculateHeight(textRef)}px`;
                        }
                    }}
                    onExit={() => {
                        if (textRef.current) {
                            textRef.current.style.height = `${calculateHeight(textRef)}px`;
                        }
                    }}
                    onExiting={() => {
                        if (textRef.current) {
                            textRef.current.style.height = '57px';
                        }
                    }}
                >
                    <p ref={textRef} className={`${isShowMore ? cl.showMoreText : ''}`}>{text}</p>
                </CSSTransition>
            </div>
            <div className={cl.showMore} onClick={() => setShowMore(state => !state)}>
                <ShowMore/>
            </div>
        </div>
    );
};

export default Seo;