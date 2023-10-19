import React, {useRef, useState, useEffect} from 'react';
import {Autocomplete, TextField} from "@mui/material";
import axios from "axios";

const FindField = ({
                       branches,
                       setBranches,
                       error,
                       setError,
                       find,
                       refCity,
                       inputText,
                       setInputText,
                       handleCityChange,
                       setRefCity
                   }) => {
    const handleCitySelect = (event, newValue) => {
        if (newValue && find === 'city') {
            const objCity = branches.find(data => {
                return newValue.city === data.city && newValue.region === data.region;
            })
            setRefCity(objCity.ref);
            handleCityChange(newValue.city + ', ' + newValue.region)
        } else if (find === 'city') {
            setRefCity('');
            handleCityChange(null)
        }
    }
    const fetchBranches = async (searchText) => {
        let data;

        if (find === 'city') {
            const commaIndex = searchText.indexOf(',')

            data = {
                "apiKey": "a030db66aabe1b33b3667ba05933379a",
                "modelName": "Address",
                "calledMethod": "getSettlements",
                "methodProperties": {
                    "FindByString": searchText === '' ? 'а' : (commaIndex !== 0 ? searchText.slice(0, commaIndex) : searchText),
                    "Warehouse": "1",
                    "Limit": "20"
                }
            };
        }
        if (find === 'department') {
            data = {
                "apiKey": "a030db66aabe1b33b3667ba05933379a",
                "modelName": "Address",
                "calledMethod": "getWarehouses",
                "methodProperties": {
                    "SettlementRef": refCity,
                    "FindByString": searchText,
                    "Limit": "20"
                }
            }
        }

        try {
            const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (find === 'city') {
                setBranches(response.data.data.map((data) => {
                    return {city: data.Description, region: data.AreaDescription, ref: data.Ref}
                }));
            }
            if (find === 'department') {
                setBranches(response.data.data.map((data) => {
                    return data.Description
                }));
            }
            setError(null);
        } catch (error) {
            console.error(error);
            setError("Произошла ошибка при загрузке данных");
        }
    };

    return (
        <Autocomplete
            sx={{
                margin: '10px 0',
                "& .MuiAutocomplete-inputRoot": {
                    minWidth: '300px',
                },
            }}
            onChange={handleCitySelect}
            options={branches}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                    return option;
                } else if (typeof option === 'object') {
                    return find === 'city' ? option.city + ', ' + option.region : '';
                } else {
                    return '';
                }
            }}
            noOptionsText="Немає результату"
            disabled={refCity === '' && find === 'department' ? true : false}
            value={branches.find(option => option.city === inputText)}
            onInputChange={(event, newInputValue) => {
                if (newInputValue === '') {
                    fetchBranches(newInputValue)
                    setInputText(newInputValue)
                } else {
                    setInputText(newInputValue);
                }

            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={find === 'city' ? "Город" : 'Відділення'}
                    size="small"
                    onFocus={(e) => {
                        fetchBranches(e.target.value)
                    }}
                    onChange={(e) => {
                        fetchBranches(e.target.value);
                    }}
                    error={!!error}
                    helperText={error}
                />
            )}
        />
    );
}

export default FindField;
