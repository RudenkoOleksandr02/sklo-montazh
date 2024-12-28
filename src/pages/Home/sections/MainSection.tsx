import React, {FC, useState} from 'react';
import cl from "../Home.module.css";
import Header, {HeaderVariant} from "../../../components/containers/Header/Header";
import BlockBlurredBackground from "../../../components/ui/BlockBlurredBackground/BlockBlurredBackground";
import PrimaryButton from "../../../components/ui/buttons/PrimaryButton/PrimaryButton";
import {ReactComponent as Quadrants} from '../../../assets/images/quadrants.svg';
import Feedback from "../../../components/containers/Feedback/Feedback";
import Popup from "../../../components/ui/Popup/Popup";

const HeaderWithMainSection: FC = () => {
    const [active, setActive] = useState<boolean>(false);

    return (
        <>
            <div className={cl.headerWithMain}>
               {/* <Header variant={HeaderVariant.variant1}/>*/}
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
            </div>
            <Popup active={active} setActive={setActive}>
                <div className={cl.feedback}>
                    <Feedback closePopup={() => setActive(false)}/>
                </div>
            </Popup>
        </>
    );
};

export default HeaderWithMainSection;