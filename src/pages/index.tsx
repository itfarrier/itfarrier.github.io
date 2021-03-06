import 'sanitize.css';
import 'sanitize.css/assets.css';
import 'sanitize.css/evergreen.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/forms.evergreen.css';
import 'sanitize.css/reduce-motion.css';
import 'sanitize.css/typography.css';

import { FC, PureComponent } from 'react';

import { graphql, navigate, useStaticQuery, withPrefix } from 'gatsby';
import { getUserLangKey } from 'ptz-i18n';

import { Language } from 'cmpts/LanguageContext';

export type RedirectorProps = { defaultLanguage: Language; languages: Language[] };

class Redirector extends PureComponent<RedirectorProps> {
  constructor(props: RedirectorProps) {
    super(props);

    // https://www.gatsbyjs.com/docs/debugging-html-builds/#how-to-check-if-window-is-defined
    if (typeof window !== 'undefined') {
      const { defaultLanguage, languages } = props;

      const currentLanguage = getUserLangKey(languages, defaultLanguage);

      const localizedUrl = withPrefix(`/${currentLanguage}/`);

      navigate(localizedUrl, { replace: true });
    }
  }

  render() {
    return null;
  }
}

export type IndexQuery = {
  site: { siteMetadata: { i18n: { defaultLanguage: Language; languages: Language[] } } };
};

const Index: FC = () => {
  const { site } = useStaticQuery<IndexQuery>(graphql`
    query Index {
      site {
        siteMetadata {
          i18n {
            defaultLanguage
            languages
          }
        }
      }
    }
  `);

  return (
    <Redirector
      defaultLanguage={site.siteMetadata.i18n.defaultLanguage}
      languages={site.siteMetadata.i18n.languages}
    />
  );
};

export default Index;
