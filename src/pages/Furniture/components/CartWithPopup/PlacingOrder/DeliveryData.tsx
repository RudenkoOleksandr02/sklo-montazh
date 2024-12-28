import React, {FC, useState} from 'react';
import NovaPoshta from "../../../../../../components/containers/NovaPoshta/NovaPoshta";
import cl from './DeliveryData.module.css';

const DeliveryData: FC = () => {
    const [deliveryInfo, setDeliveryInfo] = useState<{city: string, department: string}>({
        city: "",
        department: ""
    });
    const [isErrorCity, setIsErrorCity] = useState<boolean>(false);
    const [isErrorDepartment, setIsErrorDepartment] = useState<boolean>(false);

    const handleSetDeliveryInfo = (value: string, key: string) => {
        setDeliveryInfo({...deliveryInfo, [key]: value})
    }

    return (
        <div className={cl.wrapper}>
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
