import * as React from 'react';

import { LANGUAGE_CODES, LOCALSTORAGE_KEYS } from '../constants';

export type Language = LANGUAGE_CODES | string;

export type ContextInitialState = { language: Language; toggleLanguage(language: Language): void };

const initialState: ContextInitialState = { language: LANGUAGE_CODES.EN, toggleLanguage: () => {} };

const Context = React.createContext<ContextInitialState>(initialState);

export class ContextProvider extends React.PureComponent<unknown, ContextInitialState> {
  constructor(props: unknown) {
    super(props);

    this.state = { language: LANGUAGE_CODES.EN, toggleLanguage: this.toggleLanguage };
  }

  public componentDidMount() {
    const { language } = this.state;

    const isLanguageFromLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.LANGUAGE));

    if (isLanguageFromLocalStorage) {
      this.setState({ language: isLanguageFromLocalStorage });
    } else {
      localStorage.setItem(LOCALSTORAGE_KEYS.LANGUAGE, JSON.stringify(language));
    }
  }

  public render() {
    const { children } = this.props;
    const { language } = this.state;

    return (
      <Context.Provider value={{ language, toggleLanguage: this.toggleLanguage }}>
        {children}
      </Context.Provider>
    );
  }

  public toggleLanguage = (language: Language) => {
    localStorage.setItem(LOCALSTORAGE_KEYS.LANGUAGE, JSON.stringify(language));
    this.setState({ language });
  };
}

export default Context;
