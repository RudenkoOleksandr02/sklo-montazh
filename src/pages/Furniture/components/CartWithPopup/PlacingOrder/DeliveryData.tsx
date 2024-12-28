import React, {FC} from 'react';
import NovaPoshta, {INovaPoshta} from "../../../../../components/containers/NovaPoshta/NovaPoshta";
import cl from './PlacingOrder.module.css';

const DeliveryData: FC<INovaPoshta> = ({handleSetDeliveryInfo, isErrorCity, isErrorDepartment}) => {
    return (
        <div className={cl.delivery}>
            <h3>Нова пошта</h3>
            <NovaPoshta
                handleSetDeliveryInfo={handleSetDeliveryInfo}
                isErrorCity={isErrorCity}
                isErrorDepartment={isErrorDepartment}
            />
        </div>
    );
};

export default DeliveryData;
