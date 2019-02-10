import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/ru';
import { graphql } from 'gatsby';
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import * as React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as ru from 'react-intl/locale-data/ru';

addLocaleData([...en, ...ru]);

interface IContextInitialState {
  isDark: boolean;
  toggleDark: () => void;
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
    const {
      children,
      data: {
        site: {
          siteMetadata: {
            languages: { defaultLangKey, langs },
          },
        },
      },
      location: { pathname },
    } = this.props;
    const { isDark } = this.state;

    const langKey = getCurrentLangKey(langs, defaultLangKey, pathname);
    const homeLink = `/${langKey}/`;
    const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, pathname));
    const i18nMessages = require(`../languages/messages/${langKey}`);

    return (
      <Context.Provider
        value={{
          isDark,
          toggleDark: this.toggleDark,
        }}
      >
        <IntlProvider locale={langKey} messages={i18nMessages}>
          {children}
        </IntlProvider>
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

export const query = graphql`
  query {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
  }
`;

export default Context;
