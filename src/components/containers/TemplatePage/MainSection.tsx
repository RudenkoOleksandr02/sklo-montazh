import React, {FC, useState} from 'react';
import cl from '../Blogs.module.css';
import PrimaryButton from "../../../components/ui/buttons/PrimaryButton/PrimaryButton";
import {ReactComponent as Quadrants} from '../../../assets/images/quadrants.svg';
import FeedbackPopup from "../../../components/containers/FeedbackPopup/FeedbackPopup";

const MainSection: FC = () => {
    const [active, setActive] = useState<boolean>(false);

    return (
        <div className={cl.mainSection}>
            <main>
                <div className={cl.top_main}>
                    <h1>Блог</h1>
                    <Quadrants/>
                </div>
                <div className={cl.bottom_main}>
                    <p>
                        Ласкаво просимо до нашого блогу! Тут ви знайдете корисну інформацію та натхнення для створення
                        стильного і функціонального інтер’єру з використанням скляних елементів. Ми пропонуємо ідеї та
                        поради, які допоможуть вам зробити правильний вибір і створити простір вашої мрії.
                    </p>
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