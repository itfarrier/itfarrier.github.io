import 'sanitize.css';
import 'sanitize.css/assets.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/reduce-motion.css';
import 'sanitize.css/system-ui.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/ui-monospace.css';

import { type FC, type PureComponent } from 'react';

import { graphql, navigate, useStaticQuery, withPrefix } from 'gatsby';
import { getUserLangKey } from 'ptz-i18n';
import { type IndexQuery } from 'root/graphql-types';

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
