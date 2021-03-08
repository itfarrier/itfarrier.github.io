import * as React from 'react';
import { createContext, FC, useEffect, useState } from 'react';

import { LANGUAGE_CODES, LOCALSTORAGE_KEYS } from '../constants';

export type Language = LANGUAGE_CODES | string;

export type ContextInitialState = {
  language: Language;
  toggleLanguage(nextLanguage: Language): void;
};

const initialState: ContextInitialState = { language: LANGUAGE_CODES.EN, toggleLanguage: () => {} };

const Context = createContext<ContextInitialState>(initialState);

export const ContextProvider: FC = (props) => {
  const [language, setLanguage] = useState<Language>(LANGUAGE_CODES.EN);

  const toggleLanguage: ContextInitialState['toggleLanguage'] = (nextLanguage) => {
    localStorage.setItem(LOCALSTORAGE_KEYS.LANGUAGE, JSON.stringify(nextLanguage));
    setLanguage(nextLanguage);
  };

  useEffect(() => {
    const languageFromLocalStorage = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEYS.LANGUAGE) ?? '',
    );

    if (languageFromLocalStorage === '') {
      setLanguage(languageFromLocalStorage);
    } else {
      localStorage.setItem(LOCALSTORAGE_KEYS.LANGUAGE, JSON.stringify(language));
    }
  }, []);

  return <Context.Provider value={{ language, toggleLanguage }}>{props.children}</Context.Provider>;
};

export default Context;
