import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/ru';
import 'normalize.css';
import * as React from 'react';
import * as en from 'react-intl/locale-data/en';
import * as ru from 'react-intl/locale-data/ru';
import { addLocaleData } from 'react-intl';
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { graphql, useStaticQuery } from 'gatsby';

import { ILangObject } from '../../interfaces';
import { LayoutView } from './LayoutView';

addLocaleData([...en, ...ru]);

const Layout: React.FC = (props) => {
  const {
    children,
    location: { href, pathname },
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
    <LayoutView
      homeLink={homeLink}
      href={href}
      i18nMessages={i18nMessages}
      langsMenu={langsMenu}
      locale={langKey}
    >
      {children}
    </LayoutView>
  );
};

export default Layout;
