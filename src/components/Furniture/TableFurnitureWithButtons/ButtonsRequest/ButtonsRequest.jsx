import React, {useState} from 'react';
import {ToggleButton, ToggleButtonGroup, IconButton, Box} from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const ButtonsRequest = ({
                            openCategory,
                            getBarbells,
                            getFastenings,
                            getHandles,
                            getLoops,
                            getSlidingSystems,
                            getThresholds,
                            getSealers,
                            getProfiles,
                            getPendulumSystems,
                            getShelfMounts
                        }) => {
    const [formats, setFormats] = useState('barbells');
    const [page, setPage] = useState(1);
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
        {value: 'barbells', label: 'Штанги', action: () => openCategory('barbells', getBarbells)},
        {value: 'fastenings', label: 'Кріплення', action: () => openCategory('fastenings', getFastenings)},
        {value: 'handles', label: 'Ручки', action: () => openCategory('handles', getHandles)},
        {value: 'loops', label: 'Петлі', action: () => openCategory('loops', getLoops)},
        {
            value: 'slidingSystems',
            label: 'Розсувні системи',
            action: () => openCategory('slidingSystems', getSlidingSystems)
        },
        {value: 'thresholds', label: 'Пороги', action: () => openCategory('thresholds', getThresholds)},
        {value: 'sealers', label: 'Ущільнювачі', action: () => openCategory('sealers', getSealers)},
        {value: 'profiles', label: 'Профілі', action: () => openCategory('profiles', getProfiles)},
        {
            value: 'pendulumSystems',
            label: 'Маятникові системи',
            action: () => openCategory('pendulumSystems', getPendulumSystems)
        },
        {value: 'shelfMounts', label: 'Кріплення для полиць', action: () => openCategory('shelfMounts', getShelfMounts)}
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
