import {Stack, TextField} from "@mui/material";
import InputMask from 'react-input-mask';

const ContactForm = ({name, setName, tel, setTel}) => {
    const handleTelChange = (e) => {
        setTel(e.target.value);
    };

    return <Stack direction='column' spacing={2} sx={{
        margin: '5px 0'
    }}>
        <TextField
            label="Ім'я"
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            size='small'
            required
        />
        <InputMask
            mask="+38 (999) 999 99 99"
            maskChar="_"
            value={tel}
            onChange={handleTelChange}
        >
            {(inputProps) => (
                <TextField
                    {...inputProps}
                    label='Номер телефону'
                    type="tel"
                    required
                    size='small'
                />
            )}
        </InputMask>
    </Stack>
};

export default ContactForm;
