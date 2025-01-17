import React, { FunctionComponent, useState, useEffect } from 'react';
import HomeButtonsComponent from './HomeButtonsComponent';
import '../css/HomeComponent.css';
import JitsiBoxLogo from '../../logo/jitsibox.svg';
import { useLocation } from 'react-router-dom';
import { availableLanguages } from '../../i18n';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import { LocationState } from '../../utils/State';

const HomeComponent: FunctionComponent = () => {
    const { t, i18n } = useTranslation();

    const state = useLocation().state as LocationState;
    const [counter, setCounter] = useState(state && state.count ? state.count : 0);
    const [information] = useState({
        roomName: state && state.roomName ? state.roomName : '',
        domain: state && state.domain ? state.domain : '',
    });

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);
    return (
        <div className='HomeButtonsContainer'>
            <div className='LogoContainer'>
                <img src={JitsiBoxLogo} alt='logo de la jitsi-box' className='logo' />
            </div>
            <HomeButtonsComponent counter={counter} roomName={information.roomName} domain={information.domain} />
            <div className='LanguageSupport'>
                <FormControl variant='filled' sx={{ m: 1, minWidth: 120 }} style={{ backgroundColor: '#1976D2' }}>
                    <InputLabel id='demo-simple-select-label' style={{ color: 'white' }}>
                        {t('lang')}
                    </InputLabel>
                    <Select
                        value={i18n.language}
                        defaultValue={i18n.language}
                        onChange={(e) => {
                            const boxStorage = window.localStorage;
                            boxStorage.setItem('language', e.target.value as string);
                            i18n.changeLanguage(e.target.value as string);
                        }}
                        style={{ color: 'white' }}
                    >
                        {availableLanguages.map((language) => (
                            <MenuItem value={language} key={language}>
                                {language === 'fr' ? 'Français' : 'English'}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default HomeComponent;
