import * as React from 'react';
import Helmet from 'react-helmet';

import Header from '../header';

import { IPage } from '../../interfaces';

const Layout: React.SFC<IPage> = ({
  children,
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    >
      <html lang="en" />
    </Helmet>
    <Header siteTitle={title} />
    <main>{children}</main>
  </>
);

export default Layout;
