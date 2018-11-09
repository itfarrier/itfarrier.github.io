import { graphql, StaticQuery } from 'gatsby';
import { Head } from 'gatsby-plugin-i18next';
import * as React from 'react';
import { translate } from 'react-i18next';

import Layout from './Layout';

export default translate()(({ children, t }) => {
  const render = (data) => <Layout children={children} data={data} t={t} />;

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={render}
    />
  );
});
