import React, {useState} from 'react';
import {FormControl} from "@mui/material";
import CityField from "./CityField/CityField";
import DepartmentField from "./DepartmentField/DepartmentField";

const NovaPoshta = () => {
    const [locality, setLocality] = useState([]);
    const [localityRef, setLocalityRef] = useState(null);
    const [department, setDepartment] = useState([]);
    const [cityValue, setCityValue] = useState(null);
    const [departmentValue, setDepartmentValue] = useState(null);

    const handleChangesCity = (newCity) => {
        if (cityValue !== newCity || !cityValue) {
            setDepartmentValue(null)
        }
    }

    return <FormControl>
        <CityField
            locality={locality}
            setLocality={setLocality}
            setLocalityRef={setLocalityRef}
            cityValue={cityValue}
            setCityValue={setCityValue}
            handleChangesCity={handleChangesCity}
        />
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
