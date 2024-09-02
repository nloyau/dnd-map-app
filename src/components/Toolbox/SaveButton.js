import { Save } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { useTranslation } from 'react-i18next';
const SaveButton = ({getState, filename}) => {
    const downloadJSON = () => {
        const data = getState();
        const jsonData = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const jsonURL = URL.createObjectURL(jsonData);
        const link = document.createElement('a');
        link.href = jsonURL;
        link.download = `${filename}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const { t } = useTranslation();
    return (
        <Button variant="contained" color="primary" onClick={downloadJSON}><Tooltip title={t('DMTools.Save.text')}><Save /></Tooltip></Button>
    );
};

export default SaveButton;