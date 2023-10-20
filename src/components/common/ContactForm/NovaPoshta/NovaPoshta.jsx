import React, {useState} from 'react';
import {FormControl} from "@mui/material";
import CityField from "./CityField/CityField";
import DepartmentField from "./DepartmentField/DepartmentField";

const NovaPoshta = () => {
    const [locality, setLocality] = useState([]);
    const [localityRef, setLocalityRef] = useState(null);
    console.log(locality)

    return <FormControl>
        <CityField
            locality={locality}
            setLocality={setLocality}
            setLocalityRef={setLocalityRef}
        />
        <DepartmentField/>
    </FormControl>
};

export default NovaPoshta;
