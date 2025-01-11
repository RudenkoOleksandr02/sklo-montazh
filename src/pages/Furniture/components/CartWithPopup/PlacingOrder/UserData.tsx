import React, {FC} from 'react';
import cl from './PlacingOrder.module.css';
import InputText from "../../../../../components/ui/InputText/InputText";
import InputMobile from "../../../../../components/ui/InputMobile/InputMobile";

interface UserDataProps {
    name: string;
    lastName: string;
    phone: string;
    changeNameHandler: (value: string) => void;
    changeLastNameHandler: (value: string) => void;
    changePhoneHandler: (value: string) => void;
    isErrorName: boolean;
    isErrorLastName: boolean;
    isErrorPhone: boolean;
}

const UserData: FC<UserDataProps> = ({
                                         phone,
                                         isErrorPhone,
                                         changePhoneHandler,
                                         isErrorName,
                                         changeNameHandler,
                                         name,
                                         isErrorLastName,
                                         changeLastNameHandler,
                                         lastName
                                     }) => {
    return (
        <div className={cl.user}>
            <h3>Контактні дані</h3>
            <div className={cl.form}>
                <InputText value={name} handleChange={changeNameHandler} title="Ім'я" isError={isErrorName}/>
                <InputText value={lastName} handleChange={changeLastNameHandler} title="Прізвище" isError={isErrorLastName}/>
                <InputMobile phone={phone} changePhoneHandler={changePhoneHandler} isErrorPhone={isErrorPhone}/>
            </div>
        </div>
    );
};

export default UserData;