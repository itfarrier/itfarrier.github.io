import * as React from 'react';

interface IContextInitialState {
  language: string;
}

const initialState: IContextInitialState = {
  language: 'en',
};

const Context: React.Context<IContextInitialState> = React.createContext<IContextInitialState>(
  initialState,
);

export class ContextProvider extends React.PureComponent<any, IContextInitialState> {
  constructor(props: any) {
    super(props);

    this.state = {
      language: 'en',
    };
  }

  public componentDidMount = () => {
    const { language } = this.state;

    const isLanguageFromLocalStorage: string = JSON.parse(localStorage.getItem('language'));

    if (isLanguageFromLocalStorage) {
      this.setState({ language: isLanguageFromLocalStorage });
    } else {
      localStorage.setItem('language', JSON.stringify(language));
    }
  };

  public render: () => React.ReactElement = (): React.ReactElement => {
    const { children } = this.props;
    const { language } = this.state;

    return (
      <Context.Provider
        value={{
          language,
          toggleLanguage: this.toggleLanguage,
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  public toggleLanguage: (language: string) => void = (language: string) => {
    localStorage.setItem('language', JSON.stringify(language));
    this.setState({ language });
  };
}

export default Context;
