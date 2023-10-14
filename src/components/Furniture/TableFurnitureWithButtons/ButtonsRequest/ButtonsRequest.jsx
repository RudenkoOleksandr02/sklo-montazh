import React, {useState} from 'react';
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

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
    const [formats, setFormats] = useState('barbells')
    const handleFormatChange = (event, newFormats) => {
        if (newFormats !== null) {
            setFormats(newFormats);
        }
    }

    return (
        <ToggleButtonGroup
            value={formats}
            onChange={handleFormatChange}
            exclusive
            color='secondary'
            size="small"
            sx={{
                display: 'flex',
                flexWrap: 'wrap'
            }}
        >
            <ToggleButton
                value='barbells'
                onClick={() => openCategory('barbells', getBarbells)}
                sx={{
                    flex: '1',
                    minWidth: '100px',
                    borderLeft: '1px solid #D5D5D5 !important',
                    borderRadius: '0',
                    marginLeft: '0 !important'
                }}
                disabled={formats === 'barbells'}
            >
                Штанги
            </ToggleButton>
            <ToggleButton
                value='fastenings'
                onClick={() => openCategory('fastenings', getFastenings)}
                sx={{
                    flex: '1',
                    minWidth: '100px',
                    borderLeft: '1px solid #D5D5D5 !important',
                    borderRadius: '0',
                    marginLeft: '0 !important'
                }}
                disabled={formats === 'fastenings'}
            >
                Кріплення
            </ToggleButton>
            <ToggleButton
                value='handles'
                onClick={() => openCategory('handles', getHandles)}
                sx={{
                    flex: '1',
                    minWidth: '100px',
                    borderLeft: '1px solid #D5D5D5 !important',
                    borderRadius: '0',
                    marginLeft: '0 !important'
                }}
                disabled={formats === 'handles'}
            >
                Ручки
            </ToggleButton>
            <ToggleButton
                value='loops'
                onClick={() => openCategory('loops', getLoops)}
                sx={{
                    flex: '1',
                    minWidth: '100px',
                    borderLeft: '1px solid #D5D5D5 !important',
                    borderRadius: '0',
                    marginLeft: '0 !important'
                }}
                disabled={formats === 'loops'}
            >
                Петлі
            </ToggleButton>
            <ToggleButton
                value='slidingSystems'
                onClick={() => openCategory('slidingSystems', getSlidingSystems)}
                sx={{
                    flex: '1',
                    minWidth: '100px',
                    borderLeft: '1px solid #D5D5D5 !important',
                    borderRadius: '0',
                    marginLeft: '0 !important'
                }}
                disabled={formats === 'slidingSystems'}
            >
                Розсувні системи
            </ToggleButton>
            <ToggleButton
                value='thresholds'
                onClick={() => openCategory('thresholds', getThresholds)}
                sx={{
                    flex: '1',
                    minWidth: '100px',
                    borderLeft: '1px solid #D5D5D5 !important',
                    borderRadius: '0',
                    marginLeft: '0 !important'
                }}
                disabled={formats === 'thresholds'}
            >
                Пороги
            </ToggleButton>
            <ToggleButton
                value='sealers'
                onClick={() => openCategory('sealers', getSealers)}
                sx={{
                    flex: '1',
                    minWidth: '100px',
                    borderLeft: '1px solid #D5D5D5 !important',
                    borderRadius: '0',
                    marginLeft: '0 !important'
                }}
                disabled={formats === 'sealers'}
            >
                Ущільнювачі
            </ToggleButton>
            <ToggleButton
                value='profiles'
                onClick={() => openCategory('profiles', getProfiles)}
                sx={{
                    flex: '1',
                    minWidth: '100px',
                    borderLeft: '1px solid #D5D5D5 !important',
                    borderRadius: '0',
                    marginLeft: '0 !important'
                }}
                disabled={formats === 'profiles'}
            >
                Профілі
            </ToggleButton>
            <ToggleButton
                value='pendulumSystems'
                onClick={() => openCategory('pendulumSystems', getPendulumSystems)}
                sx={{
                    flex: '1',
                    minWidth: '100px',
                    borderLeft: '1px solid #D5D5D5 !important',
                    borderRadius: '0',
                    marginLeft: '0 !important'
                }}
                disabled={formats === 'pendulumSystems'}
            >
                Маятникові системи
            </ToggleButton>
            <ToggleButton
                value='shelfMounts'
                onClick={() => openCategory('shelfMounts', getShelfMounts)}
                sx={{
                    flex: '1',
                    minWidth: '100px',
                    borderLeft: '1px solid #D5D5D5 !important',
                    borderRadius: '0',
                    marginLeft: '0 !important'
                }}
                disabled={formats === 'shelfMounts'}
            >
                Кріплення для полиць
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ButtonsRequest;
