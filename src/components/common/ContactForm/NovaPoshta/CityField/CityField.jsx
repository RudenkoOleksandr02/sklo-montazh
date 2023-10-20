import React, { useEffect } from 'react';
import {Autocomplete, TextField} from "@mui/material";
import axios from "axios";

const CityField = ({locality, setLocality, setLocalityRef, cityValue, setCityValue, handleChangesCity}) => {
    const handleLocalitySelect = (newValue) => {
        setCityValue(newValue)

        if (newValue) {
            const selectedLocal = locality.find(local => {
                return local.id === newValue.id
            })
            setLocalityRef(selectedLocal.id)
            handleChangesCity(newValue.label)
        } else {
            setLocalityRef(null)
            handleChangesCity(null)
        }
    }
    const fetchBranches = async (searchText) => {
        const commaIndex = searchText.indexOf(',');

        const data = {
            "apiKey": "a030db66aabe1b33b3667ba05933379a",
            "modelName": "Address",
            "calledMethod": "getSettlements",
            "methodProperties": {
                "FindByString": commaIndex !== 0 ? searchText.slice(0, commaIndex) : searchText,
                "Warehouse": "1",
                "Limit": "20"
            }
        };

        try {
            const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setLocality(response.data.data.map((data) => {
                return {
                    id: data.Ref,
                    label: data.Description + ', ' + data.AreaDescription
                }
            }));
        } catch (error) {
            console.log(error)
        }
    }

    return <Autocomplete
        sx={{
            margin: '10px 0'
        }}
        options={locality}
        value={cityValue}
        onChange={(e, newValue) => handleLocalitySelect(newValue)}
        noOptionsText="Немає результату"
        renderInput={params => (
            <TextField
                {...params}
                size="small"
                label='Город'
                onChange={(e) => {
                    fetchBranches(e.target.value);
                }}
            />
        )}
    />
}

export default CityField;
