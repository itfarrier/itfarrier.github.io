import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';

import Header from '../Header';

import './Layout.module.css';

const Layout: React.FC = ({ children }) => {
  const {
    site: {
      siteMetadata: { title },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Helmet title={title} />
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
