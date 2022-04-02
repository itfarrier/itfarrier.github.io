import { FC, useContext } from 'react';

import { useLocation } from '@reach/router';
import { graphql, navigate, useStaticQuery } from 'gatsby';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';

import { Language, LanguageContext } from 'cmpts/LanguageContext';
import { siteMetadata } from 'src/data/siteMetadata';
import { ILangObject } from 'src/types';

export const SelectLanguage: FC = () => {
  const { toggleLanguage } = useContext(LanguageContext);

  const { pathname } = useLocation();

  const data = useStaticQuery<GatsbyTypes.SelectLanguageQuery>(graphql`
    query SelectLanguage {
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const languagesMenu = getLangs(
    languages,
    currentLanguage,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    getUrlForLang(homeUrl, pathname),
  ) as ILangObject[];

  return (
    <>
      {languagesMenu.map((language: ILangObject) => {
        const { langKey, link } = language;

        const onClick = () => {
          toggleLanguage(langKey);
          void navigate(link);
        };

        return (
          <button key={langKey} onClick={onClick}>
            {langKey}
          </button>
        );
      })}
    </>
  );
};
