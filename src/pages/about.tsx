import { Link } from 'gatsby';
import * as React from 'react';

import Layout from '../components/Layout';

const SecondPage: React.SFC = () => (
  <Layout>
    <h1>Hi from the about page</h1>
    <p>Welcome to about</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default SecondPage;
