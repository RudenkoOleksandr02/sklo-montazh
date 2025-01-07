import React, {FC, useState} from 'react';
import BlockBlurredBackground from "../../ui/BlockContent/BlockContent";
import cl from "./CallToAction.module.css";
import PrimaryButton from "../../ui/buttons/PrimaryButton/PrimaryButton";
import FeedbackPopup from "../FeedbackPopup/FeedbackPopup";

const CallToAction: FC = () => {
    const [active, setActive] = useState(false);

    return (
        <div className={cl.wrapper}>
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
            <FeedbackPopup active={active} setActive={setActive}/>
        </div>
    );
};

export default CallToAction;