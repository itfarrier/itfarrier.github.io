import { graphql, useStaticQuery } from 'gatsby';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/ru';
import { getCurrentLangKey, getLangs, getUrlForLang, isHomePage } from 'ptz-i18n';
import * as React from 'react';
import Helmet from 'react-helmet';
import { addLocaleData, FormattedMessage, IntlProvider } from 'react-intl';
import * as enData from 'react-intl/locale-data/en';
import * as ruData from 'react-intl/locale-data/ru';
import * as en from '../../data/messages/en';
import * as ru from '../../data/messages/ru';

import Header from '../Header';

const messages = { en, ru };

addLocaleData([...enData, ...ruData]);

import './Layout.module.css';

const Layout: React.FC = (props) => {
  const {
    site: {
      siteMetadata: { languages, title },
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
  const { children, location } = props;
  const url = location.pathname;
  const isHome = isHomePage(url);
  const { langs, defaultLangKey } = languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const homeLink = `/${langKey !== 'en' ? langKey : ''}`;
  const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url)).map((item) => ({
    ...item,
    link: item.link.replace(`/${defaultLangKey}/`, '/'),
  }));

  return (
    <IntlProvider locale={langKey} messages={messages[langKey]}>
      <>
        <Helmet title={title} />
        <Header />
        <main>{children}</main>
      </>
    </IntlProvider>
  );
};

export default Layout;
