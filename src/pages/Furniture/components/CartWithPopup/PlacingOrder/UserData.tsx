import React, {FC} from 'react';
import cl from './PlacingOrder.module.css';
import Input from "../../../../../components/ui/Input/Input";
import InputMobile from "../../../../../components/ui/InputMobile/InputMobile";

interface UserDataProps {
    name: string;
    phone: string;
    changeNameHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    changePhoneHandler: (value: string) => void;
    isErrorName: boolean;
    isErrorPhone: boolean;
}

const UserData: FC<UserDataProps> = ({
                                         phone,
                                         isErrorPhone,
                                         changePhoneHandler,
                                         isErrorName,
                                         changeNameHandler,
                                         name
                                     }) => {
    return (
        <div className={cl.user}>
            <h3>Контактні дані</h3>
            <div className={cl.form}>
                <Input value={name} handleChange={changeNameHandler} title="Ім'я" isError={isErrorName}/>
                <InputMobile phone={phone} changePhoneHandler={changePhoneHandler} isErrorPhone={isErrorPhone}/>
            </div>
        </div>
    );
};

export default UserData;