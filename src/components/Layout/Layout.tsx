import * as React from 'react';
import Helmet from 'react-helmet';

import Header from '../header';

import { ILayout } from '../../interfaces';

const Layout: React.SFC<ILayout> = ({ children, data }) => (
  <>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    >
      <html lang="en" />
    </Helmet>
    <Header siteTitle={data.site.siteMetadata.title} />
    <main>{children}</main>
  </>
);

export default Layout;
