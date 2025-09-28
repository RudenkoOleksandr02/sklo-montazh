import React, {FC, useState} from 'react';
import cl from "../Home.module.css";
import BlockBlurredBackground from "../../../components/ui/BlockContent/BlockContent";
import PrimaryButton from "../../../components/ui/buttons/PrimaryButton/PrimaryButton";
import {ReactComponent as Quadrants} from '../../../assets/images/quadrants.svg';
import FeedbackPopup from "../../../components/containers/FeedbackPopup/FeedbackPopup";

const MainSection: FC = () => {
    const [active, setActive] = useState<boolean>(false);

    return (
        <>
            <div className={cl.headerWithMain}>
                <main className={cl.main}>
                    <BlockBlurredBackground>
                        <div className={cl.top_main}>
                            <h3>Скло - монтаж</h3>
                            <Quadrants/>
                        </div>
                        <div className={cl.middle_main}>
                            <h1>Скло під ключ – бездоганний монтаж скла та прозорі рішення для вашого дому!</h1>
                        </div>
                        <div className={cl.bottom_main}>
                            <p>
                                Ми пропонуємо надійний сервіс з монтажу, заміни та ремонту скляних конструкцій у вашому
                                будинку, квартирі чи офісі. Досвідчені фахівці гарантують монтаж під ключ із сучасними
                                технологіями та матеріалами.
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
                    </BlockBlurredBackground>
                </main>
                <FeedbackPopup active={active} setActive={setActive}/>
            </div>

        </>
    );
};

export default MainSection;
