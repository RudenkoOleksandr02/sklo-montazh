import React, {FC, useState} from 'react';
import BlockBlurredBackground from "../../../components/ui/BlockBlurredBackground/BlockBlurredBackground";
import cl from "../Home.module.css";
import PrimaryButton from "../../../components/ui/buttons/PrimaryButton/PrimaryButton";
import Popup from "../../../components/ui/Popup/Popup";
import Feedback from "../../../components/containers/Feedback/Feedback";

const CallToAction: FC = () => {
    const [active, setActive] = useState(false);

    return (
        <section>
            <BlockBlurredBackground>
                <div className={cl.callToAction}>
                    <p>Розкажіть про свої задачі, ми зробимо гарну пропозицію</p>
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
            <Popup active={active} setActive={setActive}>
                <Feedback closePopup={() => setActive(false)}/>
            </Popup>
        </section>
    );
};

export default CallToAction;