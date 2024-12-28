import React, {FC, useRef, useState} from 'react';
import {IQuestionAndAnswer} from "../../../types";
import cl from './QuestionsAndAnswers.module.css';
import {ReactComponent as ArrowBottom} from "../../../assets/images/arrowBottom.svg";
import {CSSTransition} from "react-transition-group";
import {calculateHeight} from "../../../utils/calculateHeight";

const Item: FC<IQuestionAndAnswer> = ({question, answer}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const answerRef = useRef<HTMLParagraphElement>(null);

    return (
        <div className={cl.item} onClick={() => setIsOpen(state => !state)}>
            <div className={cl.question}>
                <h4>{question}</h4>
                <div className={`${cl.arrow} ${isOpen ? cl.rotated : ''}`}>
                    <ArrowBottom/>
                </div>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={500}
                nodeRef={answerRef}
                unmountOnExit
                classNames={{
                    enterActive: cl.dropdownAnimationEnterActive,
                    exitActive: cl.dropdownAnimationExitActive,
                }}
                onEnter={() => {
                    if (answerRef.current) {
                        answerRef.current.style.height = '0';
                        answerRef.current.style.marginBottom = '0';
                    }
                }}
                onEntering={() => {
                    if (answerRef.current) {
                        answerRef.current.style.height = `${calculateHeight(answerRef)}px`;
                        answerRef.current.style.marginBottom = '8px';
                    }
                }}
                onExit={() => {
                    if (answerRef.current) {
                        answerRef.current.style.height = `${calculateHeight(answerRef)}px`;
                        answerRef.current.style.marginBottom = '8px';
                    }
                }}
                onExiting={() => {
                    if (answerRef.current) {
                        answerRef.current.style.height = '0';
                        answerRef.current.style.marginBottom = '0'
                    }
                }}
            >
                <p className={cl.answer} ref={answerRef}>{answer}</p>
            </CSSTransition>
        </div>
    );
};

export default Item;