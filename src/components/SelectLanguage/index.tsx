import { FC, useContext } from 'react';

import { useLocation } from '@reach/router';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';

import { Language, LanguageContext } from 'cmpts/LanguageContext';
import { ILangObject } from 'src/interfaces';

export const SelectLanguage: FC = () => {
  const { toggleLanguage } = useContext(LanguageContext);

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
  const languagesMenu: ILangObject[] = getLangs(
    languages,
    currentLanguage,
    getUrlForLang(homeUrl, pathname),
  );

  return languagesMenu.map((language: ILangObject) => {
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
  });
};
