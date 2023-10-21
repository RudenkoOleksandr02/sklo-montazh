import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import InputMask from 'react-input-mask';
import NovaPoshta from "./NovaPoshta/NovaPoshta";

const ContactForm = ({
                         name,
                         setName,
                         tel,
                         setTel,
                         radioValue,
                         setRadioValue,
                         cityValue,
                         setCityValue,
                         departmentValue,
                         setDepartmentValue,
                         isErrorInTell,
                         isErrorInName,
                         isErrorInCity,
                         isErrorInDep
                     }) => {


    const handleTelChange = (e) => {
        setTel(e.target.value);
    };

    return (
        <Stack direction='column' spacing={2} sx={{
            margin: '5px auto',
            width: '300px',
            '@media (max-width: 415px)': {
                width: '100%',
            },
        }}>
            {isErrorInName && <Typography sx={{
                color: 'red',
                marginTop: '0 !important'
            }}>Введіть ім'я</Typography>}
            <TextField
                label="Ім'я"
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                size='small'
                required
                sx={{
                    marginTop: '10px !important',
                    marginBottom: '10px !important'
                }}
            />
            {isErrorInTell && <Typography sx={{
                color: 'red',
                marginTop: '0 !important '
            }}>Введіть коректний номер телефону</Typography>}
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
                        sx={{
                            marginTop: '10px !important',
                            marginBottom: '10px !important'
                        }}
                    />
                )}
            </InputMask>
            <FormControl>
                <RadioGroup name='choice' value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
                    <FormControlLabel control={<Radio/>} label='Самовивіз' value='pickup'/>
                    <FormControlLabel control={<Radio/>} label='Нова Пошта' value='email'/>
                </RadioGroup>
            </FormControl>
            {radioValue === 'email' && <NovaPoshta cityValue={cityValue} 
                        setCityValue={setCityValue}
                        departmentValue={departmentValue}
                        setDepartmentValue={setDepartmentValue}
                        isErrorInCity={isErrorInCity}
                        isErrorInDep={isErrorInDep}
            />}
        </Stack>
    );
};

export default ContactForm;
