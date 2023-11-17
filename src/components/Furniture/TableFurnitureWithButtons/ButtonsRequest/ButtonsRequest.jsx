import React, {useEffect, useState} from 'react';
import {ToggleButton, ToggleButtonGroup, IconButton, Box} from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {useNavigate, useParams} from "react-router-dom";

const ButtonsRequest = ({category}) => {
    const params= useParams()
    const route = useNavigate()
    const [formats, setFormats] = useState(category);
    const [page, setPage] = useState(parseInt(localStorage.getItem('currentPage')) || 1);

    useEffect(() => {
        localStorage.setItem('currentPage', page.toString());

        return () => {
            localStorage.removeItem('currentPage')
        }
    }, [page]);

    useEffect(() => {
        setFormats(params.category)
    }, [params.category])

    const buttonsPerPage = 5;
    const totalButtons = 10;

    const startIndex = (page - 1) * buttonsPerPage;
    const endIndex = startIndex + buttonsPerPage;

    const handleFormatChange = (event, newFormats) => {
        if (newFormats !== null) {
            setFormats(newFormats);
        }
    }

    const nextPage = () => {
        setPage(page + 1);
    };

    const prevPage = () => {
        setPage(page - 1);
    };

    const buttonsData = [
        {value: 'furniture_barbells', label: 'Штанги', action: () => route('/furniture_barbells')},
        {value: 'furniture_fastenings', label: 'Кріплення', action: () => route('/furniture_fastenings')},
        {value: 'furniture_handles', label: 'Ручки', action: () => route('/furniture_handles')},
        {value: 'furniture_loops', label: 'Петлі', action: () => route('/furniture_loops')},
        {
            value: 'furniture_sliding_systems',
            label: 'Розсувні системи',
            action: () => route('/furniture_sliding_systems')
        },
        {value: 'furniture_thresholds', label: 'Пороги', action: () => route('/furniture_thresholds')},
        {value: 'furniture_sealers', label: 'Ущільнювачі', action: () => route('/furniture_sealers')},
        {value: 'furniture_profiles', label: 'Профілі', action: () => route('/furniture_profiles')},
        {
            value: 'furniture_pendulum_systems',
            label: 'Маятникові системи',
            action: () => route('/furniture_pendulum_systems')
        },
        {value: 'furniture_shelf_mounts', label: 'Кріплення для полиць', action: () => route('/furniture_shelf_mounts')}
    ];

    const visibleButtons = buttonsData
        .slice(startIndex, endIndex)
        .map((button) => (
            <ToggleButton
                key={button.value}
                value={button.value}
                onClick={button.action}
                sx={{
                    flex: '1',
                    minWidth: '100px',
                    borderLeft: '1px solid #D5D5D5 !important',
                    borderRadius: '0',
                    marginLeft: '0 !important',
                }}
                disabled={formats === button.value}
            >
                {button.label}
            </ToggleButton>
        ));

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <IconButton onClick={prevPage} disabled={page === 1}>
                <KeyboardArrowLeftIcon/>
            </IconButton>
            <ToggleButtonGroup
                value={formats}
                onChange={handleFormatChange}
                exclusive
                color="secondary"
                size="small"
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                }}
            >
                {visibleButtons}
            </ToggleButtonGroup>
            <IconButton onClick={nextPage} disabled={endIndex >= totalButtons}>
                <KeyboardArrowRightIcon/>
            </IconButton>
        </Box>
    );
};

export default ButtonsRequest;
