import {useState} from "react";
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Alert} from "@mui/material";
import ContactForm from "./ContactForm/ContactForm";
import emailjs from "emailjs-com";

const Application = ({title}) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const SERVICE_ID = 'service_emk8qsh';
    const TEMPLATE_ID = 'template_bta90ej';
    const PUBLIC_KEY = 'pdEXm-DmTqi493iQu';
    const sendEmail = () => {
        const templateParams = {
            title: title,
            name: name,
            phoneNumber: tel
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
            >
                Залишити заявку
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="dialog-title"
            >
                <DialogTitle id="dialog-title">{title}</DialogTitle>
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

export default Application;
