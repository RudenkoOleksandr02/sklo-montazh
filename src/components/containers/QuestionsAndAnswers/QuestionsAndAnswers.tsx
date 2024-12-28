import React, {FC} from 'react';
import cl from './QuestionsAndAnswers.module.css';
import {ReactComponent as Quadrants} from "../../../assets/images/quadrants.svg";
import Item from "./Item";
import {useFetchQuestionQuery} from "../../../services/QuestionService";
import Preloader from "../../ui/Preloader/Preloader";

const QuestionsAndAnswers: FC = () => {
    const {data: questionsAndAnswers, isLoading} = useFetchQuestionQuery('');

    return (
        <div className={cl.wrapper}>
            <div className={cl.titleWithSVG}>
                <h2>Запитання та відповіді</h2>
                <Quadrants/>
            </div>
            <div className={cl.questionsAndAnswers}>
                {isLoading ? <div><Preloader/></div> : (
                    questionsAndAnswers?.map(item => (
                        <Item key={item.id} id={item.id} question={item.question} answer={item.answer}/>
                    ))
                )}
            </div>
        </div>
    );
};

export default QuestionsAndAnswers;