import React, {FC} from 'react';
import cl from './Calculator.module.css';

interface ButtonsProps {
    handleCalculate: () => void;
    returnToOriginalSettings: () => void;

}

const Buttons: FC<ButtonsProps> = ({handleCalculate, returnToOriginalSettings}) => {
    return (
        <div className={cl.buttons}>
            {/*<button onClick={handleCalculate}>Розрахувати</button>*/}
            <button onClick={returnToOriginalSettings}>Відновити стандартні параметри</button>
        </div>
    );
};

export default Buttons;