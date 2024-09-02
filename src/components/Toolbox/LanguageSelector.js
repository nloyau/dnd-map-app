import { Flag } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import  '../../i18n';
import i18n from 'i18next';


const LanguageButton = () => {

    const lngs = [
        { code: 'en', nativeName: 'En' },
        { code: 'fr', nativeName: 'Fr' },
      ];


    return (
        <div>
        {lngs.map((lng) => {
          return (
            <Button
              //className="m-4 p-2 bg-blue-600 rounded"
              key={lng.code}
              type="submit"
              onClick={() => i18n.changeLanguage(lng.code)}
            >
              <Flag/>{lng.nativeName}
            </Button>
          );
        })}
      </div>
    );
};

export default LanguageButton;