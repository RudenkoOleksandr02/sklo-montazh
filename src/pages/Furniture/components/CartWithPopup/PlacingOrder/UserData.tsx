import React, {FC} from 'react';
import cl from './PlacingOrder.module.css';
import Input from "../../../../../components/ui/Input/Input";
import InputMobile from "../../../../../components/ui/InputMobile/InputMobile";

interface UserDataProps {
    name: string;
    lastName: string;
    phone: string;
    changeNameHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    changeLastNameHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
                <Input value={name} handleChange={changeNameHandler} title="Ім'я" isError={isErrorName}/>
                <Input value={lastName} handleChange={changeLastNameHandler} title="Прізвище" isError={isErrorLastName}/>
                <InputMobile phone={phone} changePhoneHandler={changePhoneHandler} isErrorPhone={isErrorPhone}/>
            </div>
        </div>
    );
};

export default UserData;