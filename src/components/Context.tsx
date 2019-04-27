import * as React from 'react';

interface IContextInitialState {
  isDark: boolean;
  language: string;
  toggleDark(): void;
}

const initialState: IContextInitialState = {
  isDark: false,
  language: 'en',
  // tslint:disable-next-line: no-empty
  toggleDark: () => {},
};

const Context: React.Context<IContextInitialState> = React.createContext<IContextInitialState>(
  initialState,
);

export class ContextProvider extends React.PureComponent<any, IContextInitialState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isDark: false,
      language: 'en',
      toggleDark: this.toggleDark,
    };
  }

  public componentDidMount = () => {
    const { isDark, language } = this.state;

    const isDarkFromLocalStorage: boolean = JSON.parse(localStorage.getItem('isDark'));
    const isLanguageFromLocalStorage: string = JSON.parse(localStorage.getItem('language'));

    if (isDarkFromLocalStorage && isLanguageFromLocalStorage) {
      this.setState({ isDark: isDarkFromLocalStorage, language: isLanguageFromLocalStorage });
    } else {
      localStorage.setItem('isDark', JSON.stringify(isDark));
      localStorage.setItem('language', JSON.stringify(language));
    }

    if (this.isSupportsDarkModeInMacOS()) {
      this.setState({ isDark: true });
      localStorage.setItem('isDark', JSON.stringify(isDark));
    }
  };

  public render: () => React.ReactElement = (): React.ReactElement => {
    const { children } = this.props;
    const { isDark, language } = this.state;

    return (
      <Context.Provider
        value={{
          isDark,
          language,
          toggleDark: this.toggleDark,
          toggleLanguage: this.toggleLanguage,
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  public toggleDark: () => void = (): void => {
    const isDark = !this.state.isDark;

    localStorage.setItem('isDark', JSON.stringify(isDark));
    this.setState({ isDark });
  };

  public toggleLanguage: (language: string) => void = (language: string) => {
    localStorage.setItem('language', JSON.stringify(language));
    this.setState({ language });
  };

  private isSupportsDarkModeInMacOS: () => boolean = (): boolean =>
    window.matchMedia('(prefers-color-scheme: dark)').matches === true;
}

export default Context;
