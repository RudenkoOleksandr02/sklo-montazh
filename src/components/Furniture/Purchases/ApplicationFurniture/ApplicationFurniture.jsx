import {useState} from "react";
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Alert} from "@mui/material";
import ContactForm from "./ContactForm/ContactForm";
import emailjs from "emailjs-com";
import {connect} from "react-redux";
import {clearBasket} from "../../../../store/basket-reducer";

const ApplicationFurniture = ({products, isDisabled = false, clearBasket, totalAmount}) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [isErrorInTell, setIsErrorInTell] = useState(false);
    const [isErrorInName, setIsErrorInName] = useState(false);
    const [isErrorInCity, setIsErrorInCity] = useState(false);
    const [isErrorInDep, setIsErrorInDep] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const SERVICE_ID = 'service_emk8qsh';
    const TEMPLATE_ID = 'template_bttyo57';
    const PUBLIC_KEY = 'pdEXm-DmTqi493iQu';
    const [radioValue, setRadioValue] = useState('pickup');
    const [cityValue, setCityValue] = useState(null);
    const [departmentValue, setDepartmentValue] = useState(null);

    const sendEmail = () => {
        let productsTable = `<table style="border-collapse: collapse; width: 100%;">
                                <tr>
                                    <th style="border: 1px solid #888; padding: 8px; background-color: #f2f2f2;">Назва</th>
                                    <th style="border: 1px solid #888; padding: 8px; background-color: #f2f2f2;">Артикул</th>
                                    <th style="border: 1px solid #888; padding: 8px; background-color: #f2f2f2;">Ціна</th>
                                    <th style="border: 1px solid #888; padding: 8px; background-color: #f2f2f2;">Кількість</th>
                                </tr>
                                ${products.map(product => {
                                            return `<tr>
                                        <td style="border: 1px solid #888; padding: 8px;">${product.name}</td>
                                        <td style="border: 1px solid #888; padding: 8px;">${product.article}</td>
                                        <td style="border: 1px solid #888; padding: 8px;">${product.price}</td>
                                        <td style="border: 1px solid #888; padding: 8px;">${product.quantity}</td>
                                    </tr>`;
                                })}
                            </table>`;

        const delivery = radioValue === 'email' ? `Нова Пошта: ${cityValue !== null && typeof cityValue === 'object' ? cityValue.label : cityValue}` + ', ' + departmentValue : 'Самовивіз';
        const templateParams = {
            title: 'Фурнітура',
            productsTable,
            name,
            phoneNumber: tel,
            totalAmount: totalAmount,
            delivery
        };
        const isTelCorrect = () => {
            return tel.split('').every(el => el !== '_');
        }

        if (name && tel.length === 19 && isTelCorrect() && (radioValue === 'pickup' || radioValue === 'email' && cityValue && departmentValue)) {
            setOpen(false);
            setIsSuccess(true);
            emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
                .then((result) => {
                    console.log(result.text);
                    clearBasket();
                })
                .catch((error) => {
                    console.error(error.text);
                });
        }

        if (!name) {
            setIsErrorInName(true);
        } else {
            setIsErrorInName(false);
        }
        if (!(tel.length === 19 && isTelCorrect())) {
            setIsErrorInTell(true);
        } else {
            setIsErrorInTell(false);
        }
        if (!cityValue && radioValue === 'email') {
            setIsErrorInCity(true);
        } else {
            setIsErrorInCity(false);
        }
        if (!departmentValue && radioValue === 'email') {
            setIsErrorInDep(true);
        } else {
            setIsErrorInDep(false);
        }

    }

    return (
        <>
            <Button variant="contained"
                    onClick={() => setOpen(true)}
                    color='secondary'
                    disabled={isDisabled}
            >
                Залишити заявку
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="dialog-title"
            >
                <DialogTitle id="dialog-title"></DialogTitle>
                <DialogContent>
                    <ContactForm name={name} tel={tel}
                                 setName={setName}
                                 setTel={setTel}
                                 radioValue={radioValue}
                                 setRadioValue={setRadioValue}
                                 cityValue={cityValue}
                                 setCityValue={setCityValue}
                                 departmentValue={departmentValue}
                                 setDepartmentValue={setDepartmentValue}
                                 isErrorInTell={isErrorInTell}
                                 isErrorInName={isErrorInName}
                                 isErrorInCity={isErrorInCity}
                                 isErrorInDep={isErrorInDep}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color='secondary'>Закрити</Button>
                    <Button onClick={sendEmail} color='secondary'>Відправити</Button>
                </DialogActions>
            </Dialog>
            {isSuccess && <Alert severity='success'
                                 onClose={() => setIsSuccess(false)}
                                 sx={{
                                     position: 'fixed',
                                     left: '0',
                                     bottom: '0',
                                     fontSize: '16px'
                                 }}
            >Ваша заявка відправлена</Alert>}
        </>
    );
};

export default connect(null, {clearBasket})(ApplicationFurniture);
