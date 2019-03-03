import * as React from 'react';

interface IContextInitialState {
  isDark: boolean;
  toggleDark(): void;
}

const initialState: IContextInitialState = {
  isDark: false,
  /* tslint:disable-next-line:no-empty */
  toggleDark: () => {},
};

const Context: React.Context<IContextInitialState> = React.createContext<IContextInitialState>(
  initialState,
);

export class ContextProvider extends React.PureComponent<{}, IContextInitialState> {
  constructor(props) {
    super(props);

    this.state = {
      isDark: false,
      toggleDark: this.toggleDark,
    };
  }

  public componentDidMount() {
    const isDarkFromLocalStorage: boolean = JSON.parse(localStorage.getItem('isDark'));

    if (isDarkFromLocalStorage) {
      this.setState({ isDark: isDarkFromLocalStorage });
    } else if (this.isSupportsDarkModeInMacOS()) {
      this.setState({ isDark: true });
    }
  }

  public render() {
    const { children } = this.props;
    const { isDark } = this.state;

    return (
      <Context.Provider
        value={{
          isDark,
          toggleDark: this.toggleDark,
        }}
      >
        {children}
      </Context.Provider>
    );
  }

  public toggleDark: () => void = (): void => {
    const isDark = !this.state.isDark;

    localStorage.setItem('isDark', JSON.stringify(isDark));
    this.setState({ isDark });
  };

  private isSupportsDarkModeInMacOS: () => boolean = (): boolean =>
    window.matchMedia('(prefers-color-scheme: dark)').matches === true;
}

export default Context;
