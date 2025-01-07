import React, {FC, useState} from 'react';
import cl from './Feedback.module.css'
import PrimaryButton from "../../ui/buttons/PrimaryButton/PrimaryButton";
import {basicSendEmail} from "../../../utils/email";
import Input from "../../ui/Input/Input";
import InputMobile from "../../ui/InputMobile/InputMobile";

interface FeedbackProps {
    closePopup?: () => void;
    textBtn?: string;
    orderData?: {title: string, other?: any};
}

const Feedback: FC<FeedbackProps> = ({closePopup, textBtn = 'Оформити заявку', orderData}) => {
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [isErrorName, setIsErrorName] = useState<boolean>(false);
    const [isErrorLastName, setIsErrorLastName] = useState<boolean>(false);
    const [isErrorPhone, setIsErrorPhone] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const changeLastNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    }
    const changePhoneHandler = (value: string) => {
        setPhone(value);
    }
    const sendEmailHandler = () => {
        const isNameValid = name.length >= 2;
        const isLastNameValid = lastName.length >= 2;
        const isPhoneValid = phone.length === 13;

        setIsErrorName(!isNameValid);
        setIsErrorLastName(!isLastNameValid);
        setIsErrorPhone(!isPhoneValid);

        if (isNameValid && isLastNameValid && isPhoneValid) {
            setIsSuccess(true);
            basicSendEmail(name + ' ' + lastName, phone, orderData?.title, orderData?.other);

            const timer = setTimeout(() => {
                setName('');
                setLastName('');
                setPhone('');
                if (closePopup) {
                    closePopup();
                }

            }, 3500)
            return () => clearTimeout(timer);
        }
    };

    return (
        <div className={cl.wrapper}>
            <Input value={name} handleChange={changeNameHandler} title="Ім'я" isError={isErrorName}/>
            <Input value={lastName} handleChange={changeLastNameHandler} title="Прізвище" isError={isErrorLastName}/>
            <InputMobile phone={phone} changePhoneHandler={changePhoneHandler} isErrorPhone={isErrorPhone}/>
            <PrimaryButton
                width='100%'
                height='63px'
                padding='none'
                onClick={sendEmailHandler}
                isSuccess={isSuccess}
                resetSuccess={() => setIsSuccess(false)}
            >
                {textBtn}
            </PrimaryButton>
        </div>
    );
};

export default Feedback;