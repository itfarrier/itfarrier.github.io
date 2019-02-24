import * as React from 'react';

import Layout from '../components/Layout';

const About: React.FC = (props) => (
  <Layout location={props.location}>
    <article>
      <header>
        <h1>Ещё один ненужный говноблог.</h1>
      </header>
    </article>
  </Layout>
);

export default About;
