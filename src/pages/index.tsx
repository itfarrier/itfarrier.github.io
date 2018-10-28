import { Link } from 'gatsby';
import * as React from 'react';

import Layout from '../components/Layout';

const IndexPage: React.SFC = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
