import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/ru';
import 'normalize.css';
import * as React from 'react';
import * as en from 'react-intl/locale-data/en';
import * as ru from 'react-intl/locale-data/ru';
import { addLocaleData, IntlProvider } from 'react-intl';
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { graphql, useStaticQuery } from 'gatsby';

import Context from '../Context';
import Head from '../Head';
import Header from '../Header';
import { ILangObject } from '../../interfaces';

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
            <Head context={context} i18nMessages={i18nMessages} {...props} />
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
