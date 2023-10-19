import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Select,
    MenuItem,
    Stack,
    TextField
} from "@mui/material";
import InputMask from 'react-input-mask';
import axios from 'axios';
import { useEffect, useState } from "react";
import NP from "./NP/NP";

const ContactForm = ({
                         name,
                         setName,
                         tel,
                         setTel,
                         radioValue,
                         setRadioValue,
                         appointment,
                         setAppointment,
                         furniture = false
                     }) => {


    const handleTelChange = (e) => {
        setTel(e.target.value);
    };

    return (
        <Stack direction='column' spacing={2} sx={{
            margin: '5px 0',
            width: '300px'
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
            {furniture ? (
                <FormControl>
                    <RadioGroup name='choice' value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
                        <FormControlLabel control={<Radio/>} label='Самовивіз' value='pickup'/>
                        <FormControlLabel control={<Radio/>} label='Нова Пошта' value='email'/>
                    </RadioGroup>
                </FormControl>
            ) : null}
            {furniture && radioValue === 'email' ? (
                <NP radioValue={radioValue}/>
            ) : null}
            {/*<TextField
                label="Пункт призначення"
                type='text'
                value={appointment}
                disabled={radioValue === 'pickup'}
                onChange={e => setAppointment(e.target.value)}
                size='small'
            />*/}
        </Stack>
    );
};

export default ContactForm;
