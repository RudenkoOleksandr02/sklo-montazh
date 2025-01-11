import React, {FC} from 'react';
import cl from './MakeOrderPopup.module.css';
import Popup from "../../ui/Popup/Popup";
import Feedback from "../Feedback/Feedback";

interface MakeOrderPopupProps {
    children: React.ReactNode;
    active: boolean;
    setActive: (active: boolean) => void;
    orderData: {title: string, other?: any};
}

const MakeOrderPopup: FC<MakeOrderPopupProps> = ({children, active, setActive, orderData}) => {
    return (
        <Popup active={active} setActive={setActive}>
            <div className={cl.content}>
                <div className={cl.children}>{children}</div>
                <div className={cl.feedback}>
                    <Feedback closePopup={() => setActive(false)} textBtn='Залишити заявку' orderData={orderData}/>
                </div>
            </div>
        </Popup>
    );
};

export default MakeOrderPopup;