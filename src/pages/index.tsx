import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';

import Layout from '../components/Layout';

import { IPage } from '../interfaces';

const Index: React.SFC<IPage> = () => <Layout />;

export default Index;
