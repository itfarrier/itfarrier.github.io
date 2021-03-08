import React, { FC } from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/ru';

import { LayoutView } from 'cmpts/Layout/LayoutView';
import { LayoutProps } from 'cmpts/Layout/types';
import { ILangObject } from 'src/interfaces';

addLocaleData([...en, ...ru]);

export const Layout: FC<LayoutProps> = (props) => {
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
  const homeLink = `/${langKey}/`;
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
