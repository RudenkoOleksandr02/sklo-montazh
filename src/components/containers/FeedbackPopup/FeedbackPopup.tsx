import React, {FC} from 'react';
import cl from './FeedbackPopup.module.css';
import Feedback from "../Feedback/Feedback";
import Popup from "../../ui/Popup/Popup";

interface FeedbackPopupProps {
    active: boolean;
    setActive: (active: boolean) => void;
}

const FeedbackPopup: FC<FeedbackPopupProps> = ({active, setActive}) => {
    return (
        <Popup active={active} setActive={setActive}>
            <div className={cl.feedback}>
                <Feedback closePopup={() => setActive(false)}/>
            </div>
        </Popup>
    );
};

export default FeedbackPopup;