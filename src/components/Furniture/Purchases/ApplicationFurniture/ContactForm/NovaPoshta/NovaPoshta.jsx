import React, {useState} from 'react';
import {FormControl, Typography} from "@mui/material";
import CityField from "./CityField/CityField";
import DepartmentField from "./DepartmentField/DepartmentField";

const NovaPoshta = ({cityValue, setCityValue, departmentValue, setDepartmentValue, isErrorInCity, isErrorInDep}) => {
    const [locality, setLocality] = useState([]);
    const [localityRef, setLocalityRef] = useState(null);
    const [department, setDepartment] = useState([]);

    const handleChangesCity = (newCity) => {
        if (cityValue !== newCity || !cityValue) {
            setDepartmentValue(null)
        }
    }

    return <FormControl>
        {isErrorInCity && <Typography sx={{
                color: 'red',
                marginTop: '0 !important '
            }}>Введіть город</Typography>}
        <CityField
            locality={locality}
            setLocality={setLocality}
            setLocalityRef={setLocalityRef}
            cityValue={cityValue}
            setCityValue={setCityValue}
            handleChangesCity={handleChangesCity}
        />
        {isErrorInDep && <Typography sx={{
                color: 'red',
                marginTop: '0 !important '
            }}>Введіть відділення</Typography>}
        <DepartmentField
            department={department}
            setDepartment={setDepartment}
            localityRef={localityRef}
            departmentValue={departmentValue}
            setDepartmentValue={setDepartmentValue}
        />
    </FormControl>
};

export default NovaPoshta;
