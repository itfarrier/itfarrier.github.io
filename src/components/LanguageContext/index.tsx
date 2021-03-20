import { createContext, FC, useEffect, useState } from 'react';

import { LANGUAGE_CODES, LOCALSTORAGE_KEYS } from 'src/constants';

export type Language = LANGUAGE_CODES | string;

export type LanguageContextState = {
  language: Language;
  toggleLanguage(nextLanguage: Language): void;
};

const initialState: LanguageContextState = {
  language: LANGUAGE_CODES.EN,
  toggleLanguage: () => {},
};

export const LanguageContext = createContext<LanguageContextState>(initialState);

export const LanguageContextProvider: FC = (props) => {
  const [language, setLanguage] = useState<Language>(LANGUAGE_CODES.EN);

  const toggleLanguage: LanguageContextState['toggleLanguage'] = (nextLanguage) => {
    localStorage.setItem(LOCALSTORAGE_KEYS.LANGUAGE, JSON.stringify(nextLanguage));
    setLanguage(nextLanguage);
  };

  useEffect(() => {
    const languageFromLocalStorage = localStorage.getItem(LOCALSTORAGE_KEYS.LANGUAGE);

    if (languageFromLocalStorage === null) {
      setLanguage(LANGUAGE_CODES.EN);
      localStorage.setItem(LOCALSTORAGE_KEYS.LANGUAGE, JSON.stringify(language));
    } else {
      setLanguage(languageFromLocalStorage.replace(/"/g, ''));
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  );
};
