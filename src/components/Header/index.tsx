import type { Language } from 'cmpts/LanguageContext';
import type { FC } from 'react';
import type { HeaderQuery } from 'root/graphql-types';

import { useLocation } from '@reach/router';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { HeaderView } from 'cmpts/Header/HeaderView';
import cv from 'docs/podabed-cv.pdf';
import { graphql, useStaticQuery } from 'gatsby';
// @ts-ignore
import { getCurrentLangKey } from 'ptz-i18n';
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
