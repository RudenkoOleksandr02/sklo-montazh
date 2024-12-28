import React, {FC} from 'react';
import cl from './Popup.module.css'

interface PopupProps {
    active: boolean;
    setActive: (active: boolean) => void;
    children: React.ReactNode;
    isCustomClose?: boolean;
}

const Popup: FC<PopupProps> = ({active, setActive, children, isCustomClose = false}) => {
    return (
        <div className={`${cl.modal} ${active ? cl.active : ''} ${!isCustomClose ? cl.notCustomClose : ''}`}
             onClick={!isCustomClose ? () => setActive(false) : () => {
             }}>
            {!isCustomClose && (
                <div className={cl.closeBtn}>
                    <span/>
                    <span/>
                </div>
            )}
            <div className={active ? `${cl.modal__content + ' ' + cl.active}` : cl.modal__content}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Popup;