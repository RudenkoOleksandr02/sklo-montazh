import React, {FC} from 'react';
import cl from './Roadmap.module.css'

const Roadmap: FC = () => {
    return (
        <div className={cl.wrapper}>
            <div className={cl.desktop}>
                <div className={cl.topContent}>
                    <span>Ви замовляєте проєкт</span>
                    <span>Ми надаємо рішення</span>
                    <span>Ви схвалюєте роботу</span>
                    <span>Ми виконуємо проєкт</span>
                    <span>Ви задоволені!</span>
                </div>
                <div className={cl.line}>
                    <span/><span/><span/><span/><span/>
                </div>
                <div className={cl.bottomContent}>
                    <span>Ми надаємо рішення</span>
                    <span>Ми виконуємо проєкт</span>
                </div>
            </div>
            <div className={cl.mobile}>
                <div className={cl.line}>
                    <span/><span/><span/><span/><span/>
                </div>
                <div className={cl.content}>
                    <span>Ви замовляєте проєкт</span>
                    <span>Ми надаємо рішення</span>
                    <span>Ви схвалюєте роботу</span>
                    <span>Ми виконуємо проєкт</span>
                    <span>Ви задоволені!</span>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;