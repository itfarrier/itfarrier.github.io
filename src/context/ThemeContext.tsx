import * as React from 'react';

interface IInitialState {
  isDark: boolean;
  toggleDark: () => void;
}

const initialState: IInitialState = {
  isDark: false,
  toggleDark: () => {},
};

const ThemeContext = React.createContext(initialState);

// Getting isDark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
const supportsDarkMode = () => window.matchMedia('(prefers-color-scheme: isDark)').matches === true;

class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDark: false,
      toggleDark: this.toggleDark,
    };
  }

  public render() {
    const { children } = this.props;
    const { isDark } = this.state;

    return (
      <ThemeContext.Provider
        value={{
          isDark,
          toggleDark: this.toggleDark,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  public toggleDark = () => {
    let isDark = !this.state.isDark;

    localStorage.setItem('isDark', JSON.stringify(isDark));
    this.setState({ isDark });
  };

  private componentDidMount() {
    const lsDark = JSON.parse(localStorage.getItem('isDark'));

    if (lsDark) {
      this.setState({ isDark: lsDark });
    } else if (supportsDarkMode()) {
      this.setState({ isDark: true });
    }
  }
}

export default ThemeContext;

export { ThemeProvider };
