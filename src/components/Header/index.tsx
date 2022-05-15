import { FC } from 'react';

import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getCurrentLangKey } from 'ptz-i18n';

import { HeaderView } from 'cmpts/Header/HeaderView';
import { Language } from 'cmpts/LanguageContext';
import cv from 'docs/podabed-cv.pdf';
import { HeaderQuery } from 'root/graphql-types';
import { siteMetadata } from 'src/data/siteMetadata';

export const Header: FC = () => {
  const { pathname } = useLocation();

  const data = useStaticQuery<HeaderQuery>(graphql`
    query Header {
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

  const { defaultLanguage, languages } = data.site?.siteMetadata?.i18n ?? siteMetadata.i18n;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const currentLanguage = getCurrentLangKey(languages, defaultLanguage, pathname) as Language;

  const homeUrl = `/${currentLanguage}/`;

  return (
    <HeaderView
      links={[
        { text: '/', to: homeUrl },
        { text: '/blog', to: `${homeUrl}blog` },
        { text: '/books', to: `${homeUrl}books` },
        { text: '/cv', to: cv },
        { text: '/games', to: `${homeUrl}games` },
        { text: '/videos', to: `${homeUrl}videos` },
        { text: '/wishlist', to: `${homeUrl}wishlist` },
      ]}
    />
  );
};
