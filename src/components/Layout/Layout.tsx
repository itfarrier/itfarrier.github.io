import * as React from 'react';
import Helmet from 'react-helmet';

import Header from '../header';

import './Layout.module.css';

import { ILayout } from '../../interfaces';

const Layout: React.FC<ILayout> = ({
  children,
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <>
    <Helmet title={title} />
    <Header />
    <main>{children}</main>
  </>
);

export default Layout;
