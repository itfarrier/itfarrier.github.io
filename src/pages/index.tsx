import { graphql, navigate, withPrefix } from 'gatsby';
import { getUserLangKey } from 'ptz-i18n';
import * as React from 'react';

class RedirectIndex extends React.PureComponent {
  constructor(props) {
    super(props);

    if (typeof window !== 'undefined') {
      const { langs, defaultLangKey } = props.data.site.siteMetadata.languages;
      const langKey = getUserLangKey(langs, defaultLangKey);
      const homeUrl = withPrefix(`/${langKey}/`);

      navigate(homeUrl);
    }
  }

  public render() {
    return <div />;
  }
}

export default RedirectIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
  }
`;
