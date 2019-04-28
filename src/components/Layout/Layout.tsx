import { graphql, useStaticQuery } from 'gatsby';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/ru';
import { getCurrentLangKey, getLangs, getUrlForLang, isHomePage } from 'ptz-i18n';
import * as React from 'react';
import Helmet from 'react-helmet';
import { addLocaleData, FormattedMessage, IntlProvider } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as ru from 'react-intl/locale-data/ru';

import { ILangObject } from '../../interfaces';
import Context from '../Context';
import Header from '../Header';

addLocaleData([...en, ...ru]);

const Layout: React.FC = (props: any): React.ReactElement => {
  const {
    children,
    location: { pathname },
  } = props;

  const {
    site: {
      siteMetadata: {
        languages: { defaultLangKey, langs },
        title,
      },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          languages {
            defaultLangKey
            langs
          }
          title
        }
      }
    }
  `);

  const langKey: string = getCurrentLangKey(langs, defaultLangKey, pathname);
  const homeLink: string = `/${langKey}/`;
  const langsMenu: ILangObject[] = getLangs(langs, langKey, getUrlForLang(homeLink, pathname));
  const i18nMessages: { [key: string]: string } = require(`../../data/messages/${langKey}`);

  return (
    <IntlProvider locale={langKey} messages={i18nMessages}>
      <Context.Consumer>
        {(context) => (
          <>
            <Helmet title={title} />
            <Header
              context={context}
              homeLink={homeLink}
              langsMenu={langsMenu}
              locale={langKey}
              pathname={pathname}
            />
            <main>{children}</main>
          </>
        )}
      </Context.Consumer>
    </IntlProvider>
  );
};

export default Layout;
