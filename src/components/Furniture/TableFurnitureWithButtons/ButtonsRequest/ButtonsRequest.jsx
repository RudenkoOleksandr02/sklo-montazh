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
                            getProfiles
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
            size="small" // Изменение размера кнопок для адаптивности
            sx={{
                display: 'flex',
                flexWrap: 'wrap', // Позволяет кнопкам переноситься на новую строку при нехватке места
            }}
        >
            <ToggleButton
                value='barbells'
                onClick={() => openCategory('barbells', getBarbells)}
                sx={{
                    flex: '1', // Равномерное распределение кнопок на экранах с разными размерами
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
                }}
                disabled={formats === 'profiles'}
            >
                Профілі
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ButtonsRequest;
