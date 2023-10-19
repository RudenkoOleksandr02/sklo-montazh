import React, {useEffect, useState} from 'react';
import {Autocomplete, FormControl, TextField} from "@mui/material";
import axios from "axios";
import FindField from "./FindField/FindField";

const Np = ({ radioValue }) => {
    const [city, setCity] = useState([]);
    const [refCity, setRefCity] = useState('');
    const [department, setDepartment] = useState([]);
    const [error, setError] = useState(null);
    const [inputDepartment, setInputDepartment] = useState('');
    const [inputCity, setInputCity] = useState('');

    const handleCityChange = (newValue) => {
        if (inputCity === '' || newValue === null) {
            setInputDepartment('');
        }
    }

    return (
        <FormControl>
            <FindField
                branches={city}
                setBranches={setCity}
                error={error}
                setError={setError}
                find='city'
                refCity={refCity}
                setRefCity={setRefCity}
                inputText={inputCity}
                setInputText={setInputCity}
                handleCityChange={handleCityChange}
            />
            <FindField
                branches={department}
                setBranches={setDepartment}
                error={error}
                setError={setError}
                find='department'
                refCity={refCity}
                inputText={inputDepartment}
                setInputText={setInputDepartment}
            />
        </FormControl>
    );
};

export default Np;
