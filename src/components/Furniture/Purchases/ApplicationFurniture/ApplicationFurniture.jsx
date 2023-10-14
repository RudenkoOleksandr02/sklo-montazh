import {useState} from "react";
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Alert} from "@mui/material";
import ContactForm from "../../../common/ContactForm/ContactForm";
import emailjs from "emailjs-com";
import {connect} from "react-redux";
import {clearBasket} from "../../../../store/basket-reducer";

const ApplicationFurniture = ({products, isDisabled = false, clearBasket, totalAmount}) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const SERVICE_ID = 'service_emk8qsh';
    const TEMPLATE_ID = 'template_bttyo57';
    const PUBLIC_KEY = 'pdEXm-DmTqi493iQu';
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
        const templateParams = {
            title: 'Фурнітура',
            productsTable,
            name,
            phoneNumber: tel,
            totalAmount: totalAmount
        };
        const isTelCorrect = () => {
            return tel.split('').every(el => el !== '_');
        }

        if (name !== '' && tel.length === 19 && isTelCorrect()) {
            setIsError(false);
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
        } else {
            setIsError(true);
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
                    />
                    {isError &&
                        <DialogContentText color='error' sx={{
                            marginTop: '8px'
                        }}>Введіть ім'я та коректний номер телефону</DialogContentText>
                    }
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
