import * as React from 'react';

import { graphql, navigate, StaticQuery, withPrefix } from 'gatsby';
import { getUserLangKey } from 'ptz-i18n';

class RedirectIndex extends React.PureComponent {
  constructor(props) {
    super(props);

    if (typeof window !== 'undefined') {
      const { defaultLangKey, langs } = props.data.site.siteMetadata.languages;
      const langKey = getUserLangKey(langs, defaultLangKey);
      const homeUrl = withPrefix(`/${langKey}/`);

      navigate(homeUrl);
    }
  }

  public render() {
    return <div />;
  }
}

export default (props) => {
  const render = (data) => <RedirectIndex data={data} {...props} />;

  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              languages {
                defaultLangKey
                langs
              }
            }
          }
        }
      `}
      render={render}
    />
  );
};
