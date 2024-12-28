import React, {FC, useState} from 'react';
import cl from './TemplatePage.module.css';
import PrimaryButton from "../../../components/ui/buttons/PrimaryButton/PrimaryButton";
import {ReactComponent as Quadrants} from '../../../assets/images/quadrants.svg';
import FeedbackPopup from "../../../components/containers/FeedbackPopup/FeedbackPopup";

interface MainSectionProps {
    title: string;
    text: string;
}

const MainSection: FC<MainSectionProps> = ({title, text}) => {
    const [active, setActive] = useState<boolean>(false);

    return (
        <div className={cl.mainSection}>
            <main>
                <div className={cl.top_main}>
                    <h1>{title}</h1>
                    <Quadrants/>
                </div>
                <div className={cl.bottom_main}>
                    <p>{text}</p>
                    <PrimaryButton
                        height='auto'
                        width='auto'
                        minWidth='229px'
                        padding='20px 30px'
                        onClick={() => setActive(true)}
                    >
                        Зворотній зв'язок
                    </PrimaryButton>
                </div>
            </main>
            <FeedbackPopup active={active} setActive={setActive}/>
        </div>
    );
};

export default MainSection;