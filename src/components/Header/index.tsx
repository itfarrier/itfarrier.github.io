import { FC } from 'react';

import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import { getCurrentLangKey } from 'ptz-i18n';

import { HeaderView } from 'cmpts/Header/HeaderView';
import { Language } from 'cmpts/LanguageContext';
import cv from 'docs/cv-podabed.pdf';

export const Header: FC = () => {
  const { pathname } = useLocation();

  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          i18n {
            defaultLanguage
            languages
          }
          title
        }
      }
    }
  `);

  const { defaultLanguage, languages } = data.site.siteMetadata.i18n;

  const currentLanguage: Language = getCurrentLangKey(languages, defaultLanguage, pathname);
  const homeUrl = `/${currentLanguage}/`;

  return (
    <HeaderView
      links={[
        { text: '/', to: homeUrl },
        { text: '/books', to: `${homeUrl}books` },
        { text: '/cv', to: cv },
        { text: '/videos', to: `${homeUrl}videos` },
        { text: '/wishlist', to: `${homeUrl}wishlist` },
      ]}
    />
  );
};
