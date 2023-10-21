import React from 'react';
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";

const DepartmentField = ({ department, setDepartment, localityRef, departmentValue, setDepartmentValue }) => {
    const fetchBranches = async (searchText) => {
      
        const data = {
            "apiKey": "a030db66aabe1b33b3667ba05933379a",
            "modelName": "Address",
            "calledMethod": "getWarehouses",
            "methodProperties": {
                "SettlementRef": localityRef,
                "FindByString": searchText,
                "Limit": "50"
            }
        }

        try {
            const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setDepartment(response.data.data.map((data) => {
                return data.Description
            }));
        } catch (error) {
            console.log(error)
        }
    }

    return <Autocomplete
        sx={{
            margin: '10px 0'
        }}
        onChange={(e, newValue) => {
            if (newValue === null) {
                fetchBranches('')
            } else {
                setDepartmentValue(newValue)
            }
        }}
        value={departmentValue}
        options={department}
        noOptionsText="Немає результату"
        disabled={localityRef ? false : true}
        renderInput={params => (
            <TextField
                {...params}
                size="small"
                label='Відділення'
                onChange={(e) => {
                    fetchBranches(e.target.value);
                }}
                onFocus={(e) => fetchBranches(e.target.value)}
            />
        )}
    />
};

export default DepartmentField;
