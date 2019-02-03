import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';

import Layout from './Layout';

export default ({ children }) => {
  const render = (data) => <Layout children={children} data={data} />;

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
};
