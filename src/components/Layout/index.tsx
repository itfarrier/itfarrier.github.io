import * as React from 'react';
import { addLocaleData } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as ru from 'react-intl/locale-data/ru';

import { graphql, useStaticQuery } from 'gatsby';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/ru';
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';

import { ILangObject } from '../../interfaces';
import { LayoutView } from './LayoutView';
import { LayoutProps } from './types';

addLocaleData([...en, ...ru]);

const Layout: React.FC<LayoutProps> = (props) => {
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
