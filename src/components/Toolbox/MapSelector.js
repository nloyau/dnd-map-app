import React, { Fragment, useRef } from "react";
import { useState } from "react";
import { Button, Tooltip } from "@mui/material";
import { Input, ToggleButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
const MapSelector = ({icon, tooltip,onMapChange}) => {
    const fileUploadRef = useRef();

    const handleClick = () => {
        fileUploadRef.current.click();
        console.log(icon)
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onMapChange(reader.result);
            }
            reader.readAsDataURL(file);
        }
    };
    const { t } = useTranslation();
    return (
        <ToggleButton value="changeMap" key="changeMap" onClick={handleClick}>
           
            <Tooltip title={t('DMTools.'+tooltip+'.text')}>{icon}</Tooltip>
            <input ref={fileUploadRef} hidden={true} type="file" onChange={handleFileChange} />
        </ToggleButton>
    );
};

export default MapSelector;